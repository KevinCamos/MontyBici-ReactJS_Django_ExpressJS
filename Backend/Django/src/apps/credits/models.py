from django.db import models
from src.apps.core.models import TimestampedModel
from django.core.validators import MinLengthValidator



# Modelo de Register_Bike, data_get se modifica automáticamente la primera vez que se crea, data_return es la última vez que se modifica (al devoler la bici)
class Credit(models.Model):
    id_user = models.ForeignKey('profiles.Profile', on_delete=models.DO_NOTHING , related_name='id_user')
    amount = models.DecimalField(max_digits=6, decimal_places=2, default=0)
    movement = models.DecimalField(max_digits=6, decimal_places=2, default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    # Quan s'hatja de calcular el temps entre les dos dates => https://stackoverflow.com/questions/41229963/how-to-calculate-diff-between-two-dates-in-django



    def __str__(self):
        return str(self.id_user)


