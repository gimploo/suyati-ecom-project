from . models import *
from .serializers import *
from django.http import HttpResponseRedirect,HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view




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
        books=Books.objects.get(ISBN=pk)
        ser=BookSerializer(books)
        return Response(ser.data)
    except:
        return Response('Book Not Avilable in database') 


