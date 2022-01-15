from rest_framework import serializers
from .models import Bike


class BikeSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'state',
            'location',
        )
        model = Bike