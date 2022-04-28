from datetime import datetime    
from django.shortcuts import render
from decimal import Decimal

from rest_framework import status, viewsets, serializers, generics
from rest_framework.exceptions import NotFound
# AUTENTICATIONS
from rest_framework.permissions import IsAuthenticated

from rest_framework.response import Response
from rest_framework.views import APIView

# SERIALIZERS
from .serializers import RegisterSerializer, MyRegisterSerializer
from src.apps.stations.serializers import GetBikeSerializer
from src.apps.credits.serializers import serializerCredit

# MODELS
from .models import Bike, Register_Bike
from src.apps.stations.models import Point
from src.apps.credits.models import Credit

# PERMSISSIONS
from src.apps.core.permissions import IsStaff

# JOB
from django_dbq.models import Job


class BikeListAPIView(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    permission_classes = [IsStaff, ]
    queryset = Bike.objects.all().order_by('points', 'points__station')
    serializer_class = GetBikeSerializer

class BikeListNoPointsAPIView(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    permission_classes = [IsStaff, ]
    queryset = Bike.objects.filter(points=None)
    serializer_class = GetBikeSerializer

class UpdpateBikeAPIView(APIView):
    permission_classes = (IsAuthenticated,)
    permission_classes = [IsStaff, ]

    serializer_class = GetBikeSerializer

    def put(self, request):
        id_bike = request.data.get('id_bike', {})
        active = request.data.get('active', {})

        if (type(active) != bool):
            raise NotFound(active)
        try:
            bike = Bike.objects.get(pk=id_bike)
        except Point.DoesNotExist:
            raise NotFound('Esta bici no existe.')
        serializer = self.serializer_class(
            instance=bike,   data={"active": active}, partial=True)
        serializer.is_valid(raise_exception=True)

        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class RegisterAPIView(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = RegisterSerializer
    credit_serializer_class= serializerCredit

    def post(self, request):
        self_uuid = self.request.user.profile.pk
        data = request.data.get('id_point', {})
        try:
            credit = Credit.objects.filter(id_user=self_uuid).last()
            if credit.amount <= 0:
                raise NotFound('No hay saldo suficiente.')
        except Credit.DoesNotExist:    
            raise NotFound('No se ha encontrado.')
        # ¿Existe algún Registre de esta persona que haya cogido una bici y no la haya devuelto? Ergo, ¿Tiene en estos momentos una bici?
        registered = Register_Bike.objects.filter(
            user=self_uuid, point_return__isnull=True)
        if registered.count() != 0:
            raise serializers.ValidationError('Debe devolver antes la bici.')
        try:
            point = Point.objects.get(pk=data)
        except Point.DoesNotExist:
            raise NotFound('Este punto de estación no existe.')

        # Comprovamos que el método ha comprobado la disponibilidad de la bici que hay en ese punto
        # y nos ha devuelto su id como un "int", de lo contrario devolverá un "string"
        id_bike = point.checkPointAvailable()
        if (type(id_bike) != int):
            raise NotFound(id_bike)

        serializer_context = {
            'user': request.user.profile,
            'bike': point.bike,
            'request': request,
        }

        serializer = self.serializer_class(
            data={"point_get": data}, context=serializer_context
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        point.RemoveBike()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def put(self, request):


        def millis(dt):
            ms = (dt.days * 24 * 60 * 60 + dt.seconds) * 1000 + dt.microseconds / 1000.0
            return ms
            
        self_uuid = self.request.user.profile.pk
        data = request.data.get('id_point', {})



        try:
            registered = Register_Bike.objects.get(
                user=self_uuid, point_return__isnull=True)
        except Register_Bike.DoesNotExist:
            raise NotFound('Actualmente no tienes ninguna bici.')
        data_get = registered.data_get
        try:
            point = Point.objects.get(pk=data)
        except Point.DoesNotExist:
            raise NotFound('Este punto de estación no existe.')

        # Comprovamos que el método ha comprobado la disponibilidad de la bici que hay en ese punto
        # y nos ha devuelto su id como un "int", de lo contrario devolverá un "string"
        free_point = point.checkFreePoint()

        if (type(free_point) != Point):
            raise NotFound(free_point)
            # print(registered.bike)

        serializer = self.serializer_class(
            instance=registered,   data={"point_return": data}, partial=True)
        serializer.is_valid(raise_exception=True)

        serializer.save()
        point.SaveBike(registered.bike)

      
        try:
            credit = Credit.objects.filter(id_user=self_uuid).last()
            amount =credit.amount-Decimal((millis(datetime.now().replace(tzinfo=None)-data_get.replace(tzinfo=None))-7200000)/1000*0.0001)
            serializer_credit = self.credit_serializer_class(
            data={"movement": "{:.2f}".format(amount-credit.amount), "amount": "{:.2f}".format(amount), "id_user": str(self_uuid)})
            serializer_credit.is_valid(raise_exception=True)
            serializer_credit.save()
            job_value={
                "name": self.request.user.username,
                "email": self.request.user.email,
                "reason": "Tu viaje ha consumido el siguiente saldo",
                "message": "Tu saldo ha sido modificado, ahora tienes "+str(amount)+" en tu cuenta.",
            }
            Job.objects.create(name="job_mail_payment",workspace={"data": job_value} )

        except Credit.DoesNotExist:    
            raise NotFound('No se ha encontrado.')

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ObtainMyRegisterAPIView(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)

    queryset = Register_Bike.objects.all()

    serializer_class = MyRegisterSerializer

    def get_queryset(self):
        queryset = self.queryset
        user_uuid = self.request.user.profile.pk
        queryset = queryset.filter(user=user_uuid)
        # self.serializer_class(queryset, fields=('user'))
        return queryset


# class ObtainMyRegisterAPIView(APIView):
#     permission_classes = (IsAuthenticated,)
#     queryset = Register_Bike.objects.all()

#     def get_queryset(self):
#         queryset = self.queryset
#         user_uuid = self.request.user.profile.pk
#         queryset = list(queryset.filter(user= user_uuid).values())

#         return queryset

#     def get(self, request):
#         try:
#             serializer = self.serializer_class(
#             data={"point_get": data}, context=serializer_context
#                                                                 )
#             queryset = self.get_queryset()
#             print(queryset)
#             data = MyRegisterSerializer(queryset, fields=("data_get","bike")).data

#             return Response( {"data" : data } ,status=status.HTTP_200_OK)
#         except Exception as error:
#             return Response( { "error" : str(error) } , status=status.HTTP_500_INTERNAL_SERVER_ERROR)
