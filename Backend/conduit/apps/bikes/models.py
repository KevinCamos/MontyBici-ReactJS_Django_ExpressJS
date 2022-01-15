from django.db import models

# Create your models here.

class Bike(models.Model):
    """ Por defecto, Django da el modelo ID """
    # id = models.AutoField(primary_key=True) 
    state = models.CharField(max_length=20)
    location = models.CharField(max_length=50)
    # battery =  models.IntegerField()

    def __str__(self):
        return self.state