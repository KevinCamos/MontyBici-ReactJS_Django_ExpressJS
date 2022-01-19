# Generated by Django 3.1.14 on 2022-01-19 15:51

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Station',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('slug', models.SlugField(max_length=255, unique=True)),
                ('name', models.CharField(db_index=True, max_length=30, unique=True)),
                ('direction', models.CharField(max_length=100)),
                ('location', models.CharField(max_length=30)),
                ('img', models.CharField(max_length=200)),
            ],
        ),
    ]
