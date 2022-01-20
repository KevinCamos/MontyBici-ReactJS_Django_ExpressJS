import React, { Suspense } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function MyRouter() {
  // const { auth } = useUser();
  const Header = React.lazy(() => import("./components/Header/Header"));

  const LoginPage = React.lazy(() => import("./pages/Login/LoginPage"));

  return (
    <div>
      <Suspense fallback={<div>Cargando...</div>}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Header />}>
              <Route path="/login/:" element={<LoginPage />} />
            </Route>
            <Route path="*" element={<Header />}>
              <Route index element={<LoginPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}
