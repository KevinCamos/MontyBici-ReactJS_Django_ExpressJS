

from rest_framework import serializers
from django.core.mail import send_mail
from src import settings


class DynamicFieldsModelSerializer(serializers.ModelSerializer):
    """
    A ModelSerializer that takes an additional `fields` argument that
    controls which fields should be displayed.
    """

    def __init__(self, *args, **kwargs):
        # Don't pass the 'fields' arg up to the superclass
        fields = kwargs.pop('fields', None)

        # Instantiate the superclass normally
        super().__init__(*args, **kwargs)

        if fields is not None:
            # Drop any fields that are not specified in the `fields` argument.
            allowed = set(fields)
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)


class EmailSerializer(serializers.Serializer):
    receiver = serializers.EmailField()
    subject = serializers.CharField(max_length=50, min_length=4)
    message = serializers.CharField(max_length=1000, min_length=30)

    def sendmail(self):
        
        send_mail(
            self.validated_data['subject'],
            self.validated_data['message'],
            settings.DEFAULT_FROM_EMAIL,
            [self.validated_data['receiver']],
            fail_silently=False,
        )
