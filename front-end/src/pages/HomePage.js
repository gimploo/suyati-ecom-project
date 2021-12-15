import React, {useState, useEffect, useContext} from 'react'
import UserContext from '../context/UserContext';


const HomePage = () => {

    let {user} = useContext(UserContext);


    return (
        
        <div class='font-semibold text-white p-10 text-center bg-gray-700' >
            HOME PAGE 
        </div>
    )
}

export default HomePage;