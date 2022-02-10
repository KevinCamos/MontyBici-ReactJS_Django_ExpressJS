from django.conf.urls import include, url
from rest_framework.routers import DefaultRouter


from .views import GetAllStationListAPIView,GetOneStationAPIView,CreateStationAPIView

router = DefaultRouter()

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^station/(?P<slug>[-\w]+)/?$', GetOneStationAPIView.as_view(), name='stations'),
    url(r'^station/?$', GetAllStationListAPIView.as_view(), name='stations'),
    url(r'^station-admin/?$', CreateStationAPIView.as_view(), name='stations'),
    url(r'^station-admin/(?P<slug>[-\w]+)/?$', CreateStationAPIView.as_view(), name='stations'),

]