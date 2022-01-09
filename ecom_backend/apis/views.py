from . models import *
from .serializers import *
from django.http import HttpResponseRedirect,HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .filters import  BookFilter
import pandas as pd
import numpy as np
import csv
from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination
from sklearn.metrics.pairwise import cosine_similarity





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
            return Response(temp)
 

    return Response(temp)

@api_view(['GET'])
def book(request,pk):

    res={}
    try:
        books=Books.objects.get(ISBN=pk)
        res["title"]=books.Book_title
        res["author"]=books.Book_Author
        res["publisher"]=books.Publisher
        res["year_publisher"]=books.Year_of_Publication
        res["img"]=str(books.img_url_L)
        
    except:
        return Response(res)
    return Response(res)
   

@api_view(['GET'])
def search(request):
    res={}
    temp=[]
    queryset = Books.objects.all()
    filterset = BookFilter(request.GET, queryset=queryset)
    if filterset.is_valid():
        queryset = filterset.qs 
    for x in queryset:    
        res["Book_title"]=x.Book_title
        res["Book_Author"]=x.Book_Author
        res["ISBN"]=x.ISBN
        res["img"]=str(x.img_url_L)
        res_copy=res.copy()
        temp.append(res_copy)
    return Response(temp)


@api_view(['GET'])
def trending_books(request):
    ratings=Rating.objects.all()
    a=[]
    b=[]
    for item in ratings:
        a=[item.user_id,item.isbn,item.rating]
        b+=[a]
    ratings_df=pd.DataFrame(b,columns=['user_id','ISBN','rating'])
    rating_count=pd.DataFrame(ratings_df.groupby('ISBN')['rating'].count())
    temp=rating_count.sort_values('rating',ascending=False).head()
    li=[]
    i=0
    itr=len(temp.index)
    while i<itr:
        li.append(temp.index[i])
        i+=1
    temp=[]
    res={}
    for val in li:
        try:
            isbn=val
            books=Books.objects.get(ISBN=isbn)
            book_title=books.Book_title
            book_auth=books.Book_Author
            ISBN=books.ISBN
            img_S=books.img_url_S
            img_M=books.img_url_M
            img_L=books.img_url_L
            res["book_title"]=book_title
            res["book_auth"]=book_auth
            res["isbn"]=ISBN
            res["img_small"]=str(img_S)
            res["img_med"]=str(img_M)
            res["img_Lar"]=str(img_L)
            res_copy=res.copy()
            temp.append(res_copy)
            
        except:
            return Response([])
            
    return Response(temp)
    
    

#pagination for the whole books in our store 
class ApiView(ListAPIView):
    queryset=Books.objects.all()
    serializer_class=BookSerializer
    pagination_class=PageNumberPagination

@api_view(['GET'])
def user_search_recom(request,pk):
    pass
    
    # books=Books.objects.all()
    # ratings=Rating.objects.all()
    # title=[]
    # x=[]
    # y=[]
    # a=[]
    # b=[]
    # latestsearch=savesearch.objects.filter(userid=pk).order_by('-id')[0]
    # title.append(latestsearch.booktitle)
    # booktitle=title[0]
    
    # for item in books:
    #     x=[item.id,item.ISBN,item.Book_title]
    #     y+=[x]
    # # temp_1 = pd.DataFrame(y,columns=['book_id','ISBN','book_title'])
    # # books_df=temp_1.iloc[0:10000][:10000]
    # books_df = pd.DataFrame(y,columns=['book_id','ISBN','book_title'])
    # for item in ratings:
    #     a=[item.user_id,item.isbn,item.rating]
    #     b+=[a]
    # ratings_df=pd.DataFrame(b,columns=['user_id','ISBN','rating'])
    # temp=pd.merge(ratings_df,books_df,on='ISBN')
    # ratings=pd.DataFrame(temp.groupby('book_title')['rating'].mean())
    # ratings['number_of_ratings']=temp.groupby('book_title')['rating'].count()
    # book_matrix_UII=temp.pivot_table(index='user_id',columns='book_title',values='rating')
    # ratings.sort_values('number_of_ratings',ascending=False).head()
    # try:
    #     user_searched_book=book_matrix_UII[booktitle]
    #     similar_to_search_book=book_matrix_UII.corrwith(user_searched_book)
    #     corr_searched_book=pd.DataFrame(similar_to_search_book,columns=['correlation'])
    #     corr_searched_book.dropna(inplace=True)
    #     df=pd.DataFrame(corr_searched_book)
    #     itr=len(df.index)
    #     res=[]
    #     i=0
    #     while i<itr:
    #         val=df.index[i]
    #         res.append(val)
    #         i+=1
    #     final_result={}
    #     temp=[]
    #     for x in res:
    #         pk=str(x)
    #         search_recom=Books.objects.get(Book_title=pk)
    #         book_title=search_recom.Book_title
    #         book_auth=search_recom.Book_Author
    #         img_M=search_recom.img_url_M
    #         img_L=search_recom.img_url_L
    #         final_result["book_title"]=book_title
    #         final_result["book_auth"]=book_auth
    #         final_result["img_med"]=str(img_M)
    #         final_result["img_Lar"]=str(img_L)
    #         final_result_copy=final_result.copy()
    #         temp.append(final_result_copy)
    #     return Response(temp)

    # except:
    #     return Response('No Books for Current Search')

@api_view(['GET'])
def book_recom(request,pk):
    loginuser=pk
    ratings=Rating.objects.all()
    books=Books.objects.all()
    x=[]
    y=[]
    a=[]
    b=[]
    for item in books:
        x=[item.id,item.ISBN,item.Book_title]
        y+=[x]
    # temp_1 = pd.DataFrame(y,columns=['book_id','ISBN','book_title'])
    # books_df=temp_1.iloc[0:10000][:10000]
    books_df = pd.DataFrame(y,columns=['book_id','ISBN','book_title'])
    for item in ratings:
        a=[item.user_id,item.isbn,item.rating]
        b+=[a]
    ratings_df=pd.DataFrame(b,columns=['user_id','ISBN','rating'])
    Mean = ratings_df.groupby(by="user_id",as_index=False)['rating'].mean()
    Rating_avg = pd.merge(ratings_df,Mean,on='user_id')
    Rating_avg['avg_rating']=Rating_avg['rating_x']-Rating_avg['rating_y']
    final=pd.pivot_table(Rating_avg,values='avg_rating',index='user_id',columns='ISBN')
    final_books = final.fillna(final.mean(axis=0))
    cosine = cosine_similarity(final_books)
    np.fill_diagonal(cosine, 0 )
    similarity_with_book =pd.DataFrame(cosine,index=final_books.index)
    similarity_with_book.columns=final_books.index
    def get_user_similar_books( user1, user2 ):
        common_books = Rating_avg[Rating_avg.user_id==user1].merge(Rating_avg[Rating_avg.user_id==user2],on="ISBN",how="inner")
        return common_books.merge( books_df, on = 'ISBN' )
    res=[]
    try:
        for x in ratings:
            if(loginuser!=x.user_id):### or switch to datframe and limit the iteration to top 30, k-neabour
                a=get_user_similar_books(loginuser,x.user_id)
                a = a.loc[:,['rating_x_x','rating_x_y','ISBN']]
                length=len(a.head())
                itr=len(a)
                i=0
                if length>=2:
                    while i<itr:
                       val=x.user_id
                       if val not in res:
                           res.append(val)
                       i+=1
                    break
        
    except:
        return Response([])
    isbns=[]
    book_obj={}
    final_book_obj=[]
    try:
        if(len(res)!=0):
            for x in res:
                obj=Rating.objects.all()
                for i in obj:
                    if i.user_id==x:
                        val=i.isbn
                        isbns.append(val)
    
        for x in isbns:
            book=Books.objects.get(ISBN=x)
            book_title=book.Book_title
            book_auth=book.Book_Author
            book_isbn=book.ISBN
            book_img=book.img_url_L
            book_obj['title']=book_title
            book_obj['author']=book_auth
            book_obj['isbn']=book_isbn
            book_obj['img']=str(book_img)
            final_obj=book_obj.copy()
            final_book_obj.append(final_obj)
            
    except:
        return Response(final_book_obj)

    ####  SEARCH BASED FILTERING  ########    

    books=Books.objects.all()
    ratings=Rating.objects.all()
    title=[]
    x=[]
    y=[]
    a=[]
    b=[]
    try:
        latestsearch=savesearch.objects.filter(userid=pk).order_by('-id')[0]
        title.append(latestsearch.booktitle)
        booktitle=title[0]
    except:
        return Response(final_book_obj)
    
    for item in books:
        x=[item.id,item.ISBN,item.Book_title]
        y+=[x]
    # temp_1 = pd.DataFrame(y,columns=['book_id','ISBN','book_title'])
    # books_df=temp_1.iloc[0:10000][:10000]
    books_df = pd.DataFrame(y,columns=['book_id','ISBN','book_title'])
    for item in ratings:
        a=[item.user_id,item.isbn,item.rating]
        b+=[a]
    ratings_df=pd.DataFrame(b,columns=['user_id','ISBN','rating'])
    temp=pd.merge(ratings_df,books_df,on='ISBN')
    ratings=pd.DataFrame(temp.groupby('book_title')['rating'].mean())
    ratings['number_of_ratings']=temp.groupby('book_title')['rating'].count()
    book_matrix_UII=temp.pivot_table(index='user_id',columns='book_title',values='rating')
    ratings.sort_values('number_of_ratings',ascending=False).head()
    try:
        user_searched_book=book_matrix_UII[booktitle]
        similar_to_search_book=book_matrix_UII.corrwith(user_searched_book)
        corr_searched_book=pd.DataFrame(similar_to_search_book,columns=['correlation'])
        corr_searched_book.dropna(inplace=True)
        df=pd.DataFrame(corr_searched_book)
        itr=len(df.index)
        res=[]
        i=0
        while i<itr:
            val=df.index[i]
            res.append(val)
            i+=1
        final_result={}
        temp=[]
        for x in res:
            pk=str(x)
            search_recom=Books.objects.get(Book_title=pk)
            book_title=search_recom.Book_title
            book_auth=search_recom.Book_Author
            isbn=search_recom.ISBN
            img_L=search_recom.img_url_L
            final_result["title"]=book_title
            final_result["author"]=book_auth
            final_result["isbn"]=isbn
            final_result["img"]=str(img_L)
            final_result_copy=final_result.copy()
            final_book_obj.append(final_result_copy)
        

    except:
        return Response(final_book_obj)

    return Response(final_book_obj)


@api_view(['POST'])
def submitrating(request):
    data=request.data
    print(data)
    datas=Rating.objects.create(
        user_id=data['userid'],
        isbn=data['isbn'],
        rating=data['rating'] 
    )
    return Response('Rating added sucessfully')


@api_view(['POST'])
def savedata(request):
    data=request.data
    datas=savesearch.objects.create(
       userid=data['userid'],
       booktitle=data['Book_title']
    )

    return Response('search saved')



     
  








 

