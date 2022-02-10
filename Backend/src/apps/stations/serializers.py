from django.forms import SlugField
from django.forms import ImageField
from rest_framework import serializers
from .models import Station, Point
from src.apps.bikes.models import Bike


class CreatePointsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Point
        fields = ["id","station","bike"]


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

    points = PointsSerializer(many=True, required=False)
    slug = SlugField(required=False)
    img= ImageField(required=False)
    class Meta:
        model = Station
        fields = [
            'id',
            'slug',
            'name',
            'direction',
            'location',
            'img',
            'points'
        ]
    def update(self, instance, validated_data):
 
        instance.name = validated_data.get('name', instance.name)
        instance.direction = validated_data.get('direction', instance.direction)
        instance.location = validated_data.get('location', instance.location)
        instance.img = validated_data.get('img', instance.img)
        instance.save()
        return instance
