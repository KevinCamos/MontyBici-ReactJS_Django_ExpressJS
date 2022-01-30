from rest_framework import serializers
from .models import Bike,Register_Bike
from src.apps.profiles.serializers import ProfileSerializer


class BikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bike
        fields = (
            'id',
            'active',
        )


class RegisterSerializer(serializers.ModelSerializer):
    user = ProfileSerializer(required=False)
    bike = BikeSerializer(required=False)

    # data_get = serializers.SerializerMethodField(method_name='get_data_get')
    # data_return = serializers.SerializerMethodField(method_name='data_return')

    class Meta:
        model = Register_Bike
        fields = (
            'id',
            'user',
            'bike',
            'point_get',
            'data_get',
            'point_return',
            'data_return'
        )

    def create(self, validated_data):
        print("ENTRA FINS ACÍ")

        user = self.context['user']
        bike = self.context['bike']
        return Register_Bike.objects.create(
            user=user, bike=bike, **validated_data
        )
    def get_data_get(self, instance):
        return instance.data_get.isoformat()

    def data_return(self, instance):
        return instance.updated_at.isoformat()