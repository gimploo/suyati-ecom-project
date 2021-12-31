import React, { useContext } from 'react'
import BookCard from '../components/BookCard'
import UserContext from '../context/UserContext'


const MyBooksPage = () => {

    const { rating } = useContext(UserContext)

    return (
    <div class='bg-yellow-200'>

        <div class='text-yellow-200 text-left font-semibold text-6xl bg-yellow-600 flex justify-center'>
        <h1 class='flex md:w-1/3 p-8 justify-center'>
            My Books
        </h1>

        </div>

        <div class='drop-shadow-sm md:flex md:p-5 md:h-1/8 md:space-x-8 md:justify-center md:align-center w-2/3'>
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
    )
}


export default MyBooksPage