import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import useUser from "../../hooks/useUser";
// Basada en esta idea https://blog.netcetera.com/how-to-create-guarded-routes-for-your-react-app-d2fe7c7b6122
const GuardUser = () => {
  const { isLogged, isJWTLoading } = useUser();
  console.log(isLogged, isJWTLoading);

  if (!isJWTLoading) {
    return !isLogged ? <Navigate to="/login" /> : <Outlet />;
  } else {
    return <></>;
  }
};
export default GuardUser;
