import React,{useContext,useState,useEffect} from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import UserContext from "../context/UserContext";
function CheckoutPage() {
    
    let {checkout} = useContext(UserContext);
    const emptycart=(e)=>{
      e.preventDefault();
        checkout(e);
    }

  return (
    <div>
      <p>Please select your Payment Method:</p>
      <form onSubmit={emptycart}>
      <input type="radio" id="html" name="fav_language" value="HTML"></input> {" "}
      <label for="html">COD</label>
      <br /> {" "}
      <input type="radio" id="css" name="fav_language" value="CSS"></input> {" "}
      <label for="css">Card</label>
      <br /> {" "}
      {/* <Link to={'/manageorder'}> */}

      <input
                  class="outline-none rounded p-2"
                  type="text"
                  placeholder="name"
                  required
                  name='ordername'
                />
                <input
                  class="outline-none rounded p-2"
                  type="text"
                  placeholder="address"
                  required
                  name='address'
                />
      <input variant="contained" color="success" type="submit"
            Place Order
      />
      {/* </Link> */}
      </form>
    </div>
  );
}

export default CheckoutPage;
