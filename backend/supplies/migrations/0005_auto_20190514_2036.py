# Generated by Django 2.1.7 on 2019-05-14 20:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('supplies', '0004_auto_20190514_2027'),
    ]

    operations = [
        migrations.AlterField(
            model_name='supply',
            name='last_time_scanned',
            field=models.DateField(blank=True, null=True),
        ),
    ]