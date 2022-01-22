from faker import Faker
from src.apps.stations.models import Station
import django
import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'src.settings')

django.setup()


fake = Faker()
""" https://upload.wikimedia.org/wikipedia/commons/f/fb/Citybike_station_bikeMi_Milan_Italy_20101230.JPG """


def call(N):
    for i in range(N):
        """ 
        location 
        img = mod
         """
        fake_title = fake.name()
        fake_slug = fake.slug()
        fake_direction = fake.address()
        Station.objects.get_or_create(slug=fake_slug, name=fake_title, direction=fake_direction, location="Ontinyent",
                                      img="https://upload.wikimedia.org/wikipedia/commons/f/fb/Citybike_station_bikeMi_Milan_Italy_20101230.JPG")[0]


if __name__ == '__main__':
    print("Filling random data")
    call(10)
    print("Filling done ")
