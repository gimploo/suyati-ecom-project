# Generated by Django 3.2.9 on 2021-12-10 06:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('book', '0003_alter_book_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='book',
            name='id',
        ),
        migrations.AlterField(
            model_name='book',
            name='isbn',
            field=models.CharField(editable=False, max_length=150, primary_key=True, serialize=False, unique=True),
        ),
    ]