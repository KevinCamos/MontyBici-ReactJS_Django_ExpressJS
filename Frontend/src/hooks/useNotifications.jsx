import { useEffect, useState, useContext, useCallback } from "react";
import notificationsService from "../services/NotificationService";
import NotificationsContext from "../context/NotificationsContext";
import { useSnackbar } from 'notistack';

const useNotifications = (id=null) => {

    const { reasons, setReasons, open, setOpen } = useContext(NotificationsContext);
    const [isLoading, setIsLoading] = useState(false);
    const [valueReason, setValueReason] = useState(1)
    const { enqueueSnackbar } = useSnackbar();

    console.log(id)
    useEffect(
        async function () {
            setIsLoading(true);
            if (reasons.length === 0) {
                notificationsService.getReasons()
                    .then((data) => {
                        setReasons(data.data.results)
                        setIsLoading(false);
                    }).catch((error) => {
                        setIsLoading(false);

                    });
            }
        },
        []
    )
    const sendNotification = useCallback(
        (data) => {
            data.id_register= id
            console.log(data)
            notificationsService.sendNotification(data)
                .then((data) => {
                    enqueueSnackbar('Gracias por tu incidencia, intentaremos resolverla con la mayor brevedad posible.', { variant: 'success' })
                    setOpen(false)

                    console.log(data);
                })
                .catch((error) => {
                    enqueueSnackbar('Ha habido algún error enviando el mensaje.', { variant: 'error' })

                    console.log(error);
                });
        },
        []
    );



    return { reasons, isLoading, valueReason, setValueReason, sendNotification, enqueueSnackbar, open,setOpen };
}
export default useNotifications