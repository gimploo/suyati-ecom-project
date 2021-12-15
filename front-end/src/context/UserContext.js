import { createContext, useState } from "react";
import { useHistory,Redirect } from "react-router-dom";
import axios from "axios";

const UserContext = createContext();
export default UserContext;

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [authenticated, setAuthenticated] = useState(false); 

  const history = useHistory();

  let loginUser =  (e) => {
    e.preventDefault();
    let userid = e.target.userid.value;
    axios.get(`http://127.0.0.1:8000/api/login/${userid}/`).then((res) => {
      console.log(res.data);
      if (res.status == 200) {
        localStorage.setItem("user_id", res.data.id)
        setUser(res.data);
        history.push('/home')   
        
      } else {
        alert("login failed!");
      }
    });
  };
  const user_loaded = () => {
    console.log(authenticated)
    let user_id = localStorage.getItem("user_id");
    if (user_id) {
      axios.get(`http://127.0.0.1:8000/api/login/${user_id}/`).then((res) => {
        if (res.status === 200) {
          setUser(res.data);
          setAuthenticated(true)
        }else{
            alert('Something Went Wrong')
            setAuthenticated(false)
        }
      });
      
      
    }
  };
  console.log(authenticated)
  const check_login = () => {
   
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('user_id')
    history.replace('/home')
    
  };

  let contextData = {
    user: user,
    loginUser: loginUser,
    logoutUser: logoutUser,
    user_loaded: user_loaded,
    check_login:check_login,
    authenticated:authenticated
  };

  return (
    <UserContext.Provider value={contextData}>{children}</UserContext.Provider>
  );
};
