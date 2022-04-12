# Generated by Django 3.1.14 on 2022-02-04 15:31

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('stations', '0015_auto_20220126_1514'),
        ('bikes', '0012_auto_20220130_1838'),
    ]

    operations = [
        migrations.AlterField(
            model_name='register_bike',
            name='data_get',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='register_bike',
            name='data_return',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='register_bike',
            name='point_get',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='point_get', to='stations.point'),
        ),
        migrations.AlterField(
            model_name='register_bike',
            name='point_return',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='point_return', to='stations.point'),
        ),
    ]