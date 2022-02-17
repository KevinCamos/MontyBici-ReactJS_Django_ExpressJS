import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import useUser from "../../hooks/useUser";
import Loading from "../../components/Templates-Suspense/Loading";

const GuardAdmin = () => {
  const { isAdmin, isJWTAdminLoading, checkAdmin, isCheckingAdmin, setIsCheckingAdmin } = useUser();

  if (!isCheckingAdmin) {
    setIsCheckingAdmin(true)
    checkAdmin()
  }
  if (!isJWTAdminLoading) {
    return !isAdmin ? <Navigate to="/login" /> : <Outlet />;
  }
  return <Loading />
};
export default GuardAdmin;
