from django.db import models

# Create your models here.


class userdata(models.Model):
    id = models.PositiveIntegerField(primary_key=True)
    Location=models.CharField(max_length=200)
    Age=models.IntegerField(null=True,blank=True)

def upload_path(instance,filename):
    return ''
class Books(models.Model):
    ISBN=models.CharField(max_length=200,unique=True, editable=True)
    Book_title= models.CharField(max_length=200)
    Book_Author =models.CharField(max_length=200)
    Year_of_Publication=models.IntegerField(null=True)
    Publisher=models.CharField(max_length=200)
    img_url_S=models.ImageField(upload_to=upload_path, null=True, blank=True)
    img_url_M=models.ImageField(upload_to=upload_path, null=True, blank=True)
    img_url_L=models.ImageField(upload_to=upload_path, null=True, blank=True)

    def __str__(self):
        return self.Book_title 

class Rating(models.Model):
    user_id=models.IntegerField()
    isbn=models.CharField(max_length=200)
    rating=models.IntegerField(null=True,blank=True) 

    def __int__(self):
        return self.user_id

class savesearch(models.Model):
    userid=models.IntegerField()
    booktitle=models.CharField(max_length=200)
    def __str__(self):
        return self.booktitle

class Cart(models.Model):
    book=models.ForeignKey(Books,on_delete=models.CASCADE,related_name='book')
    user_id=models.IntegerField()
    quantity=models.PositiveSmallIntegerField(null=True,blank=True,default=1)
  
class Orders(models.Model):
    orders=models.ManyToManyField(Cart,related_name='orders')
    created=models.DateField(auto_now_add=True)
    user_id=models.IntegerField()