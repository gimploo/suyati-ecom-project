from . models import *
from .serializers import *
from django.http import HttpResponseRedirect,HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .filters import  BookFilter
import pandas as pd
import csv
from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination





@api_view(['GET'])
def login(request,pk):
    user_data=userdata.objects.get(id=pk)
    serializer=UserSerializer(user_data)
    return Response(serializer.data)



@api_view(['GET'])
def User_Rating(request,pk):
    data=[]
    res={}
    temp=[]
    user_rating=Rating.objects.all()
    for x in user_rating:
        if x.user_id==pk:
            serializer=RatingSerializer(x)
            data.append(serializer.data)

   
    for val in data:
        try:
            isbn=val["isbn"]
            books=Books.objects.get(ISBN=isbn)
            book_title=books.Book_title
            book_auth=books.Book_Author
            isbn=books.ISBN
            img_S=books.img_url_S
            img_M=books.img_url_M
            img_L=books.img_url_L
            res["book_title"]=book_title
            res["book_auth"]=book_auth
            res["book_isbn"]=isbn
            res["img_small"]=str(img_S)
            res["img_med"]=str(img_M)
            res["img_Lar"]=str(img_L)
            res["rating"]=val["rating"]
            res["User_id"]=val["user_id"]
            res_copy=res.copy()
            temp.append(res_copy)
        except:
            return Response('The User is not Rated!')
 

    return Response(temp)

@api_view(['GET'])
def book(request,pk):
    try:
        books=Books.objects.get(id=pk)
        ser=BookSerializer(books)
        return Response(ser.data)
    except:
        return Response('Book Not Avilable in database') 



@api_view(['GET'])
def search(request):
    try:
        queryset = Books.objects.all()
        filterset = BookFilter(request.GET, queryset=queryset)
        if filterset.is_valid():
            queryset = filterset.qs
        serializer = BookSerializer(queryset, many=True)
        return Response(serializer.data)
    except:
        return Response('Oops Something Went Wrong!')

# @api_view(['GET'])
# def trending_books(request):
#     bookrating=pd.read_csv('data\Ratings.csv')
#     rating_count=pd.DataFrame(bookrating.groupby('ISBN')['Book-Rating'].count())
#     rating_count.sort_values('Book-Rating',ascending=False).head()

#pagination for the whole books in our store 
class ApiView(ListAPIView):
    queryset=Books.objects.all()
    serializer_class=BookSerializer
    pagination_class=PageNumberPagination



 

