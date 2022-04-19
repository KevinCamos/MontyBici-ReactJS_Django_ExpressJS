from django.forms import DecimalField, UUIDField
from rest_framework import serializers

from .models import Credit

class serializerCredit(serializers.ModelSerializer):

    movement = DecimalField( required=False)
    amount = DecimalField( required=False)
    class Meta:
        model = Credit
        fields = [
            'id_user','movement', 'amount'
        ]

    def create(self, validated_data):
        return Credit.objects.create(
            **validated_data
        )

