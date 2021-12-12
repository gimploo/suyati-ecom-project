from rest_framework import serializers
from .models import *
from rest_framework.settings import api_settings

# User Serializer
class UserSerializer(serializers.ModelSerializer):
  
    class Meta:
        model = userdata
        optional_fields = ['Age']
        fields = ('Location','id')

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model=Rating
        fields=('isbn','rating')

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model=Books
        fields='__all__'