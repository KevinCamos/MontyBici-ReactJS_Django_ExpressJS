from django.shortcuts import render
from rest_framework.exceptions import NotFound

from rest_framework import viewsets,  mixins, status
from rest_framework.generics import RetrieveAPIView, ListAPIView

from rest_framework.permissions import (AllowAny, IsAuthenticatedOrReadOnly, IsAuthenticated, IsAdminUser,)
from rest_framework.response import Response

from .models import Station
from .serializers import StationSerializer, StationPointsSerializer
# import logging
# class StationViewSet(viewsets.ModelViewSet):
#     print("entra fins StationViewSet")

#     queryset = Station.objects.all()
#     serializer_class = StationSerializer


class StationListAPIView(ListAPIView):
    queryset = Station.objects.all()
    # pagination_class = None
    permission_classes = (AllowAny,)
    serializer_class = StationPointsSerializer  

    # def list(self, request):
    #     serializer_data = self.get_queryset()
    #     serializer = self.serializer_class(serializer_data, many=True)

    #     print('*********** serializer.data ************')
    #     print(serializer.data)
    #     return Response({
    #         'stations': serializer.data
    #     }, status=status.HTTP_200_OK)


class StationRetrieveAPIView(RetrieveAPIView):
    queryset = Station.objects.all()
    serializer_class = StationSerializer


    # def retrieve(self, request, slug, *args, **kwargs):
    #     serializer_context = {'request': request}
    #     try:
    #         serializer_instance = self.queryset.get(slug=slug)
    #     except Station.DoesNotExist:
    #         raise NotFound('An article with this slug does not exist.')

    #     serializer = self.serializer_class(
    #         serializer_instance,
    #         context=serializer_context
    #     )
    #     return Response(serializer.data, status=status.HTTP_200_OK)
