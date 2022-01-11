import React, { useEffect, useState,useContext } from "react";
import axios from "../Axios";
import "../css/Rowbooks.css";
import Skeleton from '@mui/material/Skeleton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
function RecomBook() {

  
  let { user,recombook,nullrecom } = useContext(UserContext); 

  return (
    <div className="row">
      <div className="posters">
        {recombook && recombook[0] ? (
           
          <>
           {nullrecom?<>
           <h1 style={{margin:"auto"}}>No Recommentations found</h1>
           </>:<>
            {recombook.map((obj) => (
              <>
                <div className="trending_books">
                  <img src={obj.img} alt="book_img" className="img_books" />
                  <h>{obj.title}</h>
                  <h>{obj.author}</h>
                  <div className="trending_icons">
                    {user && user.id ? (
                      <>
                        <Link to={`/ratings/${obj.isbn}`}>
                          <Button variant="contained" color="success">
                            Rate
                          </Button>
                        </Link>
                        <Link to=''>
                        <AddShoppingCartIcon className="carticon"/>
                        </Link>
                       
                      </>
                    ) : null}
                  </div>
                </div>
              </>
            ))}
           
           
           </>}

          </>
        ) : (
          <div className="trending_skeleton">
             
                <div className="skelton-box">
              <Skeleton variant="rectangular" width={210} height={118} />
              <Skeleton variant="text" animation="wave" />
              <Skeleton variant="text" animation="wave" />
            </div>
            <div className="skelton-box">
              <Skeleton variant="rectangular" width={210} height={118} />
              <Skeleton variant="text" animation="wave" />
              <Skeleton variant="text" animation="wave" />
            </div>
            <div className="skelton-box">
              <Skeleton variant="rectangular" width={210} height={118} />
              <Skeleton variant="text" animation="wave" />
              <Skeleton variant="text" animation="wave" />
            </div>
            <div className="skelton-box">
              <Skeleton variant="rectangular" width={210} height={118} />
              <Skeleton variant="text" animation="wave" />
              <Skeleton variant="text" animation="wave" />
            </div>
            <div className="skelton-box">
              <Skeleton variant="rectangular" width={210} height={118} />
              <Skeleton variant="text" animation="wave" />
              <Skeleton variant="text" animation="wave" />
            </div>
             

          </div>
        )}
      </div>
    </div>
  );
}

export default RecomBook;
