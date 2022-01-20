from django.shortcuts import render
from rest_framework.exceptions import NotFound

from rest_framework import viewsets,  mixins, status
from rest_framework.generics import RetrieveAPIView, ListAPIView

from rest_framework.permissions import (AllowAny, IsAuthenticatedOrReadOnly, IsAuthenticated, IsAdminUser,)
from rest_framework.response import Response

from .models import Station
from .serializers import StationSerializer, StationPointsSerializer
# import logging
# class StationViewSet(viewsets.ModelViewSet):
#     print("entra fins StationViewSet")

#     queryset = Station.objects.all()
#     serializer_class = StationSerializer


class StationListAPIView(ListAPIView):
    queryset = Station.objects.all()
    # permission_classes = (AllowAny,)
    serializer_class = StationPointsSerializer  


class StationRetrieveAPIView(RetrieveAPIView):
    queryset = Station.objects.all()
    serializer_class = StationPointsSerializer


