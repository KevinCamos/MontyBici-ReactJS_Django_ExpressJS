import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import useUser from "../../hooks/useUser";
import Loading from "../../components/Templates-Suspense/Loading";

const GuardUser = () => {
  const { isLogged, isJWTLoading } = useUser();
  if (!isJWTLoading) {
    return !isLogged ? <Navigate to="/login" /> : <Outlet />;
  }
  return <Loading />;
};
export default GuardUser;
