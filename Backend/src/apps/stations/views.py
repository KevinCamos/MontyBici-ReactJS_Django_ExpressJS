from django.shortcuts import render
from rest_framework.exceptions import NotFound
from rest_framework import viewsets,  mixins, status, generics

from rest_framework.permissions import (AllowAny, IsAuthenticatedOrReadOnly, IsAuthenticated, IsAdminUser,)
from rest_framework.response import Response
from .renderers import PointJSONRenderer
from .models import Point, Station
from .serializers import StationPointsSerializer, serializerStationsPoints


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