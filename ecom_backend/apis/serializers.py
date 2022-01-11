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
        fields='__all__'

class BookSerializer(serializers.ModelSerializer):
    
    class Meta:
        model=Books
        fields='__all__'
 

class StoreSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField('get_image_url')
    class Meta:
        model=Books
        fields=('Book_title','Book_Author','img_url_L','image_url','ISBN')
    def get_image_url(self, obj):
        return obj.img_url_L.url


