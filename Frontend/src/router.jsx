import React, { Suspense } from "react";
import { StationsContextProvider } from "./context/StationsContext";
import { UserContextProvider } from "./context/UserContext";
import GuardUser from "./services/Guards/GuardsUser";
// import { LoadingButton } from '@mui/lab';

import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function MyRouter() {
  // const { auth } = useUser();
  const Header = React.lazy(() => import("./components/Header/Header"));

  const Login = React.lazy(() => import("./pages/Login/Login"));
  const Register = React.lazy(() => import("./pages/Register/Register"));
  const StationPage = React.lazy(() => import("./pages/Stations/StationPage"));
  const DetailsPage = React.lazy(() => import("./pages/Details/DetailsPage"));
  const NotFound = React.lazy(() => import("./pages/NotFound/NotFound"));
  // const Loading = React.lazy(() => import("./components/Templates-Suspense/Loading"));

  return (
    <>
      <Suspense fallback={<div>Cargando...</div>}>
        <UserContextProvider>
          <StationsContextProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Header />}>
                  <Route path="/" element={<GuardUser />}>
                    <Route index element={<StationPage />} />
                  </Route>

                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />

                  <Route path="/stations" element={<GuardUser />}>
                    <Route index element={<StationPage />} />
                    <Route path="/stations/:slug" element={<DetailsPage />} />

                  </Route>

                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </StationsContextProvider>
        </UserContextProvider>
      </Suspense>
    </>
  );
}
