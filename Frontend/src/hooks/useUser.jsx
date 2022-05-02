import { useCallback, useContext, useState,useEffect} from 'react';

import { useNavigate } from 'react-router-dom';

import UserContext from '../context/UserContext';

import userServices from '../services/UserServices';

const useUser = () => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    loading: false,
    error: false,
    errorPassword: false
  });
  
  const [isAdmin, setIsAdmin] = useState(false);
  const [isJWTAdminLoading, setIsJWTAdminLoading] = useState(true);
  const [isCheckingAdmin, setIsCheckingAdmin] = useState(false);
  const [isInterval, setIsInterval] = useState(false);

  const { jwt, setJWT, user, setUser, isJWTLoading, isRegisters,amount, setAmount } =
    useContext(UserContext);

  const deleteUserOrError = (error) => {
    setState({ loading: false, error: true, errorPassword: false });
    setUser(null);
    setJWT(null);
    sessionStorage.removeItem('token');
  };
  const saveUser = (dataUser) => {
    sessionStorage.setItem('token', dataUser.token);
    setJWT(sessionStorage.token);
    setUser(dataUser);
  };
  const login = useCallback(
    (data) => {
      setState({ loading: true, error: false });
      userServices
        .login({ user: data })
        .then((response) => {
          saveUser(response.data.user);
          navigate('/stations');

        })
        .catch((error) => {
          deleteUserOrError(error);
        });
    },
    [setJWT, setUser]
  );
  const loginAdmin = useCallback(
    (data) => {
      setState({ loading: true, error: false });
      data.is_staff = true;
      userServices
        .login({ user: data })
        .then((response) => {
          saveUser(response.data.user, true);
          navigate('/admin-panel');
          
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
        setState({ loading: false, error: false, errorPassword: true });
      } else {
        setState({ loading: true, error: false, errorPassword: false });
        userServices
          .register({ user: data })
          .then((response) => {
            saveUser(response.data.user);
            navigate('/stations');
          })
          .catch((error) => {
            deleteUserOrError(error);
          });
      }
    },
    [setJWT, setUser, setState]
  );
  const checkAdmin = useCallback(() => {
    setIsJWTAdminLoading(true);
    userServices
      .checkAdmin()
      .then((data) => {
        setIsAdmin(true);
        saveUser(data.data.user);
        setIsJWTAdminLoading(false);

      })
      .catch(() => {
        setIsJWTAdminLoading(false);
        deleteUserOrError();
        setIsAdmin(false);
      });
  }, [setJWT, setUser]);

  const isLogged = Boolean(jwt) && Boolean(user);

  const logout = useCallback(() => {
    deleteUserOrError();
    navigate('/login');
  }, [setJWT, setUser, navigate]);

  const calculateAmount= (amount, data_get)=>{
    return (parseFloat(amount)- ((Date.now()-new Date((data_get)).getTime())/1000*0.0001)).toFixed(3)
  }

  useEffect(() => {
    if(user?.profile?.registers&& !isInterval ){
      setIsInterval(true)
      setAmount(calculateAmount(user?.profile?.credit.amount, user?.profile?.registers.data_get))

      setInterval(function () {

        if(user?.profile?.registers){
          setAmount(calculateAmount(user?.profile?.credit.amount, user?.profile?.registers.data_get))
        }
      }, 10000);
    }else if(!isInterval){
      setAmount(user?.profile?.credit?.amount)
    }
  }, [user]);

 
  
  return {
    login,
    loginAdmin,
    signup,
    isLogged,
    user,
    logout,
    state,
    isJWTLoading,
    isJWTAdminLoading,
    isRegisters,
    checkAdmin,
    isAdmin,
    isCheckingAdmin,
    setIsCheckingAdmin,
    amount
  };
};


export default useUser;
