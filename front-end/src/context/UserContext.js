import { createContext, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const UserContext = createContext()
export default UserContext

export const UserProvider = ({ children }) => {

  const [user, setUser] = useState(null)
  const [rating, setRating ] = useState(null)

  const history = useHistory()

  let loginUser =  async (e) => {
    e.preventDefault()

    let userid = e.target.userid.value;

    await axios.get(`http://127.0.0.1:8000/api/login/${userid}/`)

      .then((res) => {
        console.log(res.data);
        if (res.status == 200) {
          localStorage.setItem("user_id", res.data.id)
          setUser(res.data);
          history.push('/dashboard')   
          
        } else {
          alert("login failed!");
        }
      })

    await axios.get(`http://127.0.0.1:8000/api/user_rating/${userid}/`)

      .then((res) => {
        console.log(res.data);
        if (res.status == 200) {
          setRating(res.data);
        } else {
          alert("Unavailable to fetch ratings data");
        }
      })
  }

  const logoutUser = () => {
    setUser(null);
    setRating(null)
    localStorage.removeItem('user_id')
    history.replace('/')
  }

  let contextData = {
    user: user,
    rating:rating,
    loginUser: loginUser,
    logoutUser: logoutUser
  }

  return (
    <UserContext.Provider value={contextData}>{children}</UserContext.Provider>
  )
}
