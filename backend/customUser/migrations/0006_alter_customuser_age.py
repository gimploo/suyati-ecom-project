# Generated by Django 3.2.9 on 2021-12-10 08:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('customUser', '0005_alter_customuser_age'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='age',
            field=models.DecimalField(decimal_places=2, max_digits=5, null=True),
        ),
    ]
