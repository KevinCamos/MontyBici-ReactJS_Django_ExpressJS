import * as React from "react";
import { Box, Card, CardContent, Typography, Paper, Grid } from "@mui/material";

import PedalBikeIcon from "@mui/icons-material/PedalBike";

export default function SuspendeStationCard() {
  return (
    <>
      {Array.from(Array(4)).map((_, index) => (
        <Grid item xs={2} sm={4} md={4} key={index}>
          <Card sx={{ display: "flex"}}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography component="div" variant="h5">
                  {` Loading... `}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  {` Loading... `}
                </Typography>
              </CardContent>
              <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
                {Array.from(Array(4)).map((_, index) => (
                  <PedalBikeIcon key={"PedalBikeIcon"+index}/>
                ))}
              </Box>
            </Box>
            <Paper sx={{ width: 151 }} elevation={0} />
          </Card>
        </Grid>
      ))}
    </>
  );
}
