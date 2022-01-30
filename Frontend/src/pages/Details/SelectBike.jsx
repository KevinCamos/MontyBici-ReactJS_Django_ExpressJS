import * as React from "react";

import PropTypes from "prop-types";
import {Tabs, Tab,Typography,Box } from "@mui/material";
import PedalBikeIcon from "@mui/icons-material/PedalBike";

import useBike from "../../hooks/useBike";


// https://mui.com/components/tabs/
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({ points }) {

    const { statusBike, handleChange, value } = useBike();

    const response = {

        "secondary": "Esta bicicleta se encuentra inhabilitada temporalmente",
        "disabled" : "En este punto no hay ninguna bicicleta aparcada"
      }

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          {points.map((point, index) => (
            <Tab
              label={point.bike ? (point.bike.active ? "Libre" : "Inhabilitada") : "-  "}
              icon={<PedalBikeIcon fontSize="large" color={statusBike(point.bike)}  />}
              {...a11yProps(index)}
              key={"tab" + index}
            />
          ))}
        </Tabs>
      </Box>

      {points.map((point, index) => (
        <TabPanel value={value} index={index} key={"tabPanel" + index}>
          {point.bike ? (point.bike.active ? "Poner aquí componente para coger la bici" : response["secondary"]) : response["disabled"]}
        </TabPanel>
      ))}
    </Box>
  );
}
