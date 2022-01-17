import React,{useContext,useState,useEffect} from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import UserContext from "../context/UserContext";
function CheckoutPage() {
    const [checkoutval,setCheckOutVal]=useState(false)
    let {checkout} = useContext(UserContext);
    const emptycart=()=>{
        console.log('hello')
     setCheckOutVal(true) //-------------check-----------
    }
    useEffect(()=>{
        console.log('heyy')
      checkout();
    },[checkoutval]) 
  return (
    <div>
      <p>Please select your Payment Method:</p>
      <input type="radio" id="html" name="fav_language" value="HTML"></input> {" "}
      <label for="html">COD</label>
      <br /> {" "}
      <input type="radio" id="css" name="fav_language" value="CSS"></input> {" "}
      <label for="css">Card</label>
      <br /> {" "}
      <Link to={'/manageorder'}>
      <Button variant="contained" color="success" onClick={emptycart}>
            Place Order
      </Button>
      </Link>
    </div>
  );
}

export default CheckoutPage;
