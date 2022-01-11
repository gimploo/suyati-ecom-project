from django.urls import path
from . import views
from .views import(
    ApiView
)

urlpatterns = [
    path('api/login/<int:pk>/',views.login, name='login'), 
    path('api/user_rating/<int:pk>/',views.User_Rating, name='Rating'), 
    path('api/book/<str:pk>/',views.book,name='books'),
    path('api/search/',views.search,name='search'),
    path('api/list',ApiView.as_view(),name='list'),
    path('api/search_recom/<int:pk>/',views.user_search_recom,name='recom'), 
    path('api/trending/',views.trending_books,name='trending'),
    path('api/user_based_recom/<int:pk>/',views.book_recom,name='books_recom'),
    path('api/submitrating/',views.submitrating,name='submitrating'),
    path('api/savesearch/',views.savedata,name='savesearch'),
    path('api/signup/',views.signup,name="signup")
    # path('api/test/',views.upload_all_records_to_Book,name='upload')

]   
