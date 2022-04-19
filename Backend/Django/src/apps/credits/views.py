from rest_framework import serializers, status
from rest_framework.exceptions import NotFound
from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Credit
from .serializers import serializerCredit
from rest_framework import viewsets


class UpdateAmountCredit(APIView):
    permission_classes = (IsAuthenticated,)

    serializer_class = serializerCredit

    def post(self, request):
        movement = request.data.get('movement', {})
        self_uuid = self.request.user.profile.pk
        if (type(movement) != int ):
            raise NotFound("error")

       
        obj = Credit.objects.filter(id_user=self_uuid).last()
        if obj != None:
            amount = obj.amount + movement
        else:
            amount= movement


        serializer = self.serializer_class(
            data={"movement": movement, "amount": amount, "id_user": str(self_uuid)})
        serializer.is_valid(raise_exception=True)

        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
