from knox import views as knox_views
from .views import RegisterAPI,LoginAPI
from django.urls import path
from . import views

urlpatterns = [
    path('api/register/', RegisterAPI.as_view(), name='register'),
    path('api/login/', LoginAPI.as_view(), name='login'),
]
