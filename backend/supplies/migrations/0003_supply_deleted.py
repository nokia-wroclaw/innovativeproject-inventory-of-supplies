# Generated by Django 2.1.7 on 2019-06-08 11:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('supplies', '0002_auto_20190323_1401'),
    ]

    operations = [
        migrations.AddField(
            model_name='supply',
            name='deleted',
            field=models.BooleanField(default=False),
        ),
    ]