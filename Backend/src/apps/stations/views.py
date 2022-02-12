from django.shortcuts import render
# from rest_framework.exceptions import NotFound
from rest_framework.views import APIView
from rest_framework import status, generics
from rest_framework.exceptions import NotFound

from rest_framework.permissions import (IsAuthenticatedOrReadOnly, IsAuthenticated,)
from src.apps.core.permissions import IsStaff

from rest_framework.response import Response
from .models import  Station, Point
from .serializers import serializerStationsPoints, AllPointsSerializer, BikeSerializer,CreatePointsSerializer
from src.apps.bikes.models import  Bike

import json

# # Esta función saca toda los puntos de bici, y de cada punto su estación, aunque todas las estaciones son la misma


class GetOneStationAPIView(generics.ListAPIView):
    lookup_field = 'slug'
    lookup_url_kwarg = 'slug'
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = Station.objects.all()
    serializer_class = serializerStationsPoints

    def filter_queryset(self, queryset):
        filters = {self.lookup_field: self.kwargs[self.lookup_url_kwarg]}
        return queryset.filter(**filters)


class GetAllStationListAPIView(generics.ListAPIView):
    queryset = Station.objects.all().order_by("name")
    serializer_class = serializerStationsPoints


class CreateStationAPIView(APIView):
    permission_classes = (IsAuthenticated,)
    permission_classes = [IsStaff, ]
    serializer_stations = serializerStationsPoints
    serializer_points = CreatePointsSerializer
    serializer_bike = BikeSerializer

    def post(self, request):
        points = int(request.data.get('points', {}))
        bikes = int(request.data.get('bikes', {}))
        x = request.data.get('station', {})
        station = json.loads(x)

        try:
            station["img"] = request.FILES['img']
        except Exception:
            print("No hay imagen")

        serializer_station = self.serializer_stations(data=station,)
        serializer_station.is_valid(raise_exception=True)
        serializer_station.save()

        if (points > 0 and points < 11):
            for i in range(points):

                if bikes > i:
                    serializer_bike = self.serializer_bike(
                        data={"active": True})
                    serializer_bike.is_valid()
                    serializer_bike.save()
                    data = {
                        "station": serializer_station.data["id"],
                        "bike": serializer_bike.data["id"]
                    }

                else:
                    data = {"station": serializer_station.data["id"]}

                serializer_point = self.serializer_points(data=data,)
                serializer_point.is_valid(raise_exception=True)
                serializer_point.save()

        return Response(serializer_station.data, status=status.HTTP_201_CREATED)

    def put(self, request, slug):
        x = request.data.get('station', {})
        station = json.loads(x)

        try:
            station["img"] = request.FILES['img']
        except Exception:
            print("No hay imagen")

        try:
            serializer_instance = Station.objects.get(slug=slug)
        except Station.DoesNotExist:
            return Response('Esta estación no existe.', status=404)

        print(serializer_instance)
        serializer = self.serializer_stations(
            serializer_instance, data=station, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        print(serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, slug):
        try:
            station = Station.objects.get(slug=slug)
        except Station.DoesNotExist:
            return Response('A station with this slug does not exist.', status=404)

        station.delete()
        return Response(None, status=status.HTTP_204_NO_CONTENT)



class BikeListAPIView(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    permission_classes = [IsStaff, ]
    queryset = Point.objects.all().order_by('station', 'pk')
    serializer_class = AllPointsSerializer

##UPDATE POINT

class UpdpatePointAPIView(APIView):
    permission_classes = (IsAuthenticated,)
    permission_classes = [IsStaff, ]

    serializer_class = AllPointsSerializer

    def put(self, request):
        id_point = request.data.get('id_point', {})
        active = request.data.get('active', {})

        if (type(active) != bool):
            raise NotFound(active)
        try:
            point = Point.objects.get(pk=id_point)
        except Point.DoesNotExist:
            raise NotFound('Esta bici no existe.')
        serializer = self.serializer_class(
            instance=point,   data={"active": active}, partial=True)
        serializer.is_valid(raise_exception=True)

        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)





# ADMIN Modificiar Bici del point

class UpdpateBikePointAPIView(APIView):
    permission_classes = (IsAuthenticated,)
    permission_classes = [IsStaff, ]

    serializer_class = CreatePointsSerializer


    def put(self, request):
        id_point = request.data.get('id_point', {})
        id_bike = request.data.get('id_bike', {})

        # Existeix el punt on volem ficar la bici?
        try:
            putPoint = Point.objects.get(pk=id_point)
        except Point.DoesNotExist:
            raise NotFound('El punto al que quieres añadir una bici no existe.')
   
        # Algun punt ja té eixa bici?
        print(Point.objects.filter(bike=id_bike).exists())
        if Point.objects.filter(bike=id_bike).exists():
            otherPoint= Point.objects.get(bike=id_bike)
            bike=otherPoint.bike
            print(otherPoint)
            print("bike")

            otherPoint.RemoveBike() ###CREAR MÉTODO
            print(otherPoint)

        # Sino... la bici existeix?
        else:
            print("Else")
            try:
                bike = Bike.objects.get(pk=id_point)
            except Point.DoesNotExist:
                raise NotFound('Esta bici no existe.')
        serializer = self.serializer_class(
            instance=putPoint,   data={"bike": bike.pk}, partial=True)

        serializer.is_valid(raise_exception=True)

        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


