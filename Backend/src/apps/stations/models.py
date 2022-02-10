from django.db import models
from src.apps.bikes.models import Bike
# Create your models here.
from rest_framework.exceptions import NotFound


class Station(models.Model):
    slug = models.SlugField(
        db_index=True, max_length=255, unique=True, blank=True)

    name = models.CharField(db_index=True, max_length=30, unique=True)
    direction = models.CharField(max_length=100)
    location = models.CharField(max_length=30)
    img = models.ImageField(upload_to='stations/img/', null=True, blank=True)
    def __str__(self):
        return str(self.name)


class Point(models.Model):
    station = models.ForeignKey(
        Station, on_delete=models.CASCADE,   related_name='points',)
    bike = models.OneToOneField(
        Bike,  on_delete=models.SET_NULL, unique=True, blank=True, null=True, related_name='points',)

    active = models.BooleanField(unique=False, default=True)

    def __str__(self):
        return str(self.id)+"-"+str(self.station)

    def checkPointAvailable(self):

        if self.active == False:
            raise NotFound("Este punto está estropeado, no está disponible")
        elif self.bike == None:
            raise NotFound("No hay bicicleta")
        elif self.bike.active == False:
            raise NotFound("Esta bicicleta no se encuentra disponible")
        elif self.bike.active == True:
            return self.bike.pk
        else:
            raise NotFound('Error not found.')

    def checkFreePoint(self):

        if self.active == False:
            raise NotFound( "Este punto está estropeado, no está disponible")
        elif self.bike != None:
            raise NotFound( "Hay una bicicleta en este puesto")
        else:
            return self

        # """Follow `profile` if we're not already following `profile`."""
        # self.follows.add(profile)
    def RemoveBike(self):
        try:
            self.bike = None
            print("BICI ELIMINADA")
            self.save()

        except Point.DoesNotExist:
            raise NotFound('Este punto de estación no existe.')

    def SaveBike(self, bike):
        try:
            print("Bici Guardada")
            self.bike = bike

            self.save()

        except Point.DoesNotExist:
            raise NotFound('Este punto de estación no existe.')

        # """Follow `profile` if we're not already following `profile`."""
        # self.follows.add(profile)
