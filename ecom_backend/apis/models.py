from django.db import models

# Create your models here.


class userdata(models.Model):
    id = models.PositiveIntegerField(primary_key=True)
    Location=models.CharField(max_length=200)
    Age=models.IntegerField(null=True)

def upload_path(instance,filename):
    return '/'.join(['files',str(instance.discription),filename])
class Books(models.Model):
    id=models.PositiveIntegerField(primary_key=True)
    ISBN=models.CharField(max_length=200,unique=True, editable=True)
    Book_title= models.CharField(max_length=200)
    Book_Author=models.CharField(max_length=200)
    Year_of_Publication=models.IntegerField(null=True)
    Publisher=models.CharField(max_length=200)
    img_url_S=models.FileField(upload_to=upload_path, null=True, blank=True)
    img_url_M=models.FileField(upload_to=upload_path, null=True, blank=True)
    img_url_L=models.FileField(upload_to=upload_path, null=True, blank=True)

    def __str__(self):
        return self.Book_title 

class Rating(models.Model):
    id=models.PositiveIntegerField(primary_key=True)
    user_id=models.IntegerField()
    isbn=models.CharField(max_length=200)
    rating=models.IntegerField()

    def __int__(self):
        return self.user_id
