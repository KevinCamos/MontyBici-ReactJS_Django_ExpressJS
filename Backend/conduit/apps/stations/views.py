from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import Station
from .serializers import StationSerializer
import logging


class StationViewSet(viewsets.ModelViewSet):
    logging.info("entra fins ací")

    queryset = Station.objects.all()
    serializer_class = StationSerializer