import { useCallback, useContext, useState } from "react";

import { useNavigate } from "react-router-dom";

import UserContext from "../context/UserContext";

import userServices from "../services/UserServices";
const useUser = () => {

  const navigate = useNavigate();

  const [state, setState] = useState({ loading: false, error: false, errorPassword: false });
  const { jwt, setJWT, user, setUser, isJWTLoading, isRegisters } = useContext(UserContext);

  const login = useCallback(
    (data) => {
      setState({ loading: true, error: false })
      console.log({ user: data });
      userServices
        .login({ user: data })
        .then((data) => {
          saveUser(data.data.user)
        })
        .catch((error) => {
          setState({ loading: false, error: true })
          sessionStorage.removeItem("token");
          console.error(error);
        });
    },
    [setJWT, setUser]
  );
  const loginAdmin = useCallback(
    (data) => {
      setState({ loading: true, error: false })
      console.log({ user: data });
      userServices
        .loginAdmin({ user: data })
        .then((data) => {
          saveUser(data.data.user, true)
        })
        .catch((error) => {
          setState({ loading: false, error: true })
          sessionStorage.removeItem("token");
          console.error(error);
        });
    },
    [setJWT, setUser]
  );

  const signup = useCallback(
    (data) => {
      if (data.password !== data.password2) {
        setState({ loading: false, error: false, errorPassword: true })
      } else {
        setState({ loading: true, error: false, errorPassword: false })

        console.log({ user: data });
        userServices
          .register({ user: data })
          .then((data) => {
            saveUser(data.data.user)
          })
          .catch((error) => {
            setState({ loading: false, error: true, errorPassword: false })
            sessionStorage.removeItem("token");
            console.log(error);
          });
      }
    },
    [setJWT, setUser, setState]
  );

  const saveUser = (user, admin = false) => {
    console.log(admin)
    sessionStorage.setItem("token", user.token);
    setJWT(sessionStorage.token);
    setUser(user);
    admin ? navigate("/admin/home") : navigate("/stations");

  }

  const isLogged = Boolean(jwt) && Boolean(user);
  const logout = useCallback(() => {

    sessionStorage.removeItem("token");
    setJWT(null);
    setUser(null);
    navigate("/login");

  },
    [setJWT, setUser, navigate]
  );

  return { login,loginAdmin, signup, isLogged, user, logout, state, isJWTLoading, isRegisters };
}


export default useUser