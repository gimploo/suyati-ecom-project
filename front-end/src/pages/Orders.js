import React, { useState, useEffect,useContext } from "react";
import "../css/Cart.css";
import {  Redirect } from 'react-router-dom';
import UserContext from "../context/UserContext";
import axios from '../Axios'
function Orders() {
  let { user} = useContext(UserContext);
  const [order, setOrder] = useState([]);
  useEffect(() => {
    if(user && user.id){
      axios.get(`api/userorders/${user.id}/`).then((res) => {
        if (res && res.status == 200) {
          setOrder(res.data);
        }
      });
    }
  }, []);

  return (
    
    <div>
      {user && user.id?<>
        {order && order[0] ? (
        <>
          {order.map((item) => (
            <div className="cartproducts">
              <img
                src={item.img}
                alt=""
                style={{ width: "150px", height: "200px" }}
              ></img>
              <h>{item.title}</h>
              <h>{item.author}</h>
             <h>Qty-{item.Qty}</h>
             <h>Purchased at-{item.purchased}</h>
             {item.Status?<>
              <h>Delevered-Yes</h>
             </>:<>
             <h>Delevered-No</h>
             </>}
            </div>
          ))}
        </>
      ) : ( 
        <>Empty Order</>
      )}
      
      </>:<>
      <Redirect to='/login' />
      
      </>}
    </div>
  );
}

export default Orders;
