// import { Route, Switch } from "wouter";
import React, { Suspense } from "react";

// import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

export default function MyRouter() {
  // const { auth } = useUser();
  const LoginPage = React.lazy(() => import("./pages/Login/LoginPage"));

  return(
    <div>
      <Suspense fallback={<div>Cargando...</div>}>
      <BrowserRouter>

        <Routes>
          <Route  path="/login" element={<LoginPage/>} />
          <Route index  element={<LoginPage/>} />
        </Routes>
      </BrowserRouter>
      </Suspense>

    </div>
  );
}
