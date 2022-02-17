import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Box, Toolbar, Avatar, IconButton, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { MoveToInbox, Mail } from "@mui/icons-material";
import { Outlet, Link } from "react-router-dom";
import useUser from "../../../hooks/useUser";
import AdminContext from "../../../context/Admin/AdminContext";

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const { user } = useUser();
  const { totalNotifications,isLogged,setIsLogged } = useContext(AdminContext);
  if (!isLogged) setIsLogged(true)



  const drawer = (
    <div>
      {user && <><span>{user.username.toUpperCase()}</span>
        <IconButton sx={{ p: 0 }}>
          <Avatar alt={user.username.toUpperCase()} title={user.username} src={`https://avatars.dicebear.com/api/avataaars/${user.username}.svg`} />
        </IconButton></>
      }
      <Toolbar />
      <Divider />
      <List>
        {[ "Notifications","Stations", "Points", "Bikes"].map((text, index) => (
          <Link to={"/admin-panel/" + text.toLowerCase()} style={{ textDecoration: 'none', color: "white" }} key={text}>
            <ListItem button >

              <ListItemIcon>
                {index % 2 === 0 ? <MoveToInbox /> : <Mail />}
              </ListItemIcon>
              <ListItemText primary={text==="Notifications"?`${totalNotifications} Notifications` :text} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
    </div>
  );
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders">
       
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth
              }
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Outlet />
      </Box>
    </>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func
};

export default ResponsiveDrawer;
