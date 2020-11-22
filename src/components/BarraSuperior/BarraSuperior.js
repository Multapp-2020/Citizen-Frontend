import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import Logo from "../../components/Logo/Logo";
// aca hay conflicto, en /core e /icons hay un componente llamado Menu
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Avatar } from "@material-ui/core";
import { cerrarSesion } from "../../share/cerrarSesion";
import useStyles from "../../share/useStyles";


const BarraSuperior = props => {
    const [anchorEl, setAnchorEl] = useState(null);

    const estilos = useStyles();

    // metodo para abrir el menu
    const abrirMenuHandler = event => {
        setAnchorEl(event.currentTarget);
    }

    // metodo para cerrar el menu
    const cerrarMenuHandler = () => {
        setAnchorEl(null);
    }

    // metodo que te manda a la pagina para administrar las multas
    const multasHandler = () => {
        cerrarMenuHandler();
        props.history.push("/multas");
    }

    // metodo que te manda a tu perfil
    const perfilHandler = () => {
        cerrarMenuHandler();
        props.history.push("/perfil");
    }

    // metodo que te manda a la pagina para administrar usuarios
    const usuariosHandler = () => {
        cerrarMenuHandler();
        props.history.push("/usuarios");
    }

    // metodo para cerrar sesion
    const cerrarSesionHandler = () => {
        cerrarMenuHandler();
        cerrarSesion();
    }

    return (
        <AppBar position="sticky">
            <Toolbar variant="dense">
                <Logo width={48} height={48} />
                <Typography variant="h6" style={{flexGrow: "1"}}>
                    MultApp
                </Typography>
                <IconButton edge="end" color="inherit" aria-label="menu" aria-haspopup="true" onClick={abrirMenuHandler}>
                    <Avatar className={estilos.avatar} src={localStorage.getItem("photoURL")} alt={localStorage.getItem("displayName")} />
                </IconButton>
                <Menu id="menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={cerrarMenuHandler}>
                    <MenuItem onClick={multasHandler}>Mis Multas</MenuItem>
                    <MenuItem onClick={perfilHandler}>Mi perfil</MenuItem>
                    <MenuItem onClick={cerrarSesionHandler}>Cerrar sesión</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
}

export default withRouter(BarraSuperior);