import React, { Component, Fragment } from "react";
import Logo from "../../components/Logo/Logo";
import { Container, Typography, FormControl, TextField, Button, Grid, Paper, CircularProgress } from "@material-ui/core";
import { login, recuperarContrasena } from "../../store/actions/login";
import { connect } from "react-redux";
import { traducirError } from "../../share/traducirError";
import { Redirect, withRouter } from "react-router";
import { abrirDialogEditar, cerrarDialogEditar } from "../../store/actions/editarUsuario";
import CrearUsuario from '../../components/CrearUsuario/CrearUsuario';

class Login extends Component {

    state = {
        email: "",
        contrasena: "",
        mostrarIniciarSesion: true,
        contrasenaIncorrecta: false,
    }

    estilos = {
        container: {
            // imagen diseñada por 4045 / Freepik
            // http://www.freepik.com
            backgroundImage: "url(" + require("../../assets/login-background.jpg") + ")",
            backgroundSize: "cover",
            height: "100vh",
            width: "100vw",
            margin: 0,
        },
        imageAuthor: {
            position: "fixed",
            bottom: 0,
            left: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
            padding: 5,
            fontFamily: "roboto",
            fontSize: 12,
            textDecoration: "none",
        }
    }
    // metodo para mostrar/ocultar el cuadro de recuperar contraseña
    olvidarContrasenaHandler = () => {
        const nuevoEstado = !this.state.mostrarIniciarSesion;
        this.setState({mostrarIniciarSesion: nuevoEstado});
    }

    // carga lo que escribe el usuario en el state
    inputHandler = (event) => {
        this.setState({[event.target.id]: event.target.value});
    }

    render() {
        console.log(this.props)
        const iniciarSesion = (
            <Fragment>
                <Grid item={true} xs={12}>
                    <Typography align="center">Iniciar sesión en MultApp</Typography>
                </Grid>
                <Grid item={true} xs={12}>
                    <FormControl fullWidth>
                        <TextField
                            id="email"
                            type="email"
                            label="Correo electrónico"
                            value={this.state.email}
                            onChange={this.inputHandler}
                            autoFocus={true}
                        />
                        <TextField
                            id="contrasena"
                            type="password"
                            label="Contraseña"
                            value={this.state.contrasena}
                            onChange={this.inputHandler}
                        />
                    </FormControl>
                </Grid>
                <Grid item={true} xs={12}>
                    <Button
                        fullWidth={true}
                        variant="contained"
                        color="primary"
                        onClick={() => this.props.login(this.state.email, this.state.contrasena)}
                    >
                        Iniciar sesión
                    </Button>
                    <Button
                        fullWidth={true}
                        color="primary"
                        onClick={this.olvidarContrasenaHandler}
                    >
                        Olvidé mi contraseña
                    </Button>
                    <Button
                        fullWidth={true}
                        color="primary"
                        onClick={this.props.abrirDialogEditar}
                    >
                        Regístrate
                    </Button>
                </Grid>
            </Fragment>
        );
        const recuperarContrasena = (
            <Fragment>
                <Grid item={true} xs={12}>
                    <Typography align="center">
                        Si no recuerda su contraseña, ingrese su correo electrónico y le enviaremos una nueva para que pueda iniciar sesión
                    </Typography>
                </Grid>
                <Grid item={true} xs={12}>
                    <FormControl fullWidth={true}>
                        <TextField
                            id="email"
                            type="email"
                            label="Correo electrónico"
                            value={this.state.email}
                            onChange={this.inputHandler}
                        />
                    </FormControl>
                </Grid>
                <Grid item={true} xs={12}>
                    <Button
                        fullWidth={true}
                        variant="contained"
                        color="primary"
                        onClick={() => this.props.recuperarContrasena(this.state.email)}
                    >
                        Recuperar contraseña
                    </Button>
                    <Button
                        fullWidth={true}
                        color="primary"
                        onClick={this.olvidarContrasenaHandler}
                    >
                        Cancelar
                    </Button>
                </Grid>
            </Fragment>
        );

        const imagen = this.props.cargando ? <CircularProgress size={80} /> : <Logo width={80} height={80} />;
        
        let redirect = null;
        if (localStorage.getItem("idToken")) {
            redirect = <Redirect to="/" />
        }

        return (
            <div style={this.estilos.container}>
                <a href="http://www.freepik.com" style={this.estilos.imageAuthor}>
                    Imagen diseñada por 4045 / Freepik
                </a>
                <Grid
                    container={true}
                    spacing={0}
                    alignContent="center"
                    justify="center"
                    style={{ minHeight: '100vh' }}
                >
                    <Grid item={true} xs={3}>
                        <Paper elevation={3} style={{padding: "8px"}}>
                            <Grid container={true} spacing={1} direction="column">
                                <Grid item={true} xs={12} style={{textAlign: "center"}}>
                                    {imagen}
                                </Grid>
                                {this.props.error !== "" ?
                                    <Grid item={true} xs={12}>
                                        <Typography align="center" variant="body2" color={this.props.error ? "error" : "primary"}>
                                            {this.props.error ? traducirError(this.props.textoDeError) : this.props.textoDeError}
                                        </Typography>
                                    </Grid>
                                : null}
                                {this.state.mostrarIniciarSesion ? iniciarSesion : recuperarContrasena}
                            </Grid>
                            <CrearUsuario open={this.props.mostrarDialogEditar} onClose={this.props.cerrarDialogEditar} editar={false} />
                        </Paper>
                    </Grid>
                </Grid>
                {redirect}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        cargando: state.login.cargando,
        error: state.login.error,
        textoDeError: state.login.textoDeError,
        mostrarDialogEditar: state.editarUsuario.mostrarDialog,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (email, contrasena) => {dispatch(login(email, contrasena))},
        recuperarContrasena: (email) => {dispatch(recuperarContrasena(email))},
        abrirDialogEditar: () => {dispatch(abrirDialogEditar())},
        cerrarDialogEditar: () => {dispatch(cerrarDialogEditar())},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));