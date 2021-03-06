# apis/urls.py
from django.conf.urls import url
from rest_framework.routers import DefaultRouter
from .views import RegisterAPIView, getReasons

router = DefaultRouter()

urlpatterns = [
    url(r'^notification/$', RegisterAPIView.as_view()),
    url(r'^notification/(?P<pk>[-\w]+)/?$', RegisterAPIView.as_view()),
    url(r'^reasons/$', getReasons.as_view()),

]
