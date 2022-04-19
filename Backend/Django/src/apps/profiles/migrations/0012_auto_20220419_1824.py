# Generated by Django 3.1.14 on 2022-04-19 16:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0011_auto_20220217_0220'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='credit',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=6),
        ),
        migrations.AlterField(
            model_name='profile',
            name='image',
            field=models.URLField(blank=True, default='https://avatars.dicebear.com/api/avataaars/MZQE7054A.svg'),
        ),
    ]