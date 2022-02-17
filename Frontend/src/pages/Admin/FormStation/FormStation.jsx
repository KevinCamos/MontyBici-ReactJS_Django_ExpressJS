import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

import {
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@mui/material';
import { useForm } from 'react-hook-form';

import useAdminStation from '../../../hooks/Admin/useAdminStation';
import useOnlyStation from '../../../hooks/useOnlyStation';
import Loading from '../../../components/Templates-Suspense/Loading';

function FormStation() {
  const { slug } = useParams();
  const {
    saveStation,
    updateStation,
    totalPoints,
    totalBikes,
    selectedImage,
    setSelectedImage,
    imageUrl,
    loading,
    error
  } = useAdminStation();
  const { oneStation, isLoading } = useOnlyStation({ slug });
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  // if(oneStation)setImageUrl(oneStation.img)

  if (loading || (slug && isLoading)) {
    return (
      <>
        <Helmet>
          <title>Cargando...</title>
        </Helmet>
        <Loading />
      </>
    );
  }
  return (
    <>
      <Helmet>
        <title>Crea una estación</title>
      </Helmet>
      <Container component="main" maxWidth="m">
        <CssBaseline />
        <Box
          id={!slug ? 'formcreate' : slug}
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
          component="form"
          onSubmit={
            !slug ? handleSubmit(saveStation) : handleSubmit(updateStation)
          }
        >
          <Typography variant="h6" gutterBottom>
            {!slug ? (
              <span>CREA UNA NUEVA ESTACIÓN</span>
            ) : (
              <span>MODIFICA LA ESTACIÓN {oneStation.name}</span>
            )}
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                id="name"
                label="Nombre de la MontyEstación"
                defaultValue={
                  oneStation ? (oneStation.name ? oneStation.name : '') : ''
                }
                fullWidth
                variant="standard"
                {...register('name', {
                  required: true,
                  maxLength: 20,
                  pattern: "//^[a-z ,.'-]+$/i/i"
                })}
              />
              {errors.name && (
                <small className="error">
                  El nombre de la MontyEstación es requerido
                </small>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="direction"
                label="Dirección de la MontyEstación"
                defaultValue={
                  oneStation
                    ? oneStation.direction
                      ? oneStation.direction
                      : ''
                    : ''
                }
                fullWidth
                variant="standard"
                {...register('direction', {
                  required: true,
                  maxLength: 40,
                  pattern: "//^[a-z ,.'-]+$/i/i"
                })}
              />
              {errors.direction && (
                <small className="error">
                  El dirección de la MontyEstación es requerido
                </small>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="location"
                label="Pueblo/ciudad de la MontyEstación"
                fullWidth
                defaultValue={
                  oneStation
                    ? oneStation.location
                      ? oneStation.location
                      : ''
                    : ''
                }
                variant="standard"
                {...register('location', {
                  required: true,
                  maxLength: 100,
                  pattern: "//^[a-z ,.'-]+$/i/i"
                })}
              />
              {errors.location && (
                <small className="error">
                  La localización de la MontyEstación es requerido
                </small>
              )}
            </Grid>

            {!slug && (
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="points">MontyPoints</InputLabel>
                  <Select
                    labelId="points"
                    id="points"
                    defaultValue={totalPoints}
                    label="Points"
                    {...register('points')}
                  >
                    {Array.from(Array(8)).map((_, index) => (
                      <MenuItem value={index} key={index}>
                        {index} Points
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}
            <Grid item xs={12} md={6}>
              <input
                accept="image/*"
                type="file"
                id="select-image"
                style={{ display: 'none' }}
                onChange={(e) => setSelectedImage(e.target.files[0])}
              />
              <label htmlFor="select-image">
                <Button variant="contained" color="primary" component="span">
                  Subir una imagen de la montyestación
                </Button>
              </label>
              {imageUrl && selectedImage && (
                <Box mt={2} textAlign="center">
                  <div>Previsualizar:</div>
                  <img src={imageUrl} alt={selectedImage.name} height="150px" />
                </Box>
              )}
              {!(imageUrl && selectedImage) && oneStation && oneStation.img && (
                <Box mt={2} textAlign="center">
                  <div>Previsualizar:</div>
                  <img
                    src={oneStation.img}
                    alt={oneStation.name}
                    height="150px"
                  />
                </Box>
              )}
            </Grid>
            {!slug && (
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="bikes">MontyBikeOn</InputLabel>
                  <Select
                    labelId="bikes"
                    id="bikes"
                    defaultValue={totalBikes}
                    label="Bikes"
                    {...register('bikes')}
                  >
                    {Array.from(Array(8)).map((_, index) => (
                      <MenuItem value={index} key={index}>
                        {index} Bikes
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {!slug ? (
              <span>CREAR MONTYESTACIÓN</span>
            ) : (
              <span>MODIFICAR MONTYESTACIÓN</span>
            )}
          </Button>
          {error && <span className="error">{error}</span>}
        </Box>
      </Container>
    </>
  );
}

export default FormStation;
