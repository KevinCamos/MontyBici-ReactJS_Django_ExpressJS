import React from "react";

import { Avatar, Button, CssBaseline, TextField, Box, Typography, Container, Grid } from "@mui/material";
import { Link } from "react-router-dom";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
// import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useForm } from "react-hook-form";

import "./Login.css";
//   import people from "assets/images/people_SVG.svg";
import useUser from "../../hooks/useUser";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login, state } = useUser();
  // const theme = createTheme();
  console.log(errors);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit(login)} noValidate sx={{ mt: 1 }}>
          {state.loading ? (
            <span className="load">Cargando datos del usuario...</span>
          ) : (
            <>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
              />
              {errors.email && <small className="error">El email es requerido</small>}
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                {...register("password", { required: true, maxLength: 12 })}
              />
              {errors.password && <div className="error">El password es requerido</div>}
              {state.error && <span className="error">¿Has escrito bien tu email y password?</span>}

              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign In
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link variant="body2" to={"/Register"}>
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </>
          )}
        </Box>
      </Box>
    </Container>
  );
}
