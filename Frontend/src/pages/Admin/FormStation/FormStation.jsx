import React, { useState, useEffect } from "react";
import { Button, CssBaseline, TextField, Box, Typography, Container, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import useAdminStation from "../../../hooks/Admin/useAdminStation";
const FormStation = () => {
    const { saveStation, totalPoints, totalBikes, selectedImage, setSelectedImage, imageUrl, handleChangePoints, handleChangeBikes } = useAdminStation()

    // console.log(imageUrl, selectedImage)

    const { register, handleSubmit, formState: { errors } } = useForm();
    // const onSubmit = data => console.log(data);
    // console.log(errors);

    return (
        <>
            <Container component="main" maxWidth="m">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                    component="form" onSubmit={handleSubmit(saveStation)}
                >
                    <Typography variant="h6" gutterBottom>
                        CREA UNA NUEVA ESTACIÓN
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="name"
                                label="Nombre de la MontyEstación"
                                fullWidth
                                variant="standard"
                                {...register("name", { required: true, maxLength: 20, pattern: "//^[a-z ,.'-]+$/i/i" })}
                            />
                            {errors.name && <small className="error">El nombre de la MontyEstación es requerido</small>}
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="direction"
                                label="Dirección de la MontyEstación"
                                fullWidth
                                variant="standard"
                                {...register("direction", { required: true, maxLength: 40, pattern: "//^[a-z ,.'-]+$/i/i" })}
                            />
                            {errors.direction && <small className="error">El dirección de la MontyEstación es requerido</small>}

                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="location"
                                label="Pueblo/ciudad de la MontyEstación"
                                fullWidth
                                variant="standard"
                                {...register("location", { required: true, maxLength: 100, pattern: "//^[a-z ,.'-]+$/i/i" })}
                            />
                            {errors.location && <small className="error">La localización de la MontyEstación es requerido</small>}

                        </Grid>

                        {/* <Grid item xs={12} md={6}>
                            <Button variant="contained" component="label" fullWidth>
                                Imagen de la MontyEstación<input {...register("img")} type="file" accept="image/*" hidden />
                            </Button>
                        </Grid> */}

                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <InputLabel id="points">MontyPoints</InputLabel>
                                <Select
                                    labelId="points"
                                    id="points"
                                    defaultValue={totalPoints}
                                    label="Points"
                                    onChange={handleChangePoints}
                                    {...register("points")}
                                >
                                    {Array.from(Array(8)).map((_, index) => (
                                        <MenuItem value={index} key={index}>{index} Points</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <input
                                accept="image/*"
                                type="file"
                                id="select-image"
                                style={{ display: 'none' }}
                                onChange={e => setSelectedImage(e.target.files[0])}

                            />
                            <label htmlFor="select-image">
                                <Button variant="contained" color="primary" component="span">
                                    Subir una imagen de la montyestación
                                </Button>
                            </label>
                            {imageUrl && selectedImage && (
                                <Box mt={2} textAlign="center">
                                    <div>Previsualizar:</div>
                                    <img src={imageUrl} alt={selectedImage.name} height="100px" />
                                </Box>
                            )}
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <InputLabel id="bikes">MontyBikeOn</InputLabel>
                                <Select
                                    labelId="bikes"
                                    id="bikes"
                                    defaultValue={totalBikes}
                                    label="Bikes"
                                    onChange={handleChangeBikes}
                                    {...register("bikes")}

                                >
                                    {Array.from(Array(8)).map((_, index) => (
                                        <MenuItem value={index} key={index}>{index} Bikes</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        CREAR MONTYESTACIÓN
                    </Button>
                </Box>
            </Container>
        </>
    );
}

export default FormStation