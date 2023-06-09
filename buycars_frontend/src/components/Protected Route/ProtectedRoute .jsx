import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { MainContext } from "../../Context/MinContext";
import { getToken } from "../../Utils/storeToken";

const ProtectedRoute = ({ children }) => {

  const {settoken,setisAuth } = useContext(MainContext);
  
    const secureToken = getToken("token");
 
  

  if (secureToken) {
    settoken(secureToken);
    setisAuth(true)
    return children;
  } 
    return <Navigate to="/signin" />;
  
};

export default ProtectedRoute;
