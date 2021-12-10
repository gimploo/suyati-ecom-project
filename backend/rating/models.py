from django.db import models

from customUser.models import CustomUser
from book.models import Book

# Create your models here.

class Rating(models.Model):
    id          = models.AutoField
    user_id     = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=False) 
    isbn        = models.ForeignKey(Book, on_delete=models.CASCADE, null=False)
    book_rating = models.PositiveSmallIntegerField()

    def __str__(self) -> str:
        return self.book_rating
    
    class Meta:
        ordering = ['book_rating', 'isbn']