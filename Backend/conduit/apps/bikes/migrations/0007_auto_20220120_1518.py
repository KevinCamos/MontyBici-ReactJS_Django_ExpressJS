# Generated by Django 3.1.14 on 2022-01-20 15:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bikes', '0006_auto_20220120_1503'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bike',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]
