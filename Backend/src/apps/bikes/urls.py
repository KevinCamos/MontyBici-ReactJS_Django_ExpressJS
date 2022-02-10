# apis/urls.py
from django.conf.urls import url
from .views import BikeListAPIView,ObtainMyRegisterAPIView,RegisterAPIView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
# router.register('', BikeViewSet, basename='montybicis')

urlpatterns = [
    url(r'^getbikes/$', BikeListAPIView.as_view()),

    url(r'^register/$', RegisterAPIView.as_view()),
    url(r'^myregisters/$', ObtainMyRegisterAPIView.as_view()),

]
