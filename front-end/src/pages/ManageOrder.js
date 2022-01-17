import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
function ManageOrder() {
  return (
    <div>
      <h>Order placed Successfully!</h>
      <br />
      <Link to={"/orders"}>
        <Button variant="contained" color="success">
          Manage Your Order
        </Button>
      </Link>
    </div>
  );
}

export default ManageOrder;
