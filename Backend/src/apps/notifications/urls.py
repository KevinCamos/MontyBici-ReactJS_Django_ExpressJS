# apis/urls.py
from django.conf.urls import url
from .views import RegisterAPIView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

urlpatterns = [
    url(r'^notification/$', RegisterAPIView.as_view()),
 


]
