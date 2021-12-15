import { createContext, useState, useEffect } from 'react';
import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router-dom'


const UserContext = createContext()

export default UserContext;



export const UserProvider = ({children}) => {

    let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('token'))
    let [user, setUser]             = useState(()=> localStorage.getItem('token'))
    let [loading, setLoading]       = useState(true)

    const history = useHistory()

    let loginUser = async (e )=> {

        e.preventDefault()

        let userid = e.target.userid.value
        let response = await fetch(`127.0.0.1:8000/api/login/${userid}/`)

        let data = await response.json()
        console.log(data)

        if(response.status === 200){
            setAuthTokens(data)
            setUser(data.access)
            localStorage.setItem('token', data)
            history.push('/')
        } else {
            alert('Something went wrong!', response.status)
        }

        if(loading) {
            setLoading(false);
        }

        history.push('/dashboard')
    }


    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('token')
        history.push('/login')
    }


    let contextData = {
        user:       user,
        authTokens: authTokens,
        loginUser:  loginUser,
        logoutUser: logoutUser,
    }


    return(
        <UserContext.Provider value={contextData} >
            {children}
        </UserContext.Provider>
    )
}