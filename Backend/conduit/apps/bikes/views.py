from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets

# from bikes import models
from .models import Bike

from .serializers import BikeSerializer


class BikeViewSet(viewsets.ModelViewSet):
    queryset = Bike.objects.all()
    serializer_class = BikeSerializer