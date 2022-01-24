from . models import *
from .serializers import *
from django.http import HttpResponseRedirect,HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view,action
from .filters import  BookFilter
import pandas as pd
import numpy as np
from rest_framework import serializers,viewsets
import csv
from django.core.files.base import ContentFile
from django.core.files.storage import FileSystemStorage
from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination
from sklearn.metrics.pairwise import cosine_similarity
from scipy.sparse import csr_matrix
from sklearn.neighbors import NearestNeighbors

fs=FileSystemStorage(location='tmp/')

@api_view(['GET'])
def login(request,pk):
    res={}
    user_data=userdata.objects.get(id=pk)
    userid=user_data.id
    location=user_data.Location
    age=user_data.Age
    res["id"]=userid
    res["Location"]=location
    res["Age"]=age
    # serializer=UserSerializer(user_data)
    return Response(res)




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
        res["id"]=x.id   
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

        isbn=val
        books=Books.objects.get(ISBN=isbn)
        book_title=books.Book_title
        book_auth=books.Book_Author
        ISBN=books.ISBN
        ID=books.id
        img_L=books.img_url_L
        res['id']=ID
        res["book_title"]=book_title
        res["book_auth"]=book_auth
        res["isbn"]=ISBN
        res["img_Lar"]=str(img_L)
        res_copy=res.copy()
        temp.append(res_copy)
            
            
    return Response(temp)
    
    

#pagination for the whole books in our store 
class ApiView(ListAPIView):
    queryset=Books.objects.all()
    serializer_class=StoreSerializer
    pagination_class=PageNumberPagination



# @api_view(['GET'])
# def book_recom(request,pk):
#     loginuser=pk
#     ratings=Rating.objects.all()
#     books=Books.objects.all()
#     x=[]
#     y=[]
#     a=[]
#     b=[]
#     for item in books:
#         x=[item.id,item.ISBN,item.Book_title]
#         y+=[x]
#     books_df = pd.DataFrame(y,columns=['book_id','ISBN','book_title'])
#     # books_df=temp_1.iloc[0:10000][:10000]
#     # temp_1 = pd.DataFrame(y,columns=['book_id','ISBN','book_title'])
#     # books_df=temp_1.iloc[0:1000][:1000]
    
#     for item in ratings:
#         a=[item.user_id,item.isbn,item.rating]
#         b+=[a]
#     # temp_1=pd.DataFrame(b,columns=['user_id','ISBN','rating'])
#     ratings_df=pd.DataFrame(b,columns=['user_id','ISBN','rating']).iloc[0:10000][:10000]
#     Mean = ratings_df.groupby(by="user_id",as_index=False)['rating'].mean()
#     Rating_avg = pd.merge(ratings_df,Mean,on='user_id')
#     Rating_avg['avg_rating']=Rating_avg['rating_x']-Rating_avg['rating_y']
#     final=pd.pivot_table(Rating_avg,values='avg_rating',index='user_id',columns='ISBN')
#     final_books = final.fillna(final.mean(axis=0))
#     cosine = cosine_similarity(final_books)
#     np.fill_diagonal(cosine, 0 )
#     similarity_with_book =pd.DataFrame(cosine,index=final_books.index)
#     similarity_with_book.columns=final_books.index
#     def get_user_similar_books( user1, user2 ):
#         common_books = Rating_avg[Rating_avg.user_id==user1].merge(Rating_avg[Rating_avg.user_id==user2],on="ISBN",how="inner")
#         return common_books.merge( books_df, on = 'ISBN' )
#     res=[]
#     try:
#         N=5
#         for x in ratings[:N]:
#             if(loginuser!=x.user_id):### or switch to datframe and limit the iteration to top 30, k-neabour
#                 a=get_user_similar_books(loginuser,x.user_id)
#                 a = a.loc[:,['rating_x_x','rating_x_y','ISBN']]
#                 length=len(a.head())
#                 itr=len(a)
#                 i=0
#                 if length>=2:
#                     while i<itr:
#                        val=x.user_id
#                        if val not in res:
#                            res.append(val)
#                        i+=1
#                     break
        
#     except:
#         return Response([])
#     isbns=[]
#     book_obj={}
#     final_book_obj=[]
#     final_book_obj_unique=[]
#     try:
#         if(len(res)!=0):
#             for x in res:
#                 obj=Rating.objects.all()
#                 for i in obj:
#                     if i.user_id==x:
#                         val=i.isbn
#                         isbns.append(val)
    
#         for x in isbns:
#             book=Books.objects.get(ISBN=x)
#             book_title=book.Book_title
#             book_auth=book.Book_Author
#             book_isbn=book.ISBN
#             ID=book.id
#             book_img=book.img_url_L
#             book_obj['id']=ID
#             book_obj['title']=book_title
#             book_obj['author']=book_auth
#             book_obj['isbn']=book_isbn
#             book_obj['img']=str(book_img)
#             final_obj=book_obj.copy()
#             final_book_obj.append(final_obj)
            
#     except:
#         return Response(final_book_obj)

    ####  SEARCH BASED FILTERING  ########    

    # books=Books.objects.all()
    # ratings=Rating.objects.all()
    # title=[]
    # x=[]
    # y=[]
    # a=[]
    # b=[]
    # try:
    #     latestsearch=savesearch.objects.filter(userid=pk).order_by('-id')[0]
    #     title.append(latestsearch.booktitle)
    #     booktitle=title[0]
    # except:
    #     return Response(final_book_obj)
    
    # for item in books:
    #     x=[item.id,item.ISBN,item.Book_title]
    #     y+=[x]
    # # temp_1 = pd.DataFrame(y,columns=['book_id','ISBN','book_title'])
    # # books_df=temp_1.iloc[0:10000][:10000]
    # # books_df = pd.DataFrame(y,columns=['book_id','ISBN','book_title'])-------
    # temp_1=pd.DataFrame(y,columns=['book_id','ISBN','book_title'])
    # books_df=temp_1.iloc[0:1000][:1000]

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
    #         pk1=str(x)
    #         search_recom=Books.objects.get(Book_title=pk1)
    #         book_title=search_recom.Book_title
    #         book_auth=search_recom.Book_Author
    #         isbn=search_recom.ISBN
    #         ID=search_recom.id
    #         img_L=search_recom.img_url_L
    #         final_result["id"]=ID
    #         final_result["title"]=book_title
    #         final_result["author"]=book_auth
    #         final_result["isbn"]=isbn
    #         final_result["img"]=str(img_L)
    #         final_result_copy=final_result.copy()
    #         final_book_obj.append(final_result_copy)
    # except:
    #     return Response(final_book_obj)
    # ####  Purchased BASED FILTERING  ########
    # cart_title=[]
    # books=Books.objects.all()
    # ratings=Rating.objects.all()
    # c=[]
    # d=[]
    # e=[]
    # f=[]
    # try:
   
    #     latestpurchase=Orders.objects.filter(user_id=pk).order_by('-id')[0]
    #     cart_title.append(latestpurchase.orders.Book_title)
    #     cart_item_booktitle=cart_title[0]
    # except Exception as e:
    #     print(e)
    #     return Response(final_book_obj) 
    
    # for item in books:
    #     c=[item.id,item.ISBN,item.Book_title]
    #     d+=[c]
    # # temp_1 = pd.DataFrame(y,columns=['book_id','ISBN','book_title'])
    # # books_df=temp_1.iloc[0:10000][:10000]
    # temp_1 = pd.DataFrame(d,columns=['book_id','ISBN','book_title'])
    # books_df=temp_1.iloc[0:1000][:1000]

    # for item in ratings:
    #     e=[item.user_id,item.isbn,item.rating]
    #     f+=[e]
    # ratings_df=pd.DataFrame(f,columns=['user_id','ISBN','rating'])
    # temp=pd.merge(ratings_df,books_df,on='ISBN')
    # ratings=pd.DataFrame(temp.groupby('book_title')['rating'].mean())
    # ratings['number_of_ratings']=temp.groupby('book_title')['rating'].count()
    # book_matrix_UII=temp.pivot_table(index='user_id',columns='book_title',values='rating')
    # ratings.sort_values('number_of_ratings',ascending=False).head()
    # try:
    #     user_searched_book=book_matrix_UII[cart_item_booktitle]
    #     similar_to_search_book=book_matrix_UII.corrwith(user_searched_book)
    #     corr_searched_book=pd.DataFrame(similar_to_search_book,columns=['correlation'])
    #     corr_searched_book.dropna(inplace=True)
    #     df1=pd.DataFrame(corr_searched_book)
    #     itr=len(df1.index)
    #     res1=[]
    #     i=0
    #     while i<itr:
    #         val=df1.index[i]
    #         res1.append(val)
    #         i+=1
    #     final_result1={}
    #     temp1=[]
    #     for x in res1:
    #         pk=str(x)
    #         search_recom=Books.objects.get(Book_title=pk)
    #         book_title=search_recom.Book_title
    #         book_auth=search_recom.Book_Author
    #         isbn=search_recom.ISBN
    #         ID=search_recom.id
    #         img_L=search_recom.img_url_L
    #         final_result1["id"]=ID
    #         final_result1["title"]=book_title
    #         final_result1["author"]=book_auth
    #         final_result1["isbn"]=isbn
    #         final_result1["img"]=str(img_L)
    #         final_result_copy1=final_result1.copy()
    #         final_book_obj.append(final_result_copy1)

    # except:
    #     return Response(final_book_obj)
    
    # for i in final_book_obj:
    #     if i not in final_book_obj_unique:
    #         final_book_obj_unique.append(i)

    

    # return Response(final_book_obj_unique)


@api_view(['POST'])
def submitrating(request):
    data=request.data
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



@api_view(['POST'])
def signup(request):
    data=request.data
    datas=userdata.objects.create(
        id=data['userid'],
        Location=data['location'],
        Age=data['age']
    )

    return Response('user created')

@api_view(['GET'])
def items(request):
    items=Cart.objects.filter(user_id=5)
    cartpro=CartSerializer(items,many=True)
    return Response(cartpro.data)

@api_view(['POST'])
def addcart(request):
    data=request.data
    userid=data['userid']
    bookid=data['Bookid']
    book_obj=Books.objects.all().get(id=bookid)
    instance=Cart.objects.create(
        user_id=userid,
        book=book_obj
    )
    return Response('added')

@api_view(['GET'])
def getitems(request,pk):
    books=Cart.objects.all()
    res=[]
    tmp={}
    cartitems=[]
    for x in books:
        if(x.user_id==pk):
            res.append(x.book)
            for i in res:
                title=i.Book_title 
                author=i.Book_Author
                img=i.img_url_L
                year_pub=i.Year_of_Publication
                publisher=i.Publisher
                isbn=i.ISBN 
                ID=i.id
                tmp['id']=x.id
                tmp['Qty']=x.quantity
                tmp['title']=title
                tmp['author']=author
                tmp['img']=str(img)
                tmp['yearofpub']=year_pub
                tmp['publisher']=publisher
                tmp['isbn']=isbn
                tmp['bookid']=ID
            tmpcopy=tmp.copy() 
            cartitems.append(tmpcopy)

    return Response(cartitems)

@api_view(['POST'])
def removecart(request,pk):
    data=request.data
    isbn=data['isbn']
    userid=pk
    cart=Cart.objects.all()
    for x in cart:
        if(x.user_id==userid and x.book.ISBN==isbn):
            x.delete()
    return Response('removed')

@api_view(['POST'])
def inccart(request,pk):
    item=Cart.objects.get(id=pk)
    data=request.data
    action=data['quantity']
    userid=data['user_id']
    res={}
    if(action=='add'):
        item.quantity=item.quantity+1
        updatedqty=item.quantity
        res['user_id']=userid
        res['quantity']=updatedqty
    if(action=='sub'):
        item.quantity=item.quantity-1
        updatedqty=item.quantity
        res['user_id']=userid
        res['quantity']=updatedqty
    ser=CountSerializer(instance=item,data=res) 
    if ser.is_valid():
        ser.save();
    if item.quantity<=0:
        item.delete();

    return Response(ser.data)

@api_view(['POST'])
def order(request,pk):
    tmp=[]
    data=request.data
    tmp.append(data)
    for x in tmp:
        for key,value in x.items():
            val=value
            for i in val:
                bookid=list(i.values())[0]
                Qty=list(i.values())[1]
                ordername=list(i.values())[2]
                address=list(i.values())[3]
                book_obj=Books.objects.get(id=bookid)
                instance=Orders.objects.create(
                    orders=book_obj,
                    user_id=pk, 
                    quantity=Qty,
                    order_user_name=ordername,
                    order_address=address
                )

    return Response('ordered')

@api_view(['POST'])
def emptycart(request,pk):
    tmp=[]
    data=request.data
    tmp.append(data)
    for x in tmp:
        for key,value in x.items():
            val=value
            for i in val:
                cartid=list(i.values())[0] 
                cart=Cart.objects.get(id=cartid)
                cart.delete()
    return Response('Removed')


@api_view(['GET'])
def userorders(request,pk):
    ordered_obj=[]
    res=[]
    tmp={}
    product_obj=Orders.objects.all()
    for x in product_obj:
        if(x.user_id==pk):
            ordered_obj.append(x)
            for i in ordered_obj:
                title=i.orders.Book_title
                author=i.orders.Book_Author
                img=i.orders.img_url_L
                tmp['title']=title
                tmp['author']=author
                tmp['img']=str(img)
                tmp['Qty']=x.quantity
                tmp['purchased']=x.created
                tmp['Status']=x.delevery_status
            tmp_copy=tmp.copy()
            res.append(tmp_copy)

    return Response(res) 
    


# @api_view(['POST'])
# def upload_data(request):
#     file=request.FILES["file"]
#     content =file.read()
#     file_content=ContentFile(content)
#     file_name=fs.save(
#     "_tmp.csv" , file_content
#     )
#     tmp_file=fs.path(file_name)
#     csv_file=open(tmp_file,errors="ignore")
#     reader=csv.reader(csv_file)
#     next(reader)
#     book_list=[]

#     for id_, row in enumerate(reader):
#         (UserID,Location,Age
#         )=row 
            
#         book_list.append(
#            userdata(
#                 id=UserID,
#                 Location=Location,
#                 Age=Age
#                 )
#         )

        
#     userdata.objects.bulk_create(book_list)

#     return Response('uploaded')


@api_view(['GET'])
def recommentation(request,pk):
    books=Books.objects.all()
    ratings=Rating.objects.all()
    x=[]
    y=[]
    a=[]
    b=[]
    for item in books:
        x=[item.id,item.ISBN,item.Book_title]
        y+=[x]
    books_df=pd.DataFrame(y,columns=['book_id','ISBN','title'])

    for item in ratings:
        a=[item.user_id,item.isbn,item.rating]
        b+=[a]
    ratings_df=pd.DataFrame(b,columns=['user_id','ISBN','rating'])
    x = ratings_df['user_id'].value_counts() > 1
    y = x[x].index
    ratings = ratings_df[ratings_df['user_id'].isin(y)]
    rating_with_books = ratings.merge(books_df, on='ISBN')
    number_rating = rating_with_books.groupby('title')['rating'].count().reset_index()
    number_rating.rename(columns= {'rating':'number_of_ratings'}, inplace=True)
    final_rating = rating_with_books.merge(number_rating, on='title')
    final_rating = final_rating[final_rating['number_of_ratings'] >= 1]
    final_rating.drop_duplicates(['user_id','title'], inplace=True)
    book_pivot = final_rating.pivot_table(columns='user_id', index='title', values="rating")
    book_pivot.fillna(0, inplace=True)
    book_sparse = csr_matrix(book_pivot)
    model = NearestNeighbors(algorithm='brute')
    model.fit(book_sparse)
    book_title=[]
    user_book_isbn=[]
    user_recom_index=[]
    final_recom=[]
    final_book_obj_unique=[]
    recommented=[]
    test=[]
    try:
        user_ratings=Rating.objects.filter(user_id=pk).order_by('-id')[0]
        user_book_isbn.append(user_ratings.isbn)
    except:
        return Response([])
    user_latest_rated_book=Books.objects.get(ISBN=user_book_isbn[0])
    book_title.append(user_latest_rated_book.Book_title)
    for i in range(len(book_pivot)):
        if book_pivot.index[i]==book_title[0]:
            user_recom_index.append(i)
            break
    try:
        distances, suggestions = model.kneighbors(book_pivot.iloc[user_recom_index[0], :].values.reshape(1, -1))
        for i in range(len(suggestions)):
            recommented.append(book_pivot.index[suggestions[i]])
    except:
        return Response([])
    
    res={}
    for x in recommented:
        for i in range(len(recommented[0])):
            try:
                book=Books.objects.get(Book_title=x[i])
                res['title']=book.Book_title
                res['author']=book.Book_Author
                res['isbn']=book.ISBN
                res['id']=book.id
                res['img']=str(book.img_url_L)
                res_copy=res.copy()
                final_recom.append(res_copy)
            except:
                rs['title']=x[i]
                res_copy=res.copy()
                final_recom.append(res_copy)
    # {TODO: PURCHASE BASED RECOM } 
    # try:
        # user_ratings=Rating.objects.filter(user_id=pk).order_by('-id')[0]
        # user_book_isbn.append(user_ratings.isbn)
        
        # user_latest_rated_book=Books.objects.get(ISBN=user_book_isbn[0])
        # book_title.append(user_latest_rated_book.Book_title)
        # for i in range(len(book_pivot)):
        #     if book_pivot.index[i]==book_title[0]:
        #         user_recom_index.append(i)
        #         break
        # user_recom_index[0]
        
        
        
    # except:
    #     return Response(final_recom)
    # e=[]
    # f=[]
    # a=[]
    # try:
    #     user_search=savesearch.objects.filter(userid=pk).order_by('-id')[0]
    #     e.append(user_search.booktitle)
    #     for i in range(len(book_pivot)):
    #         if book_pivot.index[i]==e[0]:
    #             f.append(i)
    #             break
    #     distances,suggestions=model.kneighbors(book_pivot.iloc[f[0],:].values.reshape(1,-1))
    #     for i in range(len(suggestions)):
    #         a.append(book_pivot.index[suggestions[i]])
    #     res1={}
    #     for x in a:
    #         for i in range(len(a[0])):
    #             book=Books.objects.get(Book_title=x[i])
    #             res1['title']=book.Book_title
    #             res1['Book_author']=book.Book_Author
    #             res1['img']=str(book.img_url_L)
    #             res1_copy=res1.copy()
    #             final_recom.append(res1_copy)
    # except:
    #     return Response(final_recom)

    # for i in final_recom:
    #     if i not in final_book_obj_unique:
    #         final_book_obj_unique.append(i)
    
    
    return Response(final_recom)









 

