# Generated by Django 3.2.9 on 2021-12-09 09:54

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Book',
            fields=[
                ('isbn', models.CharField(max_length=150, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=100)),
                ('author', models.CharField(max_length=255)),
                ('year_of_publication', models.CharField(max_length=5)),
                ('publisher', models.CharField(max_length=255)),
                ('img_url_s', models.URLField(max_length=100)),
                ('img_url_m', models.URLField(max_length=100)),
                ('img_url_l', models.URLField(max_length=100)),
            ],
        ),
    ]