from rest_framework import serializers
from django.db.models import F

from .models import Profile
from src.apps.bikes.models import Register_Bike


class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')
    # bio = serializers.CharField(allow_blank=True, required=False)
    image = serializers.CharField(allow_blank=True, required=False)
    # registers= RegisterSerializer(many=True)
    # image = serializers.SerializerMethodField()
    # following = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        # fields = ('username', 'bio', 'image', 'following')
        fields = ('username',  'image', "registers")
        read_only_fields = ('username',)

    def to_representation(self, instance):
        register = Register_Bike.objects.filter(
            user=instance.pk, point_return__isnull=True).values('bike',station=F('point_get__station__name'))
        if register.count() == 0:
            return{
                "image": instance.image,
            }
        else:
            return{
                "image": instance.image,
                "registers": register[0]
            }



class ProfileRegisterSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')
    # bio = serializers.CharField(allow_blank=True, required=False)
    image = serializers.CharField(allow_blank=True, required=False)
    # image = serializers.SerializerMethodField()
    # following = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        # fields = ('username', 'bio', 'image', 'following')
        fields = ('username',  'image')
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
