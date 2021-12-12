from . models import *
from .serializers import *
from django.http import HttpResponseRedirect,HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
import csv



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
            res["book_title"]=book_title
            res["book_auth"]=book_auth
            res["rating"]=val["rating"]
            res_copy=res.copy()
            temp.append(res_copy)
        except:
            return Response('The User is not Rated')

    return Response(temp)

@api_view(['GET'])
def book(request,pk):
    try:
        books=Books.objects.get(id=pk)
        ser=BookSerializer(books)
        return Response(ser.data)
    except:
        return Response('Book Not Avilable in database') 


# CSV_BOOKS_PATH='../data/Books.csv'
# def upload_all_records_to_Book(request):
#     with open(CSV_BOOKS_PATH) as f:
#         reader = csv.reader(f)
#         next(reader)

#         print("[!] Deleting all records in Books")
#         Books.objects.all().delete()

#         print("[*] Inserting new records into Books ....")
#         for row in reader:
#             print("[!] New record:", row)

#             isbn                = row[0]
#             title               = row[1]
#             author              = row[2]
#             year_of_publication = row[3]
#             publisher           = row[4]
#             img_url_s           = row[5]
#             img_url_m           = row[6]
#             img_url_l           = row[7]

#             Books(
#                 ISBN = isbn, 
#                 Book_title = title, 
#                 Book_Author = author, 
#                 Year_of_Publication = year_of_publication, 
#                 Publisher = publisher, 
#                 img_url_S = img_url_s, 
#                 img_url_M = img_url_m, 
#                 img_url_L = img_url_l
#             ).save()
#             print("[!] Record successfully added!")

#     return HttpResponse("[!] All records added!")