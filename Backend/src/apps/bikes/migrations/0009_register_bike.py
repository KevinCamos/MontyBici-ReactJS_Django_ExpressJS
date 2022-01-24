# Generated by Django 3.1.14 on 2022-01-23 19:07

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('stations', '0009_auto_20220123_1901'),
        ('profiles', '0001_initial'),
        ('bikes', '0008_auto_20220122_0424'),
    ]

    operations = [
        migrations.CreateModel(
            name='Register_Bike',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('data_get', models.DateField(auto_now_add=True)),
                ('data_return', models.DateField(auto_now=True)),
                ('id_bike', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='bikes.bike')),
                ('id_point_get', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='id_point_get', to='stations.point')),
                ('id_point_return', models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='id_point_return', to='stations.point')),
                ('id_user', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='profiles.profile')),
            ],
        ),
    ]
