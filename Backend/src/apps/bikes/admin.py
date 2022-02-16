from django.contrib import admin

# Register your models here.
from .models import Bike, Register_Bike

admin.site.register(Bike)
admin.site.register(Register_Bike)