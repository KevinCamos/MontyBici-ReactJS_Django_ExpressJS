# Generated by Django 3.1.14 on 2022-01-22 04:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bikes', '0007_auto_20220120_1518'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='bike',
            name='state',
        ),
        migrations.AddField(
            model_name='bike',
            name='active',
            field=models.BooleanField(default=True),
        ),
    ]
