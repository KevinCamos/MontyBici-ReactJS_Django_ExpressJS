import { useEffect, useState, useContext, useCallback } from "react";
import notificationsService from "../../services/NotificationService";
import AdminContext from "../../context/Admin/AdminContext";
import { useSnackbar } from 'notistack';

const useAdminNotifications = () => {

    const { totalNotifications, setTotalNotifications, notifications, setNotifications } = useContext(AdminContext);
    const { enqueueSnackbar } = useSnackbar();
    console.log(totalNotifications)

    const checkNotification = useCallback(
        (checked, id) => {
            console.log(checked, id)
            notificationsService.checkNotification({ "checked": checked }, id)
                .then((data) => {
                    let view = checked ? "La incidencia se ha marcado como vista" : "La incidencia se ha desmarcado para leerla solucionarla más tarde"
                    enqueueSnackbar(view, { variant: 'success' })
                    console.log(totalNotifications)
                    
                    if (checked) setTotalNotifications(totalNotifications - 1)
                    else setTotalNotifications(totalNotifications + 1)
                    console.log(data);
                })
                .catch((error) => {
                    enqueueSnackbar('Ha habido algún error en el servidor.', { variant: 'error' })

                    console.log(error);
                });
        },
        []
    );



    return { notifications, checkNotification };
}
export default useAdminNotifications