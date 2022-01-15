# apis/urls.py
from django.urls import path

from .views import BikeViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('', BikeViewSet, basename='montybicis')
urlpatterns = router.urls