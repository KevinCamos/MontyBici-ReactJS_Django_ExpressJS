# apis/urls.py
from django.conf.urls import url
from .views import RegisterAPIView, EndRegisterUpdateAPIView
from .views import BikeViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('', BikeViewSet, basename='montybicis')

urlpatterns = [
    url(r'^register/$', RegisterAPIView.as_view()),
    url(r'^endregister/$', EndRegisterUpdateAPIView.as_view()),

]
