import React from "react";

import { Avatar, Button, CssBaseline, TextField, Box, Typography, Container, Grid } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link } from "react-router-dom";

import { useForm } from "react-hook-form";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import "./Register.css";
//   import people from "assets/images/people_SVG.svg";
import useUser from "../../hooks/useUser";

export default function Register() {
  const theme = createTheme();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, state } = useUser();
  console.log(errors);

  return (
    <ThemeProvider theme={theme}>
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(signup)} sx={{ mt: 3 }}>
            {state.loading ? (
              <span className="load">Registrando usuario...</span>
            ) : (
              <>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="given-name"
                      name="username"
                      required
                      fullWidth
                      id="username"
                      label="Username"
                      autoFocus
                      {...register("username", { required: true, max: 16, min: 4, maxLength: 100 })}
                    />
                    {errors.username && <small className="error">El nombre de usuario es requerido</small>}
                  </Grid>

                  <Grid item xs={12}>
                    <TextField required fullWidth id="email" label="Email Address" name="email" autoComplete="email" {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
                    {errors.email && <small className="error">El email es requerido</small>}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      {...register("password", { required: true, max: 16, min: 8, maxLength: 16 })}
                    />
                    {errors.password && <small className="error">El password es requerido</small>}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField required fullWidth name="password2" label="Repeat-Password" type="password" id="password2" {...register("password2")} />
                    {state.errorPassword && <small className="error">Debe repetir la misma contraseña</small>}
                  </Grid>
                </Grid>
                {state.error && <span className="error">Ha habido algún problema con el registro</span>}
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="#" variant="body2" to={"/Login"}>
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
