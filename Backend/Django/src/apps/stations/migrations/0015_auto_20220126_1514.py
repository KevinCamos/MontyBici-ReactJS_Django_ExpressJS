# Generated by Django 3.1.14 on 2022-01-26 15:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('bikes', '0011_remove_bike_station'),
        ('stations', '0014_auto_20220126_1509'),
    ]

    operations = [
        migrations.AlterField(
            model_name='point',
            name='bike',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='bikes.bike'),
        ),
    ]
