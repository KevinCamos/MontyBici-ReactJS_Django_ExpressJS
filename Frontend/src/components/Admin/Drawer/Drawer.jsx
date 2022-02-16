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
  // const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useUser();
  const { totalNotifications,isLogged,setIsLogged } = useContext(AdminContext);
  if (!isLogged) setIsLogged(true)


  console.log(totalNotifications)


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

  // const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          {/* <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth
              }
            }}>

            {drawer}
          </Drawer> */}
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
