from rest_framework import serializers
from .models import Station, Point


class StationSerializer(serializers.ModelSerializer):
    slug = serializers.SlugField(required=False)
    name = serializers.CharField(required=True)
    direction = serializers.CharField(required=True)
    location = serializers.CharField(required=True)
    img = serializers.CharField(required=False)

    class Meta:
        model = Station
        fields = (
            'slug',
            'name',
            'direction',
            'location',
            'img',
        )


class StationPointsSerializer(serializers.ModelSerializer):

    class Meta:

        model = Station
        fields = '__all__'

    def to_representation(self, instance):
        return  { 
            
            "slug": instance.slug,
            "name": instance.name,
            "direction": instance.direction,
            "location": instance.location,
            "img": instance.slug,
            "points": list(Point.objects.filter(id_station=instance.id).values())
        }