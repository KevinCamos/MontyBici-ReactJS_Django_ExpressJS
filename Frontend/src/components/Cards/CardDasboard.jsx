import * as React from "react";
import { CardActionArea, CardActions, Card, CardContent, CardMedia, Typography, Box, Button } from "@mui/material";
const CardDashboard = ({ icon, title, data, message }) => {

    return (
        <Box sx={{ display: 'inline-block', mx: 'px', transform: 'scale(0.8)', boxShadow: 2, width: 210}}>
            <Card variant="outlined" sx={{height:220}}>
                {icon}
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {title}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {data}
                    </Typography>
                    <br />
                    <Typography variant="body2">
                        {message}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
}
export default CardDashboard