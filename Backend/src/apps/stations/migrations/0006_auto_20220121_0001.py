# Generated by Django 3.1.14 on 2022-01-21 00:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stations', '0005_auto_20220120_1518'),
    ]

    operations = [
        migrations.AlterField(
            model_name='point',
            name='status',
            field=models.BooleanField(),
        ),
        migrations.AlterField(
            model_name='station',
            name='img',
            field=models.CharField(blank=True, max_length=200),
        ),
        migrations.AlterField(
            model_name='station',
            name='slug',
            field=models.SlugField(blank=True, max_length=255, unique=True),
        ),
    ]