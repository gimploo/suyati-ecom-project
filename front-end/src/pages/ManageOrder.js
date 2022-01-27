import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import "../css/Cart.css";
function ManageOrder() {
  return (
    <div className="outer-box-manage-orders" style={{ minHeight: "100vh" }}>
      <div className="checkout-card">
        <h1 className="checkout-text">Order placed Successfully!</h1>
    
        <Link to={"/orders"}>
          <Button variant="contained" color="secondary">
            Manage Your Order
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default ManageOrder;
