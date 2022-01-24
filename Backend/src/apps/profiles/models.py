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
        # randomstring= uuid.uuid4

    randomstring= ''.join(random.sample(ascii_uppercase,4)+random.sample(digits,4)+random.sample(ascii_uppercase,1))

    url = "https://avatars.dicebear.com/api/avataaars/"+randomstring+".svg"
    image = models.TextField(blank=True, default=url)
    image = models.URLField(blank=True)

    # This is an example of a Many-To-Many relationship where both sides of the
    # relationship are of the same model. In this case, the model is `Profile`.
    # As mentioned in the text, this relationship will be one-way. Just because
    # you are following mean does not mean that I am following you. This is
    # what `symmetrical=False` does for us.

    # follows = models.ManyToManyField(
    #     'self',
    #     related_name='followed_by',
    #     symmetrical=False
    # )

    # registers = models.ManyToManyField(
    #     'bikes.Register_Bike',
    #     related_name='my_registers'
    # )


    def __str__(self):
        return self.user.username