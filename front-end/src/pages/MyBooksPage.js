import React from 'react'


const MyBooksPage = () => {

    return (
    <>
        <div class='p-10 bg-yellow-300 lg:px-96'>
            <h1 class='text-yellow-200 lg:text-center font-extralight text-6xl bg-yellow-700 p-6 rounded-lg'>My Books</h1>

            <div class='md:flex'>
                <div class='bg-white md:w-1/3 ml-4 mt-8 '>
                    book1
                </div>
                <div class='bg-white md:w-1/3 ml-4 mt-8 '>
                    book2
                </div>
                <div class='bg-white md:w-1/3 ml-4 mt-8 '>
                    book3
                </div>

            </div>
        </div>
    </>
    )
}


export default MyBooksPage