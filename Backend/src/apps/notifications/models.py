from django.db import models
from src.apps.core.models import TimestampedModel
from django.core.validators import MinLengthValidator


class Reason(models.Model):
    reason = models.CharField(max_length=64, blank=False, null=False)
    def __str__(self):
        return self.reason


# Modelo de Register_Bike, data_get se modifica automáticamente la primera vez que se crea, data_return es la última vez que se modifica (al devoler la bici)
class Notification(TimestampedModel):
    notif_user = models.ForeignKey('profiles.Profile', on_delete=models.DO_NOTHING , related_name='notif_user')
    register = models.ForeignKey('bikes.Register_bike', on_delete=models.DO_NOTHING)

    reason = models.ForeignKey(Reason, on_delete=models.DO_NOTHING)
    message = models.TextField(blank=True,  validators=[MinLengthValidator(4)])
    admin_check = models.ForeignKey('profiles.Profile',default=None, null=True, on_delete=models.DO_NOTHING,related_name='admin_check')
    checked = models.BooleanField(default=False)

    # Quan s'hatja de calcular el temps entre les dos dates => https://stackoverflow.com/questions/41229963/how-to-calculate-diff-between-two-dates-in-django



    def __str__(self):
        return str(self.id)

