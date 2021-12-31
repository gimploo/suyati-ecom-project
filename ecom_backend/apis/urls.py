from django.urls import path
from . import views
from .views import(
    ApiView
)

urlpatterns = [
    path('api/login/<int:pk>/',views.login, name='login'), 
    path('api/user_rating/<int:pk>/',views.User_Rating, name='Rating'), 
    path('api/book/<int:pk>/',views.book,name='books'),
    path('api/search/',views.search,name='search'),
    path('list',ApiView.as_view(),name='list'),
    path('api/search_recom/',views.user_search_recom,name='recom'), 
    path('api/trending/',views.trending_books,name='trending'),
    path('api/user_based_recom/',views.book_recom,name='books_recom')
]  
