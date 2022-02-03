from rest_framework import serializers
from .models import Bike,Register_Bike

from src.apps.profiles.serializers import ProfileSerializer
from src.apps.stations.serializers import MyPointsSerializer
from src.apps.stations.models import Station,Point

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

        user = self.context['user']
        bike = self.context['bike']
        return Register_Bike.objects.create(
            user=user, bike=bike, **validated_data
        )
    def get_data_get(self, instance):
        return instance.data_get.isoformat()

    def data_return(self, instance):
        return instance.updated_at.isoformat()

    def update(self, instance, validated_data):
 
        instance.point_return = validated_data.get('point_return', instance.point_return)
        instance.save()
        return instance



  
class DynamicFieldsModelSerializer(serializers.ModelSerializer):

    def __init__(self, *args, **kwargs):
        # Don't pass the 'fields' arg up to the superclass
        fields = kwargs.pop('fields', None)

        super(DynamicFieldsModelSerializer, self).__init__(*args, **kwargs)

        if fields is not None:
            allowed = set(fields)
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)

# class MyRegisterSerializer(DynamicFieldsModelSerializer):
  
#     class Meta:
#         model = Register_Bike
#         fields = '__all__'

    
#     def to_representation(self, instance):
#         register = list(self.objects.filter().values())
#         return{
#             "register": register,
#         }




        
class MyRegisterSerializer(serializers.ModelSerializer):
    point_get = MyPointsSerializer(many=False, required=False)
    point_return = MyPointsSerializer(many=False, required=False)
    # point_return = StationSerializer(many=False)

    class Meta:
        model = Register_Bike
        fields = (
            'user',
            'bike',
            'point_get',
            'data_get',
            'point_return',
            'data_return',
          )
