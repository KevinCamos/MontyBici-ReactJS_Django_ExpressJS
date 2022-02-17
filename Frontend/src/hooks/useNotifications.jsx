import { useEffect, useState, useContext, useCallback } from 'react';
import { useSnackbar } from 'notistack';
import notificationsService from '../services/NotificationService';
import NotificationsContext from '../context/NotificationsContext';

const useNotifications = () => {
  const { reasons, setReasons, open, setOpen } =
    useContext(NotificationsContext);
  const [isLoading, setIsLoading] = useState(false);
  const [valueReason, setValueReason] = useState(1);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(async () => {
    setIsLoading(true);
    if (reasons.length === 0) {
      notificationsService
        .getReasons()
        .then((data) => {
          setReasons(data.data.results);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  }, []);
  const sendNotification = useCallback((data) => {
    notificationsService
      .sendNotification(data)
      .then(() => {
        enqueueSnackbar(
          'Gracias por tu incidencia, intentaremos resolverla con la mayor brevedad posible.',
          { variant: 'success' }
        );
        setOpen(false);
      })
      .catch((error) => {
        enqueueSnackbar('Ha habido algún error enviando el mensaje.', {
          variant: 'error'
        });

        console.log(error);
      });
  }, []);

  return {
    reasons,
    isLoading,
    valueReason,
    setValueReason,
    sendNotification,
    enqueueSnackbar,
    open,
    setOpen
  };
};
export default useNotifications;
