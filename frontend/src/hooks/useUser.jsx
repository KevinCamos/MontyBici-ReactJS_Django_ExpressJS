// import UserContext from "context/UserContext";
import userServices from "../services/UserServices";
export default function useUser() {
  const onSubmit = (data) => {
      console.log("eh")
      alert("eh")
    userServices.postLogin(data)
      .then((data) => {
        console.log("eh");
      }).catch((error) => {
        console.log(error);
      });
  };

  return {onSubmit}
  
}