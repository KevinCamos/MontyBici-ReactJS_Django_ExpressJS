import * as React from "react";

import { Tabs, Tab, Box } from "@mui/material";
import PedalBikeIcon from "@mui/icons-material/PedalBike";

import useBike from "../../hooks/useBike";
import ObtainBike from "../Buttons/ObtainBike";
import {TabPanel,a11yProps} from "../Tab/Tab";

// https://mui.com/components/tabs/


export default function BasicTabs({ points }) {
  const { statusBike, handleChange, value } = useBike();

  const response = {
    secondary: "Esta bicicleta se encuentra inhabilitada temporalmente",
    disabled: "En este punto no hay ninguna bicicleta aparcada",
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          {points.map((point, index) => (
            <Tab
              label={point.bike ? (point.bike.active ? "Libre" : "Inhabilitada") : "-  "}
              icon={<PedalBikeIcon fontSize="large" color={statusBike(point.bike)} />}
              {...a11yProps(index)}
              key={"tab" + index}
            />
          ))}
        </Tabs>
      </Box>

      {points.map((point, index) => (
        <TabPanel value={value} index={index} key={"tabPanel" + index}>
          {point.bike ? point.bike.active ? <ObtainBike id_point={point.id} /> : response["secondary"] : response["disabled"]}
        </TabPanel>
      ))}
    </Box>
  );
}
