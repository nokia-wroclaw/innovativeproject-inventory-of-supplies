# Generated by Django 2.1.7 on 2019-04-08 14:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('printing', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='printqueue',
            old_name='product',
            new_name='supplyId',
        ),
        migrations.RenameField(
            model_name='printqueue',
            old_name='user',
            new_name='userId',
        ),
    ]
