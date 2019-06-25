# Generated by Django 2.1.7 on 2019-06-08 12:12

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('inventories', '0003_inventoryreport_last_update'),
    ]

    operations = [
        migrations.AddField(
            model_name='inventorysupply',
            name='checked_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
    ]