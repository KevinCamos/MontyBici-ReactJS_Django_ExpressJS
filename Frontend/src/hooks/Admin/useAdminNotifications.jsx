import { useContext, useCallback } from 'react';
import { useSnackbar } from 'notistack';
import notificationsService from '../../services/NotificationService';
import AdminContext from '../../context/Admin/AdminContext';

const useAdminNotifications = () => {
  const { totalNotifications, setTotalNotifications, notifications } =
    useContext(AdminContext);
  const { enqueueSnackbar } = useSnackbar();
  const checkNotification = useCallback(
    (checked, id) => {
      notificationsService
        .checkNotification({ checked }, id)
        .then(() => {
          const view = checked
            ? 'La incidencia se ha marcado como vista'
            : 'La incidencia se ha desmarcado para leerla solucionarla más tarde';
          enqueueSnackbar(view, { variant: 'success' });

          if (checked) setTotalNotifications(totalNotifications - 1);
          else setTotalNotifications(totalNotifications + 1);
        })
        .catch((error) => {
          enqueueSnackbar('Ha habido algún error en el servidor.', {
            variant: 'error'
          });
        });
    },
    [totalNotifications]
  );

  return { notifications, checkNotification };
};
export default useAdminNotifications;
