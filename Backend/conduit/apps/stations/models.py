from django.db import models

# Create your models here.


class Station(models.Model):
    slug = models.SlugField(db_index=True, max_length=255, unique=True)

    name = models.CharField(db_index=True, max_length=30, unique=True)
    direction = models.CharField(max_length=100)
    location = models.CharField(max_length=30)
    img = models.CharField(max_length=200)

    
    # battery =  models.IntegerField()

    def __str__(self):
        return str(self.slug)


class Point(models.Model):
    """ Por defecto, Django da el modelo ID """
    # id = models.AutoField(primary_key=True)
    
    id_station = models.ForeignKey(Station, on_delete=models.CASCADE)
    id_bike = models.ForeignKey('bikes.Bike', related_name='points', on_delete=models.SET_NULL,unique=True, blank=True, null=True)

    status = models.CharField(max_length=10, unique=False)


    def __str__(self):
        return str(self.id)
