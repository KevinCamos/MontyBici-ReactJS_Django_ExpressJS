# Generated by Django 3.1.14 on 2022-01-30 18:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bikes', '0011_remove_bike_station'),
    ]

    operations = [
        migrations.RenameField(
            model_name='register_bike',
            old_name='id_bike',
            new_name='bike',
        ),
        migrations.RenameField(
            model_name='register_bike',
            old_name='id_point_get',
            new_name='point_get',
        ),
        migrations.RenameField(
            model_name='register_bike',
            old_name='id_point_return',
            new_name='point_return',
        ),
        migrations.RenameField(
            model_name='register_bike',
            old_name='id_user',
            new_name='user',
        ),
    ]