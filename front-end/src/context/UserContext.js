import { createContext, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const UserContext = createContext();
export default UserContext;

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [rating, setRating] = useState(null);
  const [loading, setLoading] = useState(true);
  const [useralert, setUseralert] = useState(false);
  const [networkalert, setNetworkalert] = useState(false);
  const userid=localStorage.getItem('user_id')
  const history = useHistory();

  let loginUser = async (e) => {
    setLoading(false);
    e.preventDefault();

    let userid = e.target.userid.value;

    await axios
      .get(`http://127.0.0.1:8000/api/login/${userid}/`)

      .then((res) => {
        console.log(res.data);
        if (res.status == 200) {
          localStorage.setItem("user_id", res.data.id);
          setUser(res.data);
          history.push("/");
          setLoading(true);
        } else {
          setLoading(true);
        }
      })
      .catch((err) => {
        if (!err.response) {
          setLoading(true);
          setNetworkalert(true);
          // alert('Network Error check connection')
        }
        if (err.response) {
          if (err.response.status == 500) {
            setLoading(true);
            setUseralert(true);
            // alert('User id is incorrect!')
          }
        }
      });
  };
  const user_rating = () => {
    axios.get(`http://127.0.0.1:8000/api/user_rating/${userid}/`)

      .then((res) => {
        if (res.status == 200) {
          setRating(res.data);
        } else {
          alert("Unavailable to fetch the user");
        }
      });
  };
  const logoutUser = () => {
    setUser(null);
    setRating(null);
    setNetworkalert(false);
    setUseralert(false);
    localStorage.removeItem("user_id");
    history.replace("/");
  };

  const userstate = () => {
    const userid = localStorage.getItem("user_id");
    axios
      .get(`http://127.0.0.1:8000/api/login/${userid}/`)

      .then((res) => {
        if (res.status == 200) {
          setUser(res.data);
        } else {
          alert("Login again");
        }
      });
  };

  let contextData = {
    user: user,
    rating: rating,
    loading: loading,
    useralert: useralert,
    networkalert: networkalert,
    loginUser: loginUser,
    logoutUser: logoutUser,
    userstate: userstate,
    user_rating:user_rating 
  };

  return (
    <UserContext.Provider value={contextData}>{children}</UserContext.Provider>
  );
};
