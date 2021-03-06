from django.forms import DecimalField, UUIDField
from rest_framework import serializers

from .models import Credit

class serializerCredit(serializers.ModelSerializer):

    movement = DecimalField( required=False)
    amount = DecimalField( required=False)
    id_user = UUIDField( required=False)
    class Meta:
        model = Credit
        fields = [
            'movement', 'amount', 'created_at', 'id_user'
        ]

    def create(self, validated_data):
        return Credit.objects.create(
            **validated_data
        )

