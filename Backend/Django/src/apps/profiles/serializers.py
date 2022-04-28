import json
import datetime

from django.forms import DecimalField
from rest_framework import serializers
from django.db.models import F
from src.apps.credits.models import Credit

from src.apps.credits.serializers import serializerCredit

from .models import Profile
from src.apps.bikes.models import Register_Bike


class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')
    image = serializers.CharField(allow_blank=True, required=False)

    class Meta:
        model = Profile
        fields = ('username',  'image')
        read_only_fields = ('username',)

    def to_representation(self, instance):
        register = Register_Bike.objects.filter(
            user=instance.pk, point_return__isnull=True).values('bike','data_get', station=F('point_get__station__name'))
      
        credit = Credit.objects.filter(id_user=instance.pk).last()
        if credit: 
            amount= {"amount": str(credit.amount)}
        else :
            amount = {"amount": "0"}
        if register.count() == 0:

            return{
                "image": instance.image,
                "credit": amount
            }
        else:
            reg= register[0]
            reg["data_get"]=register[0]['data_get'].isoformat()

            return{
                "image": instance.image,
                "registers":reg,
                "credit": amount
            }


class ProfileRegisterSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')
    # bio = serializers.CharField(allow_blank=True, required=False)
    image = serializers.CharField(allow_blank=True, required=False)
    # image = serializers.SerializerMethodField()
    # following = serializers.SerializerMethodField()
    credit = serializers.CharField(allow_blank=True, required=False)

    class Meta:
        model = Profile
        # fields = ('username', 'bio', 'image', 'following')
        fields = ('username',  'image', "credit")
        read_only_fields = ('username',)
    # def get_image(self, obj):
    #     if obj.image:
    #         return obj.image

    #     return 'https://static.productionready.io/images/smiley-cyrus.jpg'

    # def get_following(self, instance):
    #     request = self.context.get('request', None)

    #     if request is None:
    #         return False

    #     # if not request.user.is_authenticated():
    #     if not request.user.is_authenticated:
    #         return False

    #     follower = request.user.profile
    #     followee = instance

    #     return follower.is_following(followee)
