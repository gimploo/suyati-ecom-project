# Generated by Django 3.2.9 on 2021-12-17 08:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apis', '0003_auto_20211213_2258'),
    ]

    operations = [
        migrations.AlterField(
            model_name='books',
            name='id',
            field=models.PositiveIntegerField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='rating',
            name='id',
            field=models.PositiveIntegerField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='userdata',
            name='id',
            field=models.PositiveIntegerField(primary_key=True, serialize=False),
        ),
    ]