from django.shortcuts import render

from rest_framework import status, serializers, generics
from rest_framework.exceptions import NotFound
# AUTENTICATIONS
from rest_framework.permissions import IsAuthenticated

from rest_framework.response import Response
from rest_framework.views import APIView

# SERIALIZERS
from .serializers import NotificationSerializer, ReasonsSerializer, NestedNotificationSerializer

# MODELS
from src.apps.bikes.models import Register_Bike
from .models import Reason, Notification

# PERMSISSIONS
from src.apps.core.permissions import IsStaff, IsNotStaff

from django_dbq.models import Job



class getReasons(generics.ListAPIView):

    permission_classes = (IsAuthenticated,)
    queryset = Reason.objects.filter()
    serializer_class = ReasonsSerializer




class RegisterAPIView(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = NotificationSerializer

    def get(self, request):
        # Job.objects.create(name="my_job",workspace={"key": "value"})

        # queue_depths = Job.get_queue_depths()
        # print(queue_depths)  # {"default": 1, "other_queue": 1}

 
        self.permission_classes = [IsStaff, ]
        queryset = Notification.objects.filter(checked=False)
        serializer =NestedNotificationSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def post(self, request):
        self_uuid = self.request.user.profile.pk
        id_register = request.data.get('id_register', {})
        id_reason = request.data.get('id_reason', {})
        message = request.data.get('message', {})
        print(request.data)
        if id_register:
            print(id_register, "id register")
            registered = Register_Bike.objects.filter(
                pk=id_register, user=self_uuid)
            print(self_uuid)
            print(registered)

            if registered.count() == 0:
                raise serializers.ValidationError(
                    'Esta ID de registro no concuerda con el usuario, un usuario solo puede referenciar un registro propio.')
        else:
            id_register = None
        try:
            print(id_reason, "id reason")
            reason = Reason.objects.get(pk=id_reason)
        except Reason.DoesNotExist:
            raise NotFound('Esta razón no existe.')

        data = {
            'notif_user': self_uuid,
            'reason': reason.pk,
            'register': id_register,
            "message": message
        }

        serializer = self.serializer_class(
            data=data
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def put(self, request, pk):
        self.permission_classes = [IsStaff, ]
        self_uuid = self.request.user.profile.pk
        id_notification = pk
        checked = request.data.get('checked', {})
        if checked == None:
            raise serializers.ValidationError(
                'Debes enviar si quieres marcar o desmarcar la notificación como vista.')
        try:
            notification = Notification.objects.get(pk=id_notification)
        except Notification.DoesNotExist:
            raise NotFound('Esta razón no existe.')

        data = {'checked': checked, 'admin_check': self_uuid}
        context = {'admin_check': self_uuid}
 
        isChecked=notification.admin_check
        serializer = self.serializer_class(
            instance=notification,  data=data, context=context, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        if isChecked ==None:
            job_value={
                "name": notification.notif_user.user.username,
                "email": notification.notif_user.user.email,
                "reason": notification.reason.reason,
                "usermessage": notification.message,
            }
            Job.objects.create(name="job_mail",workspace={"data": job_value} )

        return Response(serializer.data, status=status.HTTP_201_CREATED)
