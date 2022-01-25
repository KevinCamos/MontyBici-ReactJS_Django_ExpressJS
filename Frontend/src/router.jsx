import React, { Suspense } from "react";
import { StationsContextProvider } from "./context/StationsContext";
import { UserContextProvider } from "./context/UserContext";

import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function MyRouter() {
  // const { auth } = useUser();
  const Header = React.lazy(() => import("./components/Header/Header"));

  const LoginPage = React.lazy(() => import("./pages/Login/LoginPage"));
  const StationPage = React.lazy(() => import("./pages/Stations/StationPage"));

  return (
    <>
      <Suspense fallback={<div>Cargando...</div>}>
        <UserContextProvider>
          <StationsContextProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<Header />}>
                  <Route path="/login/" element={<LoginPage />} />
                </Route>
                <Route path="/stations" element={<Header />}>
                  <Route path="/stations" element={<StationPage />} />
                </Route>
                <Route path="*" element={<Header />}>
                  <Route index element={<LoginPage />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </StationsContextProvider>
        </UserContextProvider>
      </Suspense>
    </>
  );
}
