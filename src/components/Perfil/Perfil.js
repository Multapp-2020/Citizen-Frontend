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

class Perfil extends Component {

    

    componentDidMount = () => {
        /* if (this.props.datos !== null){
            const id = localStorage.getItem("uid");
            this.props.cargarUsuario(id);
            this.props.cargarPerfil();
        } else {
            this.props.cargarPerfil();
        } */
        // setCargando(true);
        this.props.cargarPerfil();
        const id = localStorage.getItem("uid");
        this.props.cargarUsuario(id);

        // this.props.cargarPerfil();

        // setCargando(false);
        /* const id = localStorage.getItem("uid");
        this.props.cargarUsuario(id); */
    }

    /* useEffect(() => {
        const id = localStorage.getItem("uid");
        this.props.cargarUsuario(id);
    }, [this.props.mostrarDialog]); */

    render() {

        const theme = createMuiTheme();

        const handleEditClick = () => {
            this.props.abrirDialogEditarPerfil();
            this.props.addPatente(this.props.usuario.patentes);
        }

        console.log('PROPS DE PERFIL.JS');
        console.log(this.props);

        return (
            <Container>
                {this.props.cargando ? <CircularProgress /> : null}
                {!this.props.cargando && !this.props.error ?
                    <Fragment>
                        <Grid container={true} spacing={2}>
                            <Grid item={true} xs={12}>
                                <Avatar style={{width: "200px", height: "200px"}} src={this.props.fotoUsuario} alt={this.props.usuario.nombre} />
                            </Grid>
                            <Grid item={true} xs={12} style={{verticalAlign: "center"}}>
                                <Typography variant="h2">
                                    {this.props.usuario.nombre}
                                </Typography>
                                {/* <Typography variant="h4">{this.props.datos.rol}</Typography> */}
                            </Grid>
                            <Grid item={true} xs={6}>
                                <List>
                                    <ListItem>
                                        <ListItemIcon>
                                            <Email />
                                        </ListItemIcon>
                                        <ListItemText primary="Correo electrónico" secondary={this.props.usuario.email} />
                                    </ListItem>
                                    <Divider />
                                    <ListItem>
                                        <ListItemIcon>
                                            <Fingerprint />
                                        </ListItemIcon>
                                        <ListItemText primary="DNI" secondary={this.props.usuario.dni} />
                                    </ListItem>
                                    <Divider />
                                    <ListItem>
                                        <ListItemIcon>
                                            <Event />
                                        </ListItemIcon>
                                        <ListItemText primary="Fecha de nacimiento" secondary={this.props.usuario.fechaNacimiento} />
                                    </ListItem>
                                    <Divider />
                                    <ListItem>
                                        <ListItemIcon>
                                            <Wc />
                                        </ListItemIcon>
                                        <ListItemText primary="Sexo" secondary={this.props.usuario.sexo} />
                                    </ListItem>
                                    <Divider />
                                    <ListItem>
                                        <ListItemIcon>
                                            <DriveEta />
                                        </ListItemIcon>
                                        <ListItemText primary="Patentes" secondary={this.props.usuario.patentes} />
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
                                        <ListItemText primary="Teléfono" secondary={this.props.usuario.telefono} />
                                    </ListItem>
                                    <Divider />
                                    <ListItem>
                                        <ListItemIcon>
                                            <Home />
                                        </ListItemIcon>
                                        <ListItemText primary="Dirección" secondary={this.props.datos.direccion} />
                                    </ListItem>
                                    <Divider />
                                    <ListItem>
                                        <ListItemIcon>
                                            <LocationCity />
                                        </ListItemIcon>
                                        <ListItemText primary="Localidad" secondary={this.props.usuario.localidad} />
                                    </ListItem>
                                    <Divider />
                                    <ListItem>
                                        <ListItemIcon>
                                            <LocationOn />
                                        </ListItemIcon>
                                        <ListItemText primary="Provincia" secondary={this.props.usuario.provincia} />
                                    </ListItem>
                                    <Divider />
                                </List>
                            </Grid>
                            <Grid item={true} xs={12}>
                                <Button variant="contained" color="primary" onClick={this.props.abrirDialogCambiarContrasena}>Cambiar contraseña</Button>
                            </Grid>
                        </Grid>
                        <CambiarContrasena open={this.props.mostrarDialog} onClose={this.props.cerrarDialogCambiarContrasena} />
                        <Tooltip title="Editar datos" placement="left" arrow>
                            <Fab color="primary" onClick={handleEditClick} style={{position: "fixed", bottom: theme.spacing(5), right: theme.spacing(5)}}>
                                <Edit />
                            </Fab>
                        </Tooltip>
                        <CrearUsuario open={this.props.mostrarDialogEditarPerfil} onClose={this.props.cerrarDialogEditarPerfil} editar={true}/>
                    </Fragment>
                : null}
                <Notifier />
            </Container>
        );
    };
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