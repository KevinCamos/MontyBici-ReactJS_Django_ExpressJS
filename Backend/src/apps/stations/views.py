from django.shortcuts import render
from rest_framework.exceptions import NotFound
from rest_framework import viewsets,  mixins, status, generics

from rest_framework.permissions import (AllowAny, IsAuthenticatedOrReadOnly, IsAuthenticated, IsAdminUser,)
from rest_framework.response import Response
from .renderers import PointJSONRenderer
from .models import Point, Station
from .serializers import StationPointsSerializer, serializerStationsPoints


# # Esta función saca toda los puntos de bici, y de cada punto su estación, aunque todas las estaciones son la misma 
# class PointListFiltered(generics.ListAPIView):
#     lookup_field = 'station__slug'
#     lookup_url_kwarg = 'slug'
#     permission_classes = (IsAuthenticatedOrReadOnly,)
#     queryset = Point.objects.select_related(
#         'station'
#     )
#     # renderer_classes = (PointJSONRenderer)
#     serializer_class = PointsSerializer

#     def filter_queryset(self, queryset):
#         # The built-in list function calls `filter_queryset`. Since we only
#         # want comments for a specific article, this is a good place to do
#         # that filtering.
#         filters = {self.lookup_field: self.kwargs[self.lookup_url_kwarg]}

#         return queryset.filter(**filters)

#ESTE YA NO ES GASTA
# class StationListAPIView(generics.ListAPIView):
#     queryset = Station.objects.all()
#     # permission_classes = (AllowAny,)
#     serializer_class = StationPointsSerializer  


# class StationRetrieveAPIView(generics.RetrieveAPIView):
#     queryset = Station.objects.all()
#     serializer_class = StationPointsSerializer



class StationListAPIView(generics.ListAPIView):
    queryset = Station.objects.all().prefetch_related('points')
    serializer_class = serializerStationsPoints


