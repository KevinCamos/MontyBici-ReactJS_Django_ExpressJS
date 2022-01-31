from rest_framework import serializers
from .models import Station, Point
from src.apps.bikes.serializers import BikeSerializer


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

##//ESTE YA NO ES GASTA
class StationPointsSerializer(serializers.ModelSerializer):
    station = StationSerializer(required=False)

    class Meta:

        model = Station
        # model = Point
        fields = '__all__'

    def to_representation(self, instance):
        return {

            "slug": instance.slug,
            "name": instance.name,
            "direction": instance.direction,
            "location": instance.location,
            "img": instance.slug,
            "points": list(Point.objects.filter(station=instance.id).values())
        }
##//ESTE YA NO ES GASTA



### YOLANDA, m'has de ficar un punt més quan corregeixes açò
class PointsSerializer(serializers.ModelSerializer):
    # categories = UserPostCategoriesSerializer(many=True)
    bike = BikeSerializer(many=False)

    class Meta:
        model = Point
        fields = ["id","bike", "active"]

        
class serializerStationsPoints(serializers.ModelSerializer):

    points = PointsSerializer(many=True)

    class Meta:
        model = Station
        fields = [
            'slug',
            'name',
            'direction',
            'location',
            'img',
            'points'

        ]
