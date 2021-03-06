import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StationsContextProvider } from './context/StationsContext';
import { UserContextProvider } from './context/UserContext';
import { NotificationsContextProvider } from './context/NotificationsContext';
import { AdminContextProvider } from './context/Admin/AdminContext';

import GuardUser from './services/Guards/GuardsUser';
import GuardAdmin from './services/Guards/GuardsAdmin';

import Loading from './components/Templates-Suspense/Loading';

export default function MyRouter() {
  // USERS
  const Header = React.lazy(() => import('./components/Header/Header'));
  const Drawer = React.lazy(() => import('./components/Admin/Drawer/Drawer'));
  const Login = React.lazy(() => import('./pages/Login/Login'));
  const Register = React.lazy(() => import('./pages/Register/Register'));
  const StationPage = React.lazy(() => import('./pages/Stations/StationPage'));
  const DetailsPage = React.lazy(() => import('./pages/Details/DetailsPage'));
  const Dashboard = React.lazy(() => import('./pages/Dashboard/Dashboard'));
  const Payment = React.lazy(() => import('./pages/Payment/Payment'));
  const RegisterCredit = React.lazy(() => import('./pages/RegisterCredit/RegisterCredit'));

  const NotFound = React.lazy(() => import('./pages/NotFound/NotFound'));

  // ADMIN AdminNotifications
  const AdminStation = React.lazy(() => import('./pages/Admin/AdminStation/AdminStation'));
  const FormStation = React.lazy(() => import('./pages/Admin/FormStation/FormStation'));

  const AdminBike = React.lazy(() => import('./pages/Admin/AdminBike/AdminBike'));
  const AdminPoint = React.lazy(() => import('./pages/Admin/AdminPoint/AdminPoint'));
  const AdminNotifications = React.lazy(() =>    import('./pages/Admin/AdminNotifications/AdminNotifications')  );

  return (
    <Suspense fallback={<Loading />}>
      <UserContextProvider>
        <AdminContextProvider>
          <StationsContextProvider>
            <NotificationsContextProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Header />}>
                    <Route path="/" element={<GuardUser />}>
                      <Route index element={<StationPage />} />
                    </Route>
                    <Route path="/login" element={<Login />} />
                    <Route path="/admin" element={<Login admin />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/stations" element={<GuardUser />}>
                      <Route index element={<StationPage />} />
                      <Route path="/stations/:slug" element={<DetailsPage />} />
                    </Route>
                    <Route path="/dashboard" element={<GuardUser />}>
                      <Route index element={<Dashboard />} />
                    </Route>
                    <Route path="/payment" element={<GuardUser />}>
                      <Route index element={<Payment />} />
                    </Route>
                    <Route path="/credit" element={<GuardUser />}>
                      <Route index element={<RegisterCredit />} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                  </Route>

                  <Route path="/admin-panel" element={<Drawer />}>
                    <Route path="/admin-panel" element={<GuardAdmin />}>
                      <Route index element={<AdminStation />} />
                      <Route
                        path="/admin-panel/stations/"
                        element={<AdminStation />}
                      />
                      <Route
                        path="/admin-panel/stations/create"
                        element={<FormStation />}
                      />
                      <Route
                        path="/admin-panel/stations/update/:slug"
                        element={<FormStation />}
                      />
                      <Route
                        path="/admin-panel/bikes"
                        element={<AdminBike />}
                      />
                      <Route
                        path="/admin-panel/points"
                        element={<AdminPoint />}
                      />
                      <Route
                        path="/admin-panel/notifications"
                        element={<AdminNotifications />}
                      />
                    </Route>
                  </Route>
                </Routes>
              </BrowserRouter>
            </NotificationsContextProvider>
          </StationsContextProvider>
        </AdminContextProvider>
      </UserContextProvider>
    </Suspense>
  );
}
