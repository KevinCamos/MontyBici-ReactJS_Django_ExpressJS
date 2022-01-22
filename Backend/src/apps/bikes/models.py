from django.db import models

# Create your models here.


class Bike(models.Model):
    active = models.BooleanField( unique=False , default=True)
    def __str__(self):
        return str(self.id)+"-"+self.active


# # Modelo de Register_Bike, data_get se modifica automáticamente la primera vez que se crea, data_return es la última vez que se modifica (al devoler la bici)
# class Register_Bike(models.Model):
#     """ Por defecto, Django da el modelo ID """
#     # id = models.AutoField(primary_key=True)
#     id_user = models.ForeignKey('User')
#     id_bike = models.ForeignKey(Bike)

#     id_point_get = models.ForeignKey('stations.Points')

#     data_get = models.DateField(auto_now_add=True, auto_now=False)

#     id_point_return = models.ForeignKey('stations.Points', null=True)
#     data_return = models.DateField(auto_now_add=False, auto_now=True)

#     # Quan s'hatja de calcular el temps entre les dos dates => https://stackoverflow.com/questions/41229963/how-to-calculate-diff-between-two-dates-in-django
#     # total_time = models.DateField(auto_now_add=False, auto_now=False)

#     def __str__(self):
#         return self.id
