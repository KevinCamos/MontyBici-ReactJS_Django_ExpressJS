from django.conf.urls import include, url
from rest_framework.routers import DefaultRouter


from .views import GetAllStationListAPIView,GetOneStationAPIView,CreateStationAPIView,UpdpatePointAPIView,BikeListAPIView,UpdpateBikePointAPIView

router = DefaultRouter()

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^station/(?P<slug>[-\w]+)/?$', GetOneStationAPIView.as_view(), name='stations'),
    url(r'^station/?$', GetAllStationListAPIView.as_view(), name='stations'),
    url(r'^station-admin/?$', CreateStationAPIView.as_view(), name='stations'),
    url(r'^station-admin/(?P<slug>[-\w]+)/?$', CreateStationAPIView.as_view(), name='stations'),
    url(r'^updatepoint/$', UpdpatePointAPIView.as_view()),
    url(r'^updatepointsbike/$', UpdpateBikePointAPIView.as_view()),
    url(r'^getpoints/$', BikeListAPIView.as_view()),

]