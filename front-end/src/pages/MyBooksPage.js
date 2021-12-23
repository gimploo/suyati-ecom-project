import React, { useContext } from 'react'
import BookCard from '../components/BookCard'
import UserContext from '../context/UserContext'


const MyBooksPage = () => {

    const { rating } = useContext(UserContext)

    return (
    <div class='bg-yellow-200'>
        <div class='md:w-3/4 m-auto'>
            <div class='p-7 bg-yellow-300'>
                <h1 class='text-yellow-200 md:text-center font-extralight text-6xl bg-yellow-700 p-6 rounded-lg'>My Books</h1>

                <div class='md:flex'>
                    { rating && 
                        rating.map((element, index) => (
                            <BookCard title={element.book_title}
                                author={element.book_auth}
                                rating={element.rating}
                                imgUrl={element.img_Lar}
                            />
                        )) 
                    }
                </div>
            </div>
        </div>
</div>
    )
}


export default MyBooksPage