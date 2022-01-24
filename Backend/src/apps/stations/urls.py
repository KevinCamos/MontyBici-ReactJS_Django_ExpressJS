from django.conf.urls import include, url
from rest_framework.routers import DefaultRouter


from .views import StationListAPIView

router = DefaultRouter()
# router.register('', StationViewSet, basename='montybicis')
# router.register('', StationList, basename='montybicis')
urlpatterns = [
    url(r'^', include(router.urls)),
    # url(r'^station/?$', StationListAPIView.as_view(), name='stations'),
    # url(r'^station/(?P<slug>[-\w]+)/?$', PointListFiltered.as_view(), name='stations'),
    # url(r'^allstation/?$', AllPointsWithStations.as_view(), name='stations'),
    url(r'^station/?$', StationListAPIView.as_view(), name='stations'),

]
