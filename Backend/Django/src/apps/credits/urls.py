

from django.conf.urls import url
from .views import AmountCredit

app_name = 'credits'


urlpatterns = [

    url(r'^credit/?$', AmountCredit.as_view()),
 
]
