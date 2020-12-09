import React, { Component, Fragment } from "react";
import {Button, Avatar, List, ListItemIcon, ListItem, ListItemText, CircularProgress, Container, Typography, Grid, Divider, Tooltip, Fab, createMuiTheme} from "@material-ui/core";
import { Email, Home, Phone, Fingerprint, Event, Wc, LocationCity, LocationOn, DriveEta, Edit } from "@material-ui/icons";
import CambiarContrasena from "../CambiarContrasena/CambiarContrasena";
import { connect } from "react-redux";
import { abrirDialogCambiarContrasena, cerrarDialogCambiarContrasena } from "../../store/actions/cambiarContrasena";
import { cargarPerfil } from "../../store/actions/perfil";
import Notifier from "../Notifier/Notifier";
//import EditarUsuario from "../EditarUsuario/EditarUsuario";
import CrearUsuario from "../CrearUsuario/CrearUsuario";
import { abrirDialogEditarPerfil, cerrarDialogEditarPerfil } from "../../store/actions/editarUsuario";

class Perfil extends Component {
    componentDidMount = () => {
        this.props.cargarPerfil();
    }

    render() {

        console.log('SE VAN A LOGUEAR LAS PROPS');
        console.log(this.props);

        const theme = createMuiTheme();
        return (
            <Container>
                {this.props.cargando ? <CircularProgress /> : null}
                {!this.props.cargando && !this.props.error ?
                    <Fragment>
                        <Grid container={true} spacing={2}>
                            <Grid item={true} xs={12}>
                                <Avatar style={{width: "200px", height: "200px"}} src={this.props.foto} alt={this.props.datos.nombre} />
                            </Grid>
                            <Grid item={true} xs={12} style={{verticalAlign: "center"}}>
                                <Typography variant="h2">
                                    {this.props.datos.nombre}
                                </Typography>
                                {/* <Typography variant="h4">{this.props.datos.rol}</Typography> */}
                            </Grid>
                            <Grid item={true} xs={6}>
                                <List>
                                    <ListItem>
                                        <ListItemIcon>
                                            <Email />
                                        </ListItemIcon>
                                        <ListItemText primary="Correo electrónico" secondary={this.props.datos.email} />
                                    </ListItem>
                                    <Divider />
                                    <ListItem>
                                        <ListItemIcon>
                                            <Fingerprint />
                                        </ListItemIcon>
                                        <ListItemText primary="DNI" secondary={this.props.datos.dni} />
                                    </ListItem>
                                    <Divider />
                                    <ListItem>
                                        <ListItemIcon>
                                            <Event />
                                        </ListItemIcon>
                                        <ListItemText primary="Fecha de nacimiento" secondary={this.props.datos.fechaNacimiento} />
                                    </ListItem>
                                    <Divider />
                                    <ListItem>
                                        <ListItemIcon>
                                            <Wc />
                                        </ListItemIcon>
                                        <ListItemText primary="Sexo" secondary={this.props.datos.sexo} />
                                    </ListItem>
                                    <Divider />
                                    <ListItem>
                                        <ListItemIcon>
                                            <DriveEta />
                                        </ListItemIcon>
                                        <ListItemText primary="Patentes" secondary={this.props.datos.patentes} />
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
                                        <ListItemText primary="Teléfono" secondary={this.props.datos.telefono} />
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
                                        <ListItemText primary="Localidad" secondary={this.props.datos.localidad} />
                                    </ListItem>
                                    <Divider />
                                    <ListItem>
                                        <ListItemIcon>
                                            <LocationOn />
                                        </ListItemIcon>
                                        <ListItemText primary="Provincia" secondary={this.props.datos.provincia} />
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
                            <Fab color="primary" onClick={this.props.abrirDialogEditarPerfil} style={{position: "fixed", bottom: theme.spacing(5), right: theme.spacing(5)}}>
                                <Edit />
                            </Fab>
                        </Tooltip>
                        {/* <EditarUsuario open={this.props.mostrarDialog} onClose={this.props.cerrarDialogEditarPerfil} editar={true} /> */}
                        <CrearUsuario open={this.props.mostrarDialogEditarPerfil} onClose={this.props.cerrarDialogEditarPerfil}/>
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
        cargando: state.perfil.cargando,
        error: state.perfil.error,
        textoDeError: state.perfil.textoDeError,
        mostrarDialog: state.cambiarContrasena.mostrarDialog,
        mostrarDialogEditarPerfil: state.editarUsuario.mostrarDialogEditarPerfil,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        cargarPerfil: () => dispatch(cargarPerfil()),
        abrirDialogCambiarContrasena: () => dispatch(abrirDialogCambiarContrasena()),
        cerrarDialogCambiarContrasena: () => dispatch(cerrarDialogCambiarContrasena()),
        abrirDialogEditarPerfil: () => {dispatch(abrirDialogEditarPerfil())},
        cerrarDialogEditarPerfil: () => {dispatch(cerrarDialogEditarPerfil())},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Perfil);