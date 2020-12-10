import React, { Component, Fragment } from "react";
import { Box, Container, Typography, Tabs, Tab, CircularProgress, List, ListItem, Divider, ListItemAvatar, Avatar, ListItemText, Fab, ListItemSecondaryAction, IconButton, createMuiTheme, Tooltip } from "@material-ui/core";
import { Add, Delete } from "@material-ui/icons";
import EditarUsuario from "../EditarUsuario/EditarUsuario";
import EliminarUsuario from "../EliminarUsuario/EliminarUsuario";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { cargarUsuarios } from "../../store/actions/usuarios";
import { withSnackbar } from "notistack";
import { setUsuarioAEliminar, abrirDialogEliminar, cerrarDialogEliminar } from "../../store/actions/eliminarUsuario";
import Notifier from "../Notifier/Notifier";
import { abrirDialogEditar, cerrarDialogEditar } from "../../store/actions/editarUsuario";

class Usuarios extends Component {
    state = {
        pestanaActual: 0,
    }

    componentDidMount = () => {
        this.props.cargarUsuarios();
    }

    // esta funcion fue copiada de la pagina de https://material-ui.com/components/tabs/#simple-tabs
    // porque importar TabPanel de @material-ui/lab NO ANDA
    TabPanel = (props) => {
        const { children, value, index, ...other } = props;
        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
                )}
            </div>
        );
    }

    // metodo para cambiar de pestañas
    tabChangeHandler = (event, newValue) => {
        this.setState({pestanaActual: newValue});
    }

    deleteUserHandler = (id, nombre) => {
        this.props.setUsuarioAEliminar(id, nombre);
        this.props.abrirDialogEliminar();
    }

    userSelectedHandler = (id) => {
        this.props.history.push("/usuarios/" + id);
    }

    render() {
        let inspectores = this.props.usuarios.filter(usuario => {
            return usuario.rol === "Inspector" ? true : false;
        }).map(inspector => (
            <Fragment>
                <ListItem key={inspector.id} button={true} onClick={() => this.userSelectedHandler(inspector.id)}>
                    <ListItemAvatar>
                        <Avatar alt={"Foto de " + inspector.nombre} src={inspector.foto} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={inspector.nombre}
                        secondary={inspector.email}
                    />
                    <ListItemSecondaryAction>
                        <IconButton onClick={() => this.deleteUserHandler(inspector.id, inspector.nombre)}>
                            <Delete />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                <Divider />
            </Fragment>
        ));

        let supervisores = this.props.usuarios.filter(usuario => {
            return usuario.rol === "Supervisor" ? true : false;
        }).map(supervisor => (
            <Fragment>
                <ListItem key={supervisor.id} button={true} onClick={() => this.userSelectedHandler(supervisor.id)}>
                    <ListItemAvatar>
                        <Avatar alt={"Foto de " + supervisor.nombre} src={supervisor.foto} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={supervisor.nombre}
                        secondary={supervisor.email}
                    />
                    <ListItemSecondaryAction>
                        <IconButton onClick={() => this.deleteUserHandler(supervisor.id, supervisor.nombre)}>
                            <Delete />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                <Divider />
            </Fragment>
        ));

        let administradores = this.props.usuarios.filter(usuario => {
            return usuario.rol === "Administrador" && usuario.id !== localStorage.getItem("uid") ? true : false;
        }).map(administrador => (
            <Fragment>
                <ListItem key={administrador.id} button={true} onClick={() => this.userSelectedHandler(administrador.id)}>
                    <ListItemAvatar>
                        <Avatar alt={"Foto de " + administrador.nombre} src={administrador.foto} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={administrador.nombre}
                        secondary={administrador.email}
                    />
                    <ListItemSecondaryAction>
                        <IconButton onClick={() => this.deleteUserHandler(administrador.id, administrador.nombre)}>
                            <Delete />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                <Divider />
            </Fragment>
        ));

        const theme = createMuiTheme();

        return (
            <Fragment>
                <Container maxWidth="lg" style={{minHeight: "100vh"}}>
                    <Tabs value={this.state.pestanaActual} centered={true} onChange={this.tabChangeHandler} indicatorColor="primary" textColor="primary">
                        <Tab label="Inspectores" />
                        <Tab label="Supervisores" />
                        <Tab label="Administradores" />
                    </Tabs>
                    <this.TabPanel value={this.state.pestanaActual} index={0}>
                        {this.props.cargando ? <CircularProgress /> : 
                            <List>
                                {inspectores.length !== 0 ? inspectores : "Aún no hay inspectores cargados"}
                            </List>
                        }
                    </this.TabPanel>
                    <this.TabPanel value={this.state.pestanaActual} index={1}>
                        {this.props.cargando ? <CircularProgress /> : 
                            <List>
                                {supervisores.length !== 0 ? supervisores : "Aún no hay supervisores cargados"}
                            </List>
                        }
                    </this.TabPanel>
                    <this.TabPanel value={this.state.pestanaActual} index={2}>
                        {this.props.cargando ? <CircularProgress /> : 
                            <List>
                                {administradores.length !== 0 ? administradores : "Aún no hay administradores cargados"}
                            </List>
                        }
                    </this.TabPanel>
                    <Tooltip title="Agregar usuario" placement="left" arrow>
                        <Fab color="primary" onClick={this.props.abrirDialogEditar} style={{position: "fixed", bottom: theme.spacing(5), right: theme.spacing(5)}}>
                            <Add />
                        </Fab>
                    </Tooltip>
                </Container>
                <EditarUsuario open={this.props.mostrarDialogEditar} onClose={this.props.cerrarDialogEditar} editar={false} />
                <EliminarUsuario open={this.props.mostrarDialogEliminar} onClose={this.props.cerrarDialogEliminar} />
                <Notifier />
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        usuarios: state.usuarios.usuarios,
        cargando: state.usuarios.cargando,
        error: state.usuarios.error,
        textoDeError: state.usuarios.textoDeError,
        mostrarDialogEditar: state.editarUsuario.mostrarDialog,
        mostrarDialogEliminar: state.eliminarUsuario.mostrarDialog,
    }
}

const mapDispatchToProps = dispatch => { 
    return {
        cargarUsuarios: () => {dispatch(cargarUsuarios())},
        setUsuarioAEliminar: (id, nombre) => {dispatch(setUsuarioAEliminar(id, nombre))},
        abrirDialogEditar: () => {dispatch(abrirDialogEditar())},
        cerrarDialogEditar: () => {dispatch(cerrarDialogEditar())},
        abrirDialogEliminar: () => {dispatch(abrirDialogEliminar())},
        cerrarDialogEliminar: () => {dispatch(cerrarDialogEliminar())},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(withRouter(Usuarios)));