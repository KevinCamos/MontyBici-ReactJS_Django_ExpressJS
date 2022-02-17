import * as React from 'react';
import { CssBaseline, Box, Container, CardMedia } from '@mui/material';

function NotFound() {
  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <CardMedia
          component="img"
          height="900"
          image="https://onlinezebra.com/wp-content/uploads/2019/01/error-404-not-found.jpg"
          alt="Paella dish"
        />
      </Box>
    </Container>
  );
}
export default NotFound;
