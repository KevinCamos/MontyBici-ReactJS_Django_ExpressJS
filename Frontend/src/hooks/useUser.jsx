import { useCallback, useContext,  useState  } from "react";
import { useNavigate } from "react-router-dom";

import UserContext from "../context/UserContext";

import userServices from "../services/UserServices";
export default  function useUser() {
  let navigate = useNavigate();

  const [state, setState] = useState({ loading: false, error: false, errorPassword:false });
  const { jwt, setJWT, user, setUser,isJWTLoading } = useContext(UserContext);

  const login = useCallback(
    (data) => {
      setState({ loading: true, error: false})
      console.log({ user: data });
      userServices
        .login({ user: data })
        .then((data) => {
          let user = data.data.user;
          console.log(user);


          sessionStorage.setItem("token", user.token);
          setJWT(sessionStorage.token);
          setUser(user);
          navigate("/stations");
        })
        .catch((error) => {
          setState({ loading: false, error: true})

          sessionStorage.removeItem("token");

          console.log(error);
        });
    },
    [setJWT, setUser, navigate]
  );

  const signup = useCallback(
    (data) => {
      if(data.password !== data.password2){
        setState({ loading: false, error: false, errorPassword:true })
      }else{
        setState({ loading: true, error: false, errorPassword:false })

      console.log({ user: data });
      userServices
        .register({ user: data })
        .then((data) => {
          let user = data.data.user;
          console.log(user);

          sessionStorage.setItem("token", user.token);
          setJWT(sessionStorage.token);
          setUser(user);
          navigate("/stations");
        })
        .catch((error) => {
          setState({ loading: false, error: true, errorPassword:false })

          sessionStorage.removeItem("token");

          console.log(error);
        });
    }},
    [setJWT, setUser, navigate,setState]
  );
  const isLogged = Boolean(jwt) && Boolean(user);
  const logout = () => {
    sessionStorage.removeItem("token");
    setJWT(null);
    setUser(null);
    navigate("/Login");
  };

  return { login, signup, isLogged, user, logout ,state, isJWTLoading};
}
