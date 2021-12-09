import { createContext, useState, useEffect } from 'react';
import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router-dom'


const AuthContext = createContext()

export default AuthContext;



export const AuthProvider = ({children}) => {
    let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null)
    let [user, setUser] = useState(()=> localStorage.getItem('token') ? jwt_decode(localStorage.getItem('token')) : null)

    let [loading, setLoading] = useState(false)

    const history = useHistory()

    let loginUser = async (e )=> {

        e.preventDefault()

        let response = await fetch('http://127.0.0.1:8000/api/login/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'username':e.target.username.value, 'password':e.target.password.value})
        })

        let data = await response.json()

        // Server is returning a 401 response code ? 
        console.log(response.status);

        if(response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            history.push('/')
        } else {
            alert('Something went wrong!', response.status)
        }

        if(loading) {
            setLoading(false);
        }
    }


    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        history.push('/login')
    }



    let contextData = {
        user:user,
        authTokens:authTokens,
        loginUser:loginUser,
        logoutUser:logoutUser,
    }


    return(
        <AuthContext.Provider value={contextData} >
            {loading ? "Page is loading" : children}
        </AuthContext.Provider>
    )
}