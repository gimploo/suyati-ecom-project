from . models import *
from .serializers import *
from django.http import HttpResponseRedirect,HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
import csv
import pandas as pd



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
            res["book_title"]=book_title
            res["book_auth"]=book_auth
            res["book_isbn"]=isbn
            res["rating"]=val["rating"]
            res["User_id"]=val["user_id"]
            res_copy=res.copy()
            temp.append(res_copy)
        except:
            return Response('The User is not Rated')
    frame=pd.DataFrame(data)
    print(frame)

    return Response(frame)

@api_view(['GET'])
def book(request,pk):
    try:
        books=Books.objects.get(ISBN=pk)
        ser=BookSerializer(books)
        return Response(ser.data)
    except:
        return Response('Book Not Avilable in database') 

#final datas at deployment
# CSV_USERS_PATH='../data/Users.csv'
# def upload_all_records_to_Customuser(request):
#     with open(CSV_USERS_PATH) as f:
#         reader = csv.reader(f)
#         next(reader)

#         print("[!] Deleting all records in Users")
#         userdata.objects.all().delete()

#         print("[*] Inserting new records into Users ....")
#         for row in reader:
#             print("[!] New record:", row)

#             user_id = int(row[0])

#             if row[1] == '':
#                 location = 'UNKNOWN'
#             else:
#                 location = row[1]

#             if row[2] == '':
#                 age = 0
#             else:
#                 age = float(row[2])

#             try:
#                 userdata(
#                     user_id,
#                     location,
#                     age
#                 ).save()
#             except Exception as e:
#                 print(e)
#                 exit(1)

#             print("[!] Record successfully added!")
#     return HttpResponse("[!] All records added!")
