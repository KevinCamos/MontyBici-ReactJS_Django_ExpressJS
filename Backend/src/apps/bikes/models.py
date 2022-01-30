from django.db import models

# Create your models here.


class Bike(models.Model):
    active = models.BooleanField( unique=False , default=True)
    def __str__(self):
        return str(self.id)+"-"+str(self.active)


# Modelo de Register_Bike, data_get se modifica automáticamente la primera vez que se crea, data_return es la última vez que se modifica (al devoler la bici)
class Register_Bike(models.Model):
    """ Por defecto, Django da el modelo ID """
    # id = models.AutoField(primary_key=True)
    user = models.ForeignKey('profiles.Profile', on_delete=models.DO_NOTHING)
    bike = models.ForeignKey(Bike, on_delete=models.DO_NOTHING)

    point_get = models.ForeignKey('stations.Point', on_delete=models.DO_NOTHING, related_name='id_point_get')

    data_get = models.DateField(auto_now_add=True, auto_now=False)

    point_return = models.ForeignKey('stations.Point',  on_delete=models.DO_NOTHING, null=True, related_name='id_point_return') #Comprovar que no n'ha tornada
    data_return = models.DateField(auto_now_add=False, auto_now=True)

    # Quan s'hatja de calcular el temps entre les dos dates => https://stackoverflow.com/questions/41229963/how-to-calculate-diff-between-two-dates-in-django
    # total_time = models.DateField(auto_now_add=False, auto_now=False)



    def __str__(self):
        return self.id
