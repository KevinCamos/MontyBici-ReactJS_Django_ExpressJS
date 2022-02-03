from django.db import models
from django.db import models
from src.apps.core.models import TimestampedModel


import uuid
from string import ascii_uppercase, digits
import random

class Profile(TimestampedModel):
    # As mentioned, there is an inherent relationship between the Profile and
    # User models. By creating a one-to-one relationship between the two, we
    # are formalizing this relationship. Every user will have one -- and only
    # one -- related Profile model.


    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    user = models.OneToOneField(
        'authentication.User', on_delete=models.CASCADE
    )

    # Each user profile will have a field where they can tell other users
    # something about themselves. This field will be empty when the user
    # creates their account, so we specify `blank=True`.
    # bio = models.TextField(blank=True)

    # In addition to the `bio` field, each user may have a profile image or
    # avatar. Similar to `bio`, this field is not required. It may be blank.


      
    #RANDOM IMAGE ON REGISTER PROFILE
    randomstring= ''.join(random.sample(ascii_uppercase,4)+random.sample(digits,4)+random.sample(ascii_uppercase,1))

    url = "https://avatars.dicebear.com/api/avataaars/"+randomstring+".svg"
    image = models.URLField(blank=True,  default=url)



    def __str__(self):
        return self.user.username