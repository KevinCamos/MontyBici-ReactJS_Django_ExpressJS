// import UserContext from "context/UserContext";
import userServices from "../services/UserServices";
export default function useUser() {
  const onSubmit = (data) => {
      console.log(data);

    userServices.postLogin(data)
      .then((data) => {
        console.log("data");

        console.log(data);
      }).catch((error) => {
        console.log(error);
      });
  };

  return {onSubmit}
  
}