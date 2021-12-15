import { createContext, useState } from 'react';
import { useHistory } from 'react-router-dom'


const UserContext = createContext()

export default UserContext;



export const UserProvider = ({children}) => {

    let [user, setUser]             = useState(null)
    let [loading, setLoading]       = useState(true)

    const history = useHistory()

    let loginUser = async (e )=> {

        e.preventDefault()

        let userid = e.target.userid.value
        let response = await fetch(`127.0.0.1:8000/api/login/${userid}/`)

        console.log(response)
        let data = await response.json()

        if(response.status === 200){
            setUser(data.access)
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
        setUser(null)
        history.push('/login')
    }


    let contextData = {
        user:       user,
        loginUser:  loginUser,
        logoutUser: logoutUser,
    }


    return(
        <UserContext.Provider value={contextData} >
            {children}
        </UserContext.Provider>
    )
}