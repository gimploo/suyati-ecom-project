# Generated by Django 3.2.9 on 2022-01-09 14:39

import apis.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apis', '0008_auto_20220109_0013'),
    ]

    operations = [
        migrations.AlterField(
            model_name='books',
            name='img_url_L',
            field=models.ImageField(blank=True, null=True, upload_to=apis.models.upload_path),
        ),
        migrations.AlterField(
            model_name='books',
            name='img_url_M',
            field=models.ImageField(blank=True, null=True, upload_to=apis.models.upload_path),
        ),
        migrations.AlterField(
            model_name='books',
            name='img_url_S',
            field=models.ImageField(blank=True, null=True, upload_to=apis.models.upload_path),
        ),
    ]