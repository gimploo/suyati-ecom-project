from django.db import models
# Create your models here.

class Book(models.Model):

    isbn                = models.CharField(max_length=150, unique=True, editable=True)
    title               = models.CharField(max_length=100)
    author              = models.CharField(max_length=255)
    year_of_publication = models.CharField(max_length=5)
    publisher           = models.CharField(max_length=255)
    img_url_s           = models.URLField(max_length=100)
    img_url_m           = models.URLField(max_length=100)
    img_url_l           = models.URLField(max_length=100)


    def __str__(self) -> str:
        return self.title