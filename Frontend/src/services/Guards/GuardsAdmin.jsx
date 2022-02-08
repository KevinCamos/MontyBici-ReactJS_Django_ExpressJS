import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import useUser from "../../hooks/useUser";
import Loading from "../../components/Templates-Suspense/Loading";

const GuardAdmin = () => {
  const { isAdmin, isJWTLoading, isJWTAdminLoading, checkAdmin, isCheckingAdmin, setIsCheckingAdmin } = useUser();
  console.log(isAdmin, "is admin")

  if (!isCheckingAdmin) {
    setIsCheckingAdmin(true)
    checkAdmin()
  }
  if (!isJWTAdminLoading) {
    console.log(isAdmin, "is admin")
    return !isAdmin ? <Navigate to="/login" /> : <Outlet />;
  }
  // return <Loading />;

  console.log(isAdmin, "is admin")

  return <Loading />
};
export default GuardAdmin;
