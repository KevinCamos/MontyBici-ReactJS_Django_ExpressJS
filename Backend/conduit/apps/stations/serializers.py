from rest_framework import serializers
from .models import Station


class StationSerializer(serializers.ModelSerializer):
    slug = serializers.SlugField(required=False)
    name =  serializers.CharField(required=True)
    direction =  serializers.CharField(required=True)
    location =  serializers.CharField(required=True)
    img =  serializers.CharField(required=False)


    class Meta:
        model = Station
        fields = (
            'slug',
            'name',
            'direction',
            'location',
            'img',
        )