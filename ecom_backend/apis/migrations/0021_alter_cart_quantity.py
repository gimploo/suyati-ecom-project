# Generated by Django 3.2.9 on 2022-01-16 14:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apis', '0020_alter_cart_quantity'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cart',
            name='quantity',
            field=models.PositiveSmallIntegerField(blank=True, default=1, null=True),
        ),
    ]
