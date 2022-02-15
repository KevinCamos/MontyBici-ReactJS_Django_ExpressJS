import { useEffect, useState, useContext } from "react";
import notificationsService from "../services/NotificationService";
import NotificationsContext from "../context/NotificationsContext";

const useNotifications = () => {

    const { reasons, setReasons } = useContext(NotificationsContext);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(
        async function () {
            setIsLoading(true);
            if (reasons.length === 0) {
                notificationsService.getReasons()
                    .then((data) => {
                        console.log(data)
                        setReasons(data.data.results)
                        setIsLoading(false);

                    }).catch((error) => {

                        setIsLoading(false);
                    });
            }
        },
        []
    )
    return { reasons, isLoading };
}
export default useNotifications