# Generated by Django 3.1.14 on 2022-02-08 22:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0003_auto_20220204_1531'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='image',
            field=models.URLField(blank=True, default='https://avatars.dicebear.com/api/avataaars/TZCN0417J.svg'),
        ),
    ]
