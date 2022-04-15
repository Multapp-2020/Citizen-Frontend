import React, { Component, Fragment, useState, useEffect } from "react";
import {Button, Avatar, List, ListItemIcon, ListItem, ListItemText, CircularProgress, Container, Typography, Grid, Divider, Tooltip, Fab, createMuiTheme} from "@material-ui/core";
import { Email, Home, Phone, Fingerprint, Event, Wc, LocationCity, LocationOn, DriveEta, Edit } from "@material-ui/icons";
import CambiarContrasena from "../CambiarContrasena/CambiarContrasena";
import { connect } from "react-redux";
import { abrirDialogCambiarContrasena, cerrarDialogCambiarContrasena } from "../../store/actions/cambiarContrasena";
import { cargarPerfil } from "../../store/actions/perfil";
import Notifier from "../Notifier/Notifier";
import CrearUsuario from "../CrearUsuario/CrearUsuario";
import { abrirDialogEditarPerfil, cerrarDialogEditarPerfil, addPatente } from "../../store/actions/editarUsuario";
import { cargarUsuario } from "../../store/actions/usuario";

const Perfil = props =>  {

    
    

    //componentDidMount = async () => {

        // fetchMyAPI()

        /* async () => {
            try {
                
                } catch (e) {
                console.error(e);
            }
        } */

        /* await this.props.cargarPerfil();
        const id = localStorage.getItem("uid");
        await this.props.cargarUsuario(id); */
      
        //fetchMyAPI(this);

        /* if (this.props.datos !== null){
            const id = localStorage.getItem("uid");
            this.props.cargarUsuario(id);
            this.props.cargarPerfil();
        } else {
            this.props.cargarPerfil();
        } */
        // setCargando(true);
        

        // this.props.cargarPerfil();

        // setCargando(false);
        /* const id = localStorage.getItem("uid");
        this.props.cargarUsuario(id); */
    //}

    

    useEffect(() => {
        fetchMyAPI();
    }, []);

    useEffect(() => {
        fetchMyAPI();
    }, [props.editado]);

   

    async function fetchMyAPI() {
        await props.cargarPerfil();
        const id = localStorage.getItem("uid");
        await props.cargarUsuario(id);
    }

    const theme = createMuiTheme();

    const handleEditClick = () => {
        props.abrirDialogEditarPerfil();
        props.addPatente(props.usuario.patentes);
    }

    return (
        <Container>
            {props.cargando ? <CircularProgress /> : null}
            {!props.cargando && !props.error ?
                <Fragment>
                    <Grid container={true} spacing={2}>
                        <Grid item={true} xs={12}>
                            <Avatar style={{width: "200px", height: "200px"}} src={props.fotoUsuario} alt={props.usuario.nombre} />
                        </Grid>
                        <Grid item={true} xs={12} style={{verticalAlign: "center"}}>
                            <Typography variant="h2">
                                {props.usuario.nombre}
                            </Typography>
                            {/* <Typography variant="h4">{props.datos.rol}</Typography> */}
                        </Grid>
                        <Grid item={true} xs={6}>
                            <List>
                                <ListItem>
                                    <ListItemIcon>
                                        <Email />
                                    </ListItemIcon>
                                    <ListItemText primary="Correo electrónico" secondary={props.usuario.email} />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemIcon>
                                        <Fingerprint />
                                    </ListItemIcon>
                                    <ListItemText primary="DNI" secondary={props.usuario.dni} />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemIcon>
                                        <Event />
                                    </ListItemIcon>
                                    <ListItemText primary="Fecha de nacimiento" secondary={props.usuario.fechaNacimiento} />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemIcon>
                                        <Wc />
                                    </ListItemIcon>
                                    <ListItemText primary="Sexo" secondary={props.usuario.sexo} />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemIcon>
                                        <DriveEta />
                                    </ListItemIcon>
                                    <ListItemText primary="Patentes" secondary={props.usuario.patentes} />
                                </ListItem>
                                <Divider />
                            </List>
                        </Grid>
                        <Grid item={true} xs={6}>
                            <List>
                                <ListItem>
                                    <ListItemIcon>
                                        <Phone />
                                    </ListItemIcon>
                                    <ListItemText primary="Teléfono" secondary={props.usuario.telefono} />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemIcon>
                                        <Home />
                                    </ListItemIcon>
                                    <ListItemText primary="Dirección" secondary={props.usuario.direccion} />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemIcon>
                                        <LocationCity />
                                    </ListItemIcon>
                                    <ListItemText primary="Localidad" secondary={props.usuario.localidad} />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemIcon>
                                        <LocationOn />
                                    </ListItemIcon>
                                    <ListItemText primary="Provincia" secondary={props.usuario.provincia} />
                                </ListItem>
                                <Divider />
                            </List>
                        </Grid>
                        <Grid item={true} xs={12}>
                            <Button variant="contained" color="primary" onClick={props.abrirDialogCambiarContrasena}>Cambiar contraseña</Button>
                        </Grid>
                    </Grid>
                    <CambiarContrasena open={props.mostrarDialog} onClose={props.cerrarDialogCambiarContrasena} />
                    <Tooltip title="Editar datos" placement="left" arrow>
                        <Fab color="primary" onClick={handleEditClick} style={{position: "fixed", bottom: theme.spacing(5), right: theme.spacing(5)}}>
                            <Edit />
                        </Fab>
                    </Tooltip>
                    <CrearUsuario open={props.mostrarDialogEditarPerfil} onClose={props.cerrarDialogEditarPerfil} editar={true}/>
                </Fragment>
            : null}
            <Notifier />
        </Container>
    );
    
}

const mapStateToProps = state => {
    return {
        id: "",
        datos: state.perfil.datos,
        foto: state.perfil.foto,
        cargando: state.usuario.cargando,
        error: state.perfil.error,
        textoDeError: state.perfil.textoDeError,
        mostrarDialog: state.cambiarContrasena.mostrarDialog,
        mostrarDialogEditarPerfil: state.editarUsuario.mostrarDialogEditarPerfil,
        usuario: state.usuario.usuario,
        fotoUsuario: state.usuario.fotoUsuario,
        editado: state.editarUsuario.editado,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        cargarPerfil: () => dispatch(cargarPerfil()),
        abrirDialogCambiarContrasena: () => dispatch(abrirDialogCambiarContrasena()),
        cerrarDialogCambiarContrasena: () => dispatch(cerrarDialogCambiarContrasena()),
        abrirDialogEditarPerfil: () => {dispatch(abrirDialogEditarPerfil())},
        cerrarDialogEditarPerfil: () => {dispatch(cerrarDialogEditarPerfil())},
        addPatente: (listaPatentes) => {dispatch(addPatente(listaPatentes))},
        cargarUsuario: (id) => {dispatch(cargarUsuario(id))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Perfil);