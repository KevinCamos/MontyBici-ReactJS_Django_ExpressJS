from django.db import models

class Credit(models.Model):
    id_user = models.ForeignKey('profiles.Profile', on_delete=models.DO_NOTHING , related_name='credit')
    amount = models.DecimalField(max_digits=6, decimal_places=2, default=0)
    movement = models.DecimalField(max_digits=6, decimal_places=2, default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.id_user)


