from django.urls import path
from . import views

urlpatterns = [
     path('api/login/<int:pk>/',views.login, name='login'), 
    path('api/user_rating/<int:pk>/',views.User_Rating, name='Rating'), 
    path('api/book/<int:pk>/',views.book,name='books'),
  
 
]
