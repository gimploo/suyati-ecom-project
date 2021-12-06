import React, {useState, useEffect, useContext} from 'react'
import AuthContext from '../context/AuthContext'


const HomePage = () => {

    let [notes, setNotes] = useState([])
    let {authTokens, logoutUser} = useContext(AuthContext)

    let {user} = useContext(AuthContext);


    return (
        
        <div class='font-semibold text-white p-10 text-center bg-gray-700' >
            HOME PAGE
        </div>
    )
}

export default HomePage;