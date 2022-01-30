from django.shortcuts import render

from rest_framework import serializers, status
from rest_framework.exceptions import NotFound
# AUTENTICATIONS
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets

# SERIALIZERS
from .serializers import RegisterSerializer

# MODELS
from .models import Bike, Register_Bike
from src.apps.stations.models import Point

from .serializers import BikeSerializer, RegisterSerializer


class BikeViewSet(viewsets.ModelViewSet):
    queryset = Bike.objects.all()
    serializer_class = BikeSerializer


class RegisterAPIView(APIView):

    permission_classes = (IsAuthenticated,)
    serializer_class = RegisterSerializer

    def post(self, request, username=None):
        self_uuid = self.request.user.profile.pk
        data = request.data.get('id_point', {})
        # serializer_context = {'request': request}

        registered = Register_Bike.objects.filter(
            user=self_uuid, point_return__isnull=True)

        if registered.count() != 0:
            raise serializers.ValidationError('Debe devolver antes la bici.')
        else:
            try:
                point = Point.objects.get(pk=data)
            except Point.DoesNotExist:
                raise NotFound('Este punto de estación no existe.')

            # Comprovamos que el método ha comprobado la disponibilidad de la bici que hay en ese punto
            # y nos ha devuelto su id como un "int", de lo contrario devolverá un "string"
            id_bike = point.checkPoint()
            if (type(id_bike) != int):
                raise NotFound(id_bike)
            else:

                serializer_context = {
                    'user': request.user.profile,
                    'bike': point.bike,
                    'request': request,

                }

                serializer = self.serializer_class(
                    data={"point_get":data}, context=serializer_context
                )
                serializer.is_valid(raise_exception=True)
                serializer.save()
                point.RemoveBike()

                return Response(serializer.data, status=status.HTTP_201_CREATED)
                # 1.-Llevar esta bici d'este punt (FET! Descomentar el Save())
                # 2.-Afegir al registre totes les dades pertinents

             