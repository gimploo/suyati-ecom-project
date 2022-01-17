import React, { useState, useEffect,useContext } from "react";
import "../css/Cart.css";
import UserContext from "../context/UserContext";
import axios from '../Axios'
function Orders() {
  let { user} = useContext(UserContext);
  const [order, setOrder] = useState([]);
  useEffect(() => {
    axios.get(`api/getitems/${user.id}/`).then((res) => {
      if (res && res.status == 200) {
        setOrder(res.data);
      }
    });
  }, []);

  return (
    <div>
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
              <h>{item.yearofpub}</h>
              <h>{item.publisher}</h>
            </div>
          ))}
        </>
      ) : (
        <>Empty Order</>
      )}
    </div>
  );
}

export default Orders;
