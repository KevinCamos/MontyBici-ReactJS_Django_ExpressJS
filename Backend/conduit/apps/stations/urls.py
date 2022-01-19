# apis/urls.py
from django.urls import path

from .views import StationViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('', StationViewSet, basename='montybicis')
urlpatterns = router.urls