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
  const Login = React.lazy(() => import("./pages/Login/Login"));

  return(
    <div>
      <Suspense fallback={<div>Cargando...</div>}>
      <BrowserRouter>

        <Routes>
          <Route  path="/login" element={<Login/>} />
          <Route index  element={<Login/>} />
        </Routes>
      </BrowserRouter>
      </Suspense>

    </div>
  );
}
