import React, { useState, useEffect, useContext } from "react";
import axios from "../Axios";
import { Link, Redirect } from "react-router-dom";
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

    <div class='p-10'>

    {/* Cart */}
    <div class='border-2 bg-white rounded-lg'>

      <h2 class=' p-10 text-6xl font-semibold text-black w-full'> Your Cart </h2>

    <div class='px-10 w-full'>
      {cartitems && cartitems[0] ? (
        <>
          {cartitems.map((item) => (

            <div class="border-4 p-7 w-full h-full flex space-x-8 font-light text-black text-4xl">

				<div>
					<img
						class='rounded-lg p-4'
						width="400"
						height='300'
						src={item.img}
						alt=""
					></img>
				</div>
			
			<div>

                <div class='h-1/2 border-2 space-y-4'>
                  <div class='font-bold'>{item.title}</div>
                  <div class='font-light'>- {item.author}</div>
                </div>

				<div>

					<label class='font-normal'> Qty: 0{item.Qty % 10} </label>

					<button class='p-2 text-black text-7xl ml-2'
						onClick={() => {
						incqty(item.id, "add");
						}}
					>  
					+
					</button>

					<button class='p-2 text-black text-7xl ml-2'
						onClick={() => {
						incqty(item.id, "sub");
						}}
					> - </button>

					<div>
						<button class='bg-red-600 font-thin text-red-100 p-5 my-8 rounded-lg'
							onClick={() => {
							itemremove(item.isbn);
							}}
						> Delete </button>

					</div>

				</div>

			</div>
			</div>

          ))}
          <Link to={"/checkout"}>
			  <div class='bg-green-700 hover:bg-green-500 w-full flex justify-center align-center p-4 my-8 rounded-lg text-green-100 font-semibold text-4xl'>
				  checkout
			  </div>
          </Link>
        </>
      ) : (
          <Redirect to={"/"}></Redirect>
      )}
    </div>
    </div>
    </div>
  );
}

export default Cart;
