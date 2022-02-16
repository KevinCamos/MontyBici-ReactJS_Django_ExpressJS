import { useEffect, useState, useContext, useCallback } from "react";
import notificationsService from "../../services/NotificationService";
import AdminContext from "../../context/Admin/AdminContext";
import { useSnackbar } from 'notistack';

const useAdminNotifications = () => {

    const { totalNotifications, setTotalNotifications,notifications, setNotifications } = useContext(AdminContext);
    const { enqueueSnackbar } = useSnackbar();

   console.log(notifications)
    const checkNotification = useCallback(
        (data) => {
            console.log(data)
            // notificationsService.checkNotification(data)
            //     .then((data) => {
            //         enqueueSnackbar('Gracias por tu incidencia, intentaremos resolverla con la mayor brevedad posible.', { variant: 'success' })
            //         setOpen(false)

            //         console.log(data);
            //     })
            //     .catch((error) => {
            //         enqueueSnackbar('Ha habido algún error enviando el mensaje.', { variant: 'error' })

            //         console.log(error);
            //     });
        },
        []
    );



    return {notifications, checkNotification };
}
export default useAdminNotifications