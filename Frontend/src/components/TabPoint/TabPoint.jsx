import * as React from "react";
import { Tabs, Tab, Box } from "@mui/material";
import useBike from "../../hooks/useBike";
import { TabPanel, a11yProps } from "../Tab/Tab";

import Home from "@mui/icons-material/Home";
import ReturnBike from "../Buttons/ReturnBike";


export default function TabPoint({ points }) {
  const { statusPoint, handleChange, value } = useBike();

  const response = {
    secondary: "Aquí ya hay una bicicleta",
    disabled: "Lo siento, este punto o slot está deshabilitado",
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          {points.map((point, index) => (
            <Tab
              label={point.active ? (point.bike ? "Ocupado" : "Libre") : "Deshabilitado"}
              icon={<Home fontSize="large" color={statusPoint(point)} />}
              {...a11yProps(index)}
              key={"tab" + index}
            />
          ))}
        </Tabs>
      </Box>

      {points.map((point, index) => (
        <TabPanel value={value} index={index} key={"tabPanel" + index}>
          {point.bike ? point.bike.active ? response["disabled"] : response["secondary"] : <ReturnBike id_point={point.id} />}
        </TabPanel>
      ))}
    </Box>
  );
}
