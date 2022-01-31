from django.shortcuts import render

from rest_framework import mixins, status, viewsets, serializers, generics
from rest_framework.exceptions import NotFound
# AUTENTICATIONS
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser

from rest_framework.response import Response
from rest_framework.views import APIView

# SERIALIZERS
from .serializers import BikeSerializer, RegisterSerializer

# MODELS
from .models import Bike, Register_Bike
from src.apps.stations.models import Point


class BikeViewSet(viewsets.ModelViewSet):
    queryset = Bike.objects.all()
    serializer_class = BikeSerializer


class RegisterAPIView(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = RegisterSerializer

    def post(self, request):

        self_uuid = self.request.user.profile.pk
        data = request.data.get('id_point', {})

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
        self_uuid = self.request.user.profile.pk
        data = request.data.get('id_point', {})
   
        try:
            registered = Register_Bike.objects.get(
                user=self_uuid, point_return__isnull=True)
        except Register_Bike.DoesNotExist:
            raise NotFound('Actualmente no tienes ninguna bici.')

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
        return Response(serializer.data, status=status.HTTP_201_CREATED)
