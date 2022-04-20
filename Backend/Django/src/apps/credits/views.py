from rest_framework import serializers, status
from rest_framework.exceptions import NotFound
from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Credit
from .serializers import serializerCredit
from rest_framework import viewsets
from django_dbq.models import Job


class AmountCredit(APIView):
    permission_classes = (IsAuthenticated,)

    serializer_class = serializerCredit

    def post(self, request):
        movement = request.data.get('movement',{})
        self_uuid = self.request.user.profile.pk

        if (type(movement) != int ):
            raise NotFound("error")

        try:
           obj = Credit.objects.filter(id_user=self_uuid).last()
           if obj != None:
               amount = obj.amount + movement
           else:
               amount= movement
        except Credit.DoesNotExist:
            raise NotFound('Esta razón no existe.')


        serializer = self.serializer_class(
            data={"movement": movement, "amount": amount, "id_user": str(self_uuid)})
        serializer.is_valid(raise_exception=True)

        serializer.save()

        job_value={
            "name": self.request.user.username,
            "email": self.request.user.email,
            "reason": "Tu saldo ha sido modificado",
            "message": "Tu saldo ha sido modificado, ahora tienes "+str(amount)+" en tu cuenta.",
        }
        Job.objects.create(name="job_mail_payment",workspace={"data": job_value} )


        return Response(serializer.data, status=status.HTTP_201_CREATED)


    def get(self, request):
        self_uuid = self.request.user.profile.pk
               
        queryset = Credit.objects.filter(id_user=self_uuid)
        serializer =self.serializer_class(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
