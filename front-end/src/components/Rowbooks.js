import React, { useEffect, useState,useContext } from "react";
import "../css/Rowbooks.css";
import { Link, Redirect } from "react-router-dom";
import axios from "../Axios";
import UserContext from "../context/UserContext";
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Skeleton from '@mui/material/Skeleton';

function Rowbooks() {
  let { user } = useContext(UserContext);
  
  const [trending, setTrending] = useState([]); 

  useEffect(() => {
    axios.get("api/trending/").then((res) => {
      if (res.status == 200 && res.data) {
        setTrending(res.data);
      }
    });
  }, []);


  return (
    <div className="row">
      <div className="posters">
        {trending[0] ? (
          <>
            {trending.map((obj) => (
              <>
                <div className="trending_books">
                  <img src={obj.img_Lar} alt="poster" className="img_books" />
                  <h>{obj.book_title}</h>
                  <h>{obj.book_auth}</h>
                  <div className="trending_icons">
                {user && user.id?<>
                  <Link   to={`/ratings/${obj.isbn}`} >
                <Button variant="contained" color="success">
                    Rate
                  </Button>
                </Link>
                <AddShoppingCartIcon className="carticon"/>
                </>:<>
                <Link   to='/login' >
                <Button variant="contained" color="success">
                    Rate
                  </Button>
                </Link>
                </>}
                </div>
                </div>
              </>
            ))}
          </>
        ) :
        <div className="trending_skeleton">
        <div className="skelton-box">
        <Skeleton variant="rectangular"   width={210} height={118}/>
        <Skeleton variant="text" animation="wave" />
        <Skeleton variant="text" animation="wave" />
        </div>
        <div className="skelton-box">
        <Skeleton variant="rectangular"   width={210} height={118}/>
        <Skeleton variant="text" animation="wave" />
        <Skeleton variant="text" animation="wave" />
        </div>
        <div className="skelton-box">
        <Skeleton variant="rectangular"   width={210} height={118}/>
        <Skeleton variant="text" animation="wave"  />
        <Skeleton variant="text" animation="wave" />
        </div>
        <div className="skelton-box">
        <Skeleton variant="rectangular"   width={210} height={118}/>
        <Skeleton variant="text" animation="wave"  />
        <Skeleton variant="text" animation="wave" />
        </div>
        <div className="skelton-box">
        <Skeleton variant="rectangular"   width={210} height={118}/>
        <Skeleton variant="text" animation="wave" />
        <Skeleton variant="text" animation="wave" />
        </div>
        </div>}
      </div>
    </div>
  );
}

export default Rowbooks;
