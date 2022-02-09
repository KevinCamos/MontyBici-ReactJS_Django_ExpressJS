import { useCallback, useContext, useState } from "react";

import { useNavigate } from "react-router-dom";

import UserContext from "../context/UserContext";

import userServices from "../services/UserServices";
const useUser = () => {

  const navigate = useNavigate();

  const [state, setState] = useState({ loading: false, error: false, errorPassword: false });
  const [isAdmin, setIsAdmin] = useState(false);
  const [isJWTAdminLoading, setIsJWTAdminLoading] = useState(true);
  const [isCheckingAdmin, setIsCheckingAdmin] = useState(false);

  const { jwt, setJWT, user, setUser, isJWTLoading, isRegisters } = useContext(UserContext);

  const login = useCallback(
    (data) => {
      setState({ loading: true, error: false })
      userServices.login({ user: data })
        .then((data) => {
          saveUser(data.data.user)
          navigate("/stations")
        })
        .catch((error) => {
          deleteUserOrError(error);
        });
    },
    [setJWT, setUser]
  );
  const loginAdmin = useCallback(
    (data) => {
      setState({ loading: true, error: false })
      data.is_staff = true
      userServices.login({ user: data })
        .then((data) => {
          saveUser(data.data.user, true)
          navigate("/admin-panel")
        })
        .catch((error) => {
          deleteUserOrError(error);
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
        userServices.register({ user: data })
          .then((data) => {
            saveUser(data.data.user)
            navigate("/stations")
          })
          .catch((error) => {
            deleteUserOrError(error);
          });
      }
    },
    [setJWT, setUser, setState]
  );

  const deleteUserOrError = (error) => {
    setState({ loading: false, error: true, errorPassword: false })
    setUser(null)
    setJWT(null)
    sessionStorage.removeItem("token");
    console.log(error);
  }


  const saveUser = (user, admin = false) => {
    console.log(admin)
    sessionStorage.setItem("token", user.token);
    setJWT(sessionStorage.token);
    setUser(user);
  }


  const checkAdmin = useCallback(
    () => {
      // if (sessionStorage.token) {
        console.log("eh")
        setIsJWTAdminLoading(true)
        userServices.checkAdmin()
          .then((data) => {
            setIsAdmin(true)
            console.timeLog("eh")
            saveUser(data.data.user, true)
            setIsJWTAdminLoading(false)
          })
          .catch((error) => {
            setIsJWTAdminLoading(false)
            deleteUserOrError()
            setIsAdmin(false)
          });
      // }
    },
    [setJWT, setUser]
  );

  const isLogged = Boolean(jwt) && Boolean(user);

  const logout = useCallback(() => {
    deleteUserOrError()
    navigate("/login");

  },
    [setJWT, setUser, navigate]
  );
  return { login, loginAdmin, signup, isLogged, user, logout, state, isJWTLoading, isJWTAdminLoading, isRegisters, checkAdmin, isAdmin, isCheckingAdmin, setIsCheckingAdmin };
}


export default useUser