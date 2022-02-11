import React, { Suspense } from "react";
import { StationsContextProvider } from "./context/StationsContext";
import { UserContextProvider } from "./context/UserContext";
import GuardUser from "./services/Guards/GuardsUser";
import GuardAdmin from "./services/Guards/GuardsAdmin";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loading from "./components/Templates-Suspense/Loading";

export default function MyRouter() {
  //USERS
  const Header = React.lazy(() => import("./components/Header/Header"));
  const Drawer = React.lazy(() => import("./components/Admin/Drawer/Drawer"));
  const Login = React.lazy(() => import("./pages/Login/Login"));
  const Register = React.lazy(() => import("./pages/Register/Register"));
  const StationPage = React.lazy(() => import("./pages/Stations/StationPage"));
  const DetailsPage = React.lazy(() => import("./pages/Details/DetailsPage"));
  const Dashboard = React.lazy(() => import("./pages/Dashboard/Dashboard"));
  const NotFound = React.lazy(() => import("./pages/NotFound/NotFound"));

  // ADMIN
  const AdminStation = React.lazy(() => import("./pages/Admin/AdminStation/AdminStation"));
  const FormStation = React.lazy(() => import("./pages/Admin/FormStation/FormStation"));

  const AdminBike = React.lazy(() => import("./pages/Admin/AdminBike/AdminBike"));
  const AdminPoint = React.lazy(() => import("./pages/Admin/AdminPoint/AdminPoint"));

  

  return (
    <>
      <Suspense fallback={<Loading />}>
        <UserContextProvider>
          <StationsContextProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Header />}>
                  <Route path="/" element={<GuardUser />}>
                    <Route index element={<StationPage />} />
                  </Route>
                  <Route path="/login" element={<Login />} />
                  <Route path="/admin" element={<Login admin={true} />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/stations" element={<GuardUser />}>
                    <Route index element={<StationPage />} />
                    <Route path="/stations/:slug" element={<DetailsPage />} />
                  </Route>
                  <Route path="/dashboard" element={<GuardUser />}>
                    <Route index element={<Dashboard />} />
                  </Route>
                  <Route path="*" element={<NotFound />} />
                </Route>

                <Route path="/admin-panel" element={<Drawer />}>
                  <Route path="/admin-panel" element={<GuardAdmin />}>
                    <Route index element={<AdminStation />} />
                    <Route path="/admin-panel/stations/" element={<AdminStation />} />
                    <Route path="/admin-panel/stations/create" element={<FormStation />} />
                    <Route path="/admin-panel/stations/update/:slug" element={<FormStation />} />
                    <Route path="/admin-panel/bikes" element={<AdminBike />} />
                    <Route path="/admin-panel/points" element={<AdminPoint />} />

                    {/* <Route path="/admin-panel/stations/update:slug" element={<DetailsPage />} /> */}

                  </Route>
                </Route>
              </Routes>
            </BrowserRouter>
          </StationsContextProvider>
        </UserContextProvider>
      </Suspense>
    </>
  );
}
