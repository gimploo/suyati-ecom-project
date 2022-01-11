import { Button } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import axios from "../Axios";
import "../css/Rowbooks.css";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Skeleton from "@mui/material/Skeleton";
import Pagination from "@mui/material/Pagination";

function StoreBooks() {
  let { user } = useContext(UserContext);
  const [storebooks, setStorebooks] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    Store();
  }, []);
  useEffect(() => {
    Store();
  }, [page]);
  console.log(storebooks);

  const Store = () => {
    axios.get(`api/list?page=${page}`).then((res) => {
      if (res && res.status == 200) {
        setStorebooks(res.data.results);
      }
    });
  };

  const loadmore = (event, value) => {
    setPage(value);
  };

  return (
    <div className="storebooks">
      <div className="posters">
        {storebooks && storebooks[0] ? (
          <>
            {storebooks.map((obj) => (
              <div className="trending_books">
      
                <img
                  src={`http://${obj.image_url.replace('/http%3A/','')}`}
                  alt=""
                  className="img_books"
                ></img>

               
                <h>{obj.Book_title}</h>
                <h>{obj.Book_Author}</h>
                <div className="trending_icons">
                  {user && user.id ? (
                    <>
                      <Link to={`/ratings/${obj.ISBN}`}>
                        <Button variant="contained" color="success">
                          Rate
                        </Button>
                      </Link>
                      <AddShoppingCartIcon className="carticon" />
                    </>
                  ) : (
                    <>
                      <Link to="/login">
                        <Button variant="contained" color="success">
                          Rate
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            ))}
          </>
        ) : null}
      </div>
      <div className="store-icons">
        <Pagination
          count={200000}
          page={page}
          onChange={loadmore}
          color="primary"
        />
      </div>
    </div>
  );
}

export default StoreBooks;
