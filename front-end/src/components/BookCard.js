import React from 'react'



const BookCard = ({author, imgUrl, title, rating} ) => {

    return (<>
        <div class='bg-white md:w-1/3 m-4'>
            <h1 class='font-bold bg-black text-white text-2xl p-4'>{title}</h1>
            {/* <p class='px-4 text-right font-light'>By {author}</p> */}
            <img class='rounded-sm p-2' width='600' height='400' alt='book image' src={imgUrl}/>
            <h2 class='font-extralight '> Rating:<b>{rating}</b> </h2>
        </div>
    </>)
}


export default BookCard

