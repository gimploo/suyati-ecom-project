import React, { useState, useEffect, useContext } from "react";
import axios from "../Axios";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import { Button } from "@mui/material";
import "../css/Cart.css";
function Cart() {
  let { cartitems, user, itemadd } = useContext(UserContext);
  const [removed, setRemoved] = useState(false);
  const [qty, setQty] = useState(false);
  useEffect(() => {
    itemadd();
  }, [removed, qty]);
  const itemremove = (isbn) => {
    setRemoved(false);

    let userid = user.id;
    const removeapi = `api/remove/${userid}/`;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ isbn: isbn });
    axios.post(removeapi, body, config).then((res) => {
      setRemoved(true);
      alert("removed");
    });
  };
  const incqty = (itemid, val) => {
    setQty(false);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ quantity: val, user_id: user.id });
    const incapi = `api/inccartcount/${itemid}/`;

    axios.post(incapi, body, config).then((res) => {
      setQty(true);
    });
  };
  return (
    <div>
      {cartitems && cartitems[0] ? (
        <>
          {cartitems.map((item) => (
            <>
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
              <button
                onClick={() => {
                  itemremove(item.isbn);
                }}
              >
                Remove
              </button>
              <button
                onClick={() => {
                  incqty(item.id, "sub");
                }}
              >
                -
              </button>
              {item.Qty}
              <button
                onClick={() => {
                  incqty(item.id, "add");
                }}
              >
                +
              </button>
            </>
          ))}
          <Link to={"/checkout"}>
            <Button variant="contained" color="success">
               checkout
            </Button>
          </Link>
        </>
      ) : (
        <>Empty Cart</>
      )}
    </div>
  );
}

export default Cart;
