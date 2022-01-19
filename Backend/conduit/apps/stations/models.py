from django.db import models

# Create your models here.
class Station(models.Model):
    """ Por defecto, Django da el modelo ID """
    # id = models.AutoField(primary_key=True) 
    slug = models.SlugField(db_index=True, max_length=255, unique=True )

    name = models.CharField(db_index=True,max_length=30, unique=True)
    direction = models.CharField(max_length=100)
    location = models.CharField(max_length=30)
    img = models.CharField(max_length=200)
    # battery =  models.IntegerField()

    def __str__(self):
        return self.slug