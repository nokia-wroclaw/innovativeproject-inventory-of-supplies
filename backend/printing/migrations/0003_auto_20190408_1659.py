# Generated by Django 2.1.7 on 2019-04-08 16:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('printing', '0002_auto_20190408_1438'),
    ]

    operations = [
        migrations.RenameField(
            model_name='printqueue',
            old_name='userId',
            new_name='user',
        ),
    ]
