from django.shortcuts import render
from rest_framework.exceptions import NotFound
from rest_framework.views import APIView

from rest_framework import status, serializers, generics
from rest_framework.permissions import (
    IsAuthenticatedOrReadOnly, IsAuthenticated, IsAdminUser,)
from rest_framework.response import Response
from .models import Point, Station
from .serializers import serializerStationsPoints, CreatePointsSerializer, BikeSerializer

from src.apps.core.permissions import IsStaff
import json

# # Esta función saca toda los puntos de bici, y de cada punto su estación, aunque todas las estaciones son la misma


class GetOneStationAPIView(generics.ListAPIView):
    lookup_field = 'slug'
    lookup_url_kwarg = 'slug'
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = Station.objects.all()
    # renderer_classes = (PointJSONRenderer)
    serializer_class = serializerStationsPoints

    def filter_queryset(self, queryset):
        filters = {self.lookup_field: self.kwargs[self.lookup_url_kwarg]}
        return queryset.filter(**filters)


class GetAllStationListAPIView(generics.ListAPIView):
    # permission_classes = (IsAuthenticated,)
    queryset = Station.objects.all()
    serializer_class = serializerStationsPoints


class CreateStationAPIView(APIView):
    permission_classes = (IsAuthenticated,)
    permission_classes = [IsStaff, ]
    serializer_stations = serializerStationsPoints
    serializer_points = CreatePointsSerializer
    serializer_bike = BikeSerializer

    def post(self, request):
        self.permission_classes = [IsStaff, ]
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
        self.permission_classes = [IsStaff, ]
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
        self.permission_classes = [IsStaff, ]
        try:
            station = Station.objects.get(slug=slug)
        except Station.DoesNotExist:
            return Response('A station with this slug does not exist.', status=404)
        print("station")
        print("station")
        print(station)
        print("station")
        print("station")

        station.delete()
        return Response(None, status=status.HTTP_204_NO_CONTENT)
# class UpdateStationAPIView(APIView):
#     permission_classes = (IsAuthenticated,)
#     permission_classes = [IsStaff, ]
#     serializer_stations = serializerStationsPoints
#     # lookup_field = 'slug'
#     # lookup_url_kwarg = 'slug'
