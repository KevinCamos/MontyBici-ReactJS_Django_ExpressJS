from django.db import models
from src.apps.bikes.models import Bike
# Create your models here.


class Station(models.Model):
    slug = models.SlugField(db_index=True, max_length=255, unique=True, blank=True)

    name = models.CharField(db_index=True, max_length=30, unique=True)
    direction = models.CharField(max_length=100)
    location = models.CharField(max_length=30)
    img = models.CharField(max_length=200, blank=True)

    def __str__(self):
        return str(self.name)









class Point(models.Model):
    id_station = models.ForeignKey(Station, on_delete=models.CASCADE)
    id_bike = models.OneToOneField(Bike,  on_delete=models.SET_NULL,unique=True, blank=True, null=True)

    active = models.BooleanField( unique=False , default=True)


    def __str__(self):
        return str(self.id)+"-"+str(self.id_station)
