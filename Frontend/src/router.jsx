import React, { Suspense } from "react";
import { StationsContextProvider } from "./context/StationsContext";
import { UserContextProvider } from "./context/UserContext";
import GuardedRoute from "./services/Guards/GuardsUser";

import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function MyRouter() {
  // const { auth } = useUser();
  const Header = React.lazy(() => import("./components/Header/Header"));

  const Login = React.lazy(() => import("./pages/Login/Login"));
  const Register = React.lazy(() => import("./pages/Register/Register"));
  const StationPage = React.lazy(() => import("./pages/Stations/StationPage"));

  return (
    <>
      <Suspense fallback={<div>Cargando...</div>}>
        <UserContextProvider>
          <StationsContextProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Header />}>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/stations" element={<GuardedRoute />}>
                    <Route index element={<StationPage />} />
                  </Route>
                </Route>

                <Route path="*" element={<Header />}>
                <Route index element={<Register />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </StationsContextProvider>
        </UserContextProvider>
      </Suspense>
    </>
  );
}
