import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import useUser from "../../hooks/useUser";
// Basada en esta idea https://blog.netcetera.com/how-to-create-guarded-routes-for-your-react-app-d2fe7c7b6122
const GuardedRoute = ({component: Component}) => {
  const { isLogged, isJWTLoading } = useUser();
  console.log(isLogged,isJWTLoading);
  
  if (!isJWTLoading) {
    console.log(isLogged,isJWTLoading);

    if (!isLogged) {
      console.log(isLogged,isJWTLoading);

     
      return <Navigate to="/login" />;
    }
    return <Outlet />;
  }else{

    return <></>

  }
};
export default GuardedRoute;
