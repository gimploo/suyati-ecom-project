import React, { useState, useEffect, useContext } from "react";
import UserContext from "../context/UserContext";

const HomePage = () => {
  let {user_loaded} = useContext(UserContext);
  
  useEffect(() => {
    user_loaded();
  },[]);

  return (
    <div class="font-semibold text-white p-10 text-center bg-gray-700">
      HOME PAGE
    </div>
  );
};

export default HomePage;
