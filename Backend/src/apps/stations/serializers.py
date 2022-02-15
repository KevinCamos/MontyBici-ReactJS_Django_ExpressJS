from django.forms import SlugField
from django.forms import ImageField
from rest_framework import serializers
from .models import Station, Point
from src.apps.bikes.models import Bike


# Estos dos serializadores se utilizan para serializar las estaciones de los registros
class StationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Station
        fields = ['name']


class MyPointsSerializer(serializers.ModelSerializer):
    station = StationSerializer(many=False)

    class Meta:
        model = Point
        fields = ["id", "station"]


class BikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bike
        fields = (
            'id',
            'active',
        )

# YOLANDA, m'has de ficar un punt més quan corregeixes açò


class PointsSerializer(serializers.ModelSerializer):
    # categories = UserPostCategoriesSerializer(many=True)
    bike = BikeSerializer(many=False)

    class Meta:
        model = Point
        fields = ["id", "bike", "active"]


class serializerStationsPoints(serializers.ModelSerializer):

    points = PointsSerializer(many=True, required=False)
    slug = SlugField(required=False)
    img = ImageField(required=False)

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
        instance.direction = validated_data.get(
            'direction', instance.direction)
        instance.location = validated_data.get('location', instance.location)
        instance.img = validated_data.get('img', instance.img)
        instance.save()
        return instance


# Serializadores para traer a la inversa, las bicis y sus estaciones si tienen


class serializerStations(serializers.ModelSerializer):
    class Meta:
        model = Station
        fields = [
            'slug',
            'name',
            'img',
        ]


class GetBikeSerializer(serializers.ModelSerializer):
    points = MyPointsSerializer(many=False, required=False)

    class Meta:
        model = Bike
        fields = (
            'id',
            'active',
            'points'
        )

    def update(self, instance, validated_data):

        instance.active = validated_data.get('active', instance.active)
        instance.save()
        return instance


class CreatePointsSerializer(serializers.ModelSerializer):
    # station = StationSerializer(many=False)
    # bike = BikeSerializer(many=False)

    class Meta:
        model = Point
        fields = ["id", "active", "station", "bike"]
    def update(self, instance, validated_data):

        instance.bike = validated_data.get('bike', instance.bike)
        instance.save()
        return instance

class AllPointsSerializer(serializers.ModelSerializer):
    station = StationSerializer(many=False)
    bike = BikeSerializer(many=False)

    class Meta:
        model = Point
        fields = ["id", "active", "station", "bike"]

    def update(self, instance, validated_data):
        if self.context:
            instance.bike = self.context['bike']
        else: 
            instance.active = validated_data.get('active', instance.active)

        instance.save()
        return instance


