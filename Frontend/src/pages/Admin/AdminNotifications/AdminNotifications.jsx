import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useAdminNotifications from "../../../hooks/Admin/useAdminNotifications";
import { Grid, IconButton, Typography, Avatar, Tooltip } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function ControlledAccordions() {
  const [expanded, setExpanded] = React.useState(false);
  const { notifications, checkNotification } = useAdminNotifications()
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString() + "h"

  }
  return (
    <div>
      <br></br>

      {notifications.map((notification, index) => (
        <div key={`panel${index}`}>
          {/* <br/> */}
          <Accordion expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Grid item xs zeroMinWidth>
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                  <IconButton sx={{ p: 0 }}>
                    <Avatar alt={notification.notif_user.username.toUpperCase()} title={notification.notif_user.username} src={notification.notif_user.image} />
                  </IconButton>
                  <Typography variant={"string"} noWrap>
                    {notification.notif_user.username}
                  </Typography>
                </Typography>
              </Grid>

              <Grid item xs >
                <Typography sx={{ width: '33%', flexShrink: 0, m: 1 }} >
                  {formatDate(notification.created_at)}
                </Typography>
              </Grid>

              <Grid item xs >
                <Typography sx={{ color: 'text.secondary', m: 2 }}>
                  {notification.reason.reason}
                </Typography>
              </Grid>

            </AccordionSummary>
            <AccordionDetails >
              <Typography component={'div'}>
                <div align="left">
                  <b>Estación de recogia:</b><i>{notification.register.point_get.station.name}</i><br />
                  <b>Punto de esta estación:</b><i>{notification.register.point_get.id}</i><br />
                  <b>Fecha:</b><i>{formatDate(notification.register.data_get)}</i><br />
                  {notification.register.point_return ?
                    <>
                      <b>Estación de llegada:</b><i>{notification.register.point_return.station.name}</i><br />
                      <b>Punto de esta estación:</b><i>{notification.register.point_return.id}</i><br />
                      <b>Fecha:</b><i>{formatDate(notification.register.data_return)}</i><br />
                    </>
                    :
                    <b><i>No ha devuelto la bici</i></b>
                  }
                  <br />
                  <b>Mensaje:</b><i> {notification.message}</i>
                  <br />

                </div>
                <FormControlLabel
                  control={
                    notification.checked
                      ? <Checkbox onChange={e => checkNotification(e.target.checked, notification.id)} name="checked" defaultChecked />
                      : <Checkbox onChange={e => checkNotification(e.target.checked, notification.id)} name="checked" />


                  }
                  label="Marcar como leído"
                />
              </Typography>

            </AccordionDetails>
          </Accordion>
        </div>
      ))}

    </div>
  );
}
