import React from 'react'


const BookCard = ({author, imgUrl, title, rating} ) => {

    return (

        <div className="bg-white box-border m-4 overflow-hidden md:flex flex-column justify-between cursor-pointer drop-shadow-lg">
            <div className="m-0">
                <h2 className="p-4 text-white font-bold bg-black">{title}</h2>
                <p className="p-2 bg-blue-100">You rated {rating} / 10 !</p>
                <img src={imgUrl} class='object-cover overflow-hidden w-full'/>
                {/* <h3 className="p-4 text-white font-bold text-left bg-gray-800">By {author}</h3> */}
            </div>
        </div>

    )

}




export default BookCard

