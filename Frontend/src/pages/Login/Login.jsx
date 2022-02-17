import React from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
  Grid
} from '@mui/material';
import { Link } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useForm } from 'react-hook-form';
import useUser from '../../hooks/useUser';
import Loading from '../../components/Templates-Suspense/Loading';

function Login({ admin = false }) {
  const messageError = admin
    ? '¿Tus credenciales son correctas para entrar?'
    : '¿Has escrito bien tu email y password?';
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const { login, loginAdmin, state } = useUser();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in {admin && <span>With Admin</span>}
        </Typography>
        <Box
          component="form"
          onSubmit={admin ? handleSubmit(loginAdmin) : handleSubmit(login)}
          noValidate
          sx={{ mt: 1 }}
        >
          {state.loading ? (
            <Loading text="Cargando datos del usuario..." />
          ) : (
            <>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    {...register('email', {
                      required: true,
                      pattern: /^\S+@\S+$/i
                    })}
                  />
                  {errors.email && (
                    <small className="error">El email es requerido</small>
                  )}
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
                    {...register('password', {
                      required: true,
                      max: 16,
                      min: 8,
                      maxLength: 16
                    })}
                  />
                  {errors.password && (
                    <div className="error">El password es requerido</div>
                  )}
                  {state.error && <span className="error">{messageError}</span>}
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              {!admin && (
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link variant="body2" to="/Register">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              )}
            </>
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
