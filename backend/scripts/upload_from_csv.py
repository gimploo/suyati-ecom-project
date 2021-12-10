from book.models        import Book
from customUser.models  import CustomUser
from rating.models      import Rating
import csv

CSV_USERS_PATH      = "../data/Users.csv"
CSV_BOOKS_PATH      = "../data/Books.csv"
CSV_RATINGS_PATH    = "../data/Ratings.csv"

def run():
    upload_all_records_to_Book()
    upload_all_records_to_Customuser()
    upload_all_records_to_Ratings()

def upload_all_records_to_Book():
    with open(CSV_BOOKS_PATH) as f:
        reader = csv.reader(f)
        next(reader)

        print("[!] Deleting all records in Books")
        Book.objects.all().delete()

        print("[*] Inserting new records into Books ....")
        for row in reader:
            print("[!] New record:", row)

            isbn                = row[0]
            title               = row[1]
            author              = row[2]
            year_of_publication = row[3]
            publisher           = row[4]
            img_url_s           = row[5]
            img_url_m           = row[6]
            img_url_l           = row[7]

            Book(
                isbn = isbn, 
                title = title, 
                author = author, 
                year_of_publication = year_of_publication, 
                publisher = publisher, 
                img_url_s = img_url_s, 
                img_url_m = img_url_m, 
                img_url_l = img_url_l
            ).save()
            print("[!] Record successfully added!")

    print("[!] All records added!")
            

def upload_all_records_to_Customuser():
    with open(CSV_USERS_PATH) as f:
        reader = csv.reader(f)
        next(reader)

        print("[!] Deleting all records in Users")
        CustomUser.objects.all().delete()

        print("[*] Inserting new records into Users ....")
        for row in reader:
            print("[!] New record:", row)

            user_id     =  int(row[0])

            if row[1] == '':
                location = 'UNKNOWN'
            else:
                location = row[1]

            if row[2] == '':
                age = 0
            else:
                age = float(row[2])

            try:
                CustomUser(
                    user_id,
                    location,
                    age
                ).save()
            except Exception as e:
                print(e)
                exit(1)


            print("[!] Record successfully added!")
    print("[!] All records added!")

def upload_all_records_to_Ratings(max_records=100):
    with open(CSV_RATINGS_PATH) as f:
        reader = csv.reader(f)
        next(reader)

        print("[!] Deleting all records in Ratings!")
        Rating.objects.all().delete()

        print("[*] Inserting new records into Ratings ....")
        for row in reader:
            print("[!] New record:", row)

            user_id = row[0]
            isbn    = row[1]
            rating  = row[2]

            Rating(
                user_id = user_id,
                isbn = isbn,
                rating = rating
            ).save()
            print("[!] Record successfully added!")
    print("[!] All records added!")