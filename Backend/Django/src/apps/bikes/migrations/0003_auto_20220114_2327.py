# Generated by Django 3.1.14 on 2022-01-14 23:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bikes', '0002_auto_20220114_2325'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Bikes',
            new_name='Bike',
        ),
    ]
