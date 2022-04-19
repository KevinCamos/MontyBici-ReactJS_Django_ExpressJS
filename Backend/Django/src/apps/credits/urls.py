

from django.conf.urls import url
from .views import UpdateAmountCredit

app_name = 'credits'


urlpatterns = [

    url(r'^credit/?$', UpdateAmountCredit.as_view()),
 
]
