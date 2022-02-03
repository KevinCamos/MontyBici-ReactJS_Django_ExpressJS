from rest_framework import serializers
from .models import Station, Point
from src.apps.bikes.models import Bike


#Estos dos serializadores se utilizan para serializar las estaciones de los registros
class StationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Station
        fields =[ 'name']
        
class MyPointsSerializer(serializers.ModelSerializer):
    station = StationSerializer(many=False)

    class Meta:
        model = Point
        fields = ["id","station"]

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



class BikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bike
        fields = (
            'id',
            'active',
        )
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
