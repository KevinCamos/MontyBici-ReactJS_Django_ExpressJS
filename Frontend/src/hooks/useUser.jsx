import { useCallback, useContext, /* useState */ } from "react";
import { useNavigate } from "react-router-dom";

import UserContext from "../context/UserContext";

import userServices from "../services/UserServices";
export default  function  useUser() {
  let navigate = useNavigate();

  // const [state, setState] = useState({ loading: false, error: false });
  const { jwt, setJWT, user, setUser  } =  useContext(UserContext);

 

  const login = useCallback(
    (data) => {
      console.log({ user: data });
      userServices
        .login({ user: data })
        .then((data) => {
          let user = data.data.user;
          console.log(user);

          sessionStorage.setItem("token", user.token);
          setJWT(sessionStorage.token);
          setUser(user);
          navigate('/Stations')

        })
        .catch((error) => {
          sessionStorage.removeItem("token");

          console.log(error);
        });
    },
    [ setJWT, setUser]
  );
const isLogged = ( Boolean(jwt)&&Boolean(user))
const logout = () => {
  sessionStorage.removeItem("token")
  setJWT(null)
  setUser(null)
  navigate('/Login')

}

  return { login, isLogged, user, logout };
}
