from django.db import models

# Create your models here.

class CustomUser(models.Model):

    id          = models.PositiveBigIntegerField(unique=True, primary_key=True, editable=False)
    location    = models.CharField(max_length=255, null=True)
    age         = models.DecimalField(null=True, decimal_places=2, max_digits=5)

    def __str__(self) -> str:
        return self.id