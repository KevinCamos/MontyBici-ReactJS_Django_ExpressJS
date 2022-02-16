from rest_framework import serializers
from .models import Notification, Reason
from src.apps.profiles.serializers import ProfileRegisterSerializer
from src.apps.bikes.serializers import MyRegisterSerializer


class ReasonsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reason
        fields = (
            'id',
            'reason',
        )


class NestedNotificationSerializer(serializers.ModelSerializer):
    notif_user= ProfileRegisterSerializer(many=False)
    register= MyRegisterSerializer(many=False)
    reason = ReasonsSerializer(many=False)
    class Meta:
        model = Notification
        fields = (
            'id',
            'notif_user',
            'register',
            'reason',
            'message',
            'created_at',
            'checked'
        )


class NotificationSerializer(serializers.ModelSerializer):
    created_at = serializers.SerializerMethodField(
        method_name='get_created_at')
    updated_at = serializers.SerializerMethodField(
        method_name='get_updated_at')
    message = serializers.CharField(required=True)

    class Meta:
        model = Notification
        fields = (
            'id',
            'notif_user',
            'register',
            'reason',
            'message',
            'created_at',
            'updated_at',
            'admin_check',
            'checked'
        )

    def create(self, validated_data):
        return Notification.objects.create(
            **validated_data
        )

    def get_created_at(self, instance):
        return instance.created_at.ctime()

    def get_updated_at(self, instance):
        return instance.updated_at.ctime()

    def update(self, instance, validated_data):
        instance.checked = validated_data.get(
            'checked', instance.checked)
        instance.admin_check = validated_data.get(
            'admin_check', instance.admin_check)
        instance.save()

        return instance
