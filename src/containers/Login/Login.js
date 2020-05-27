import React, { Component, Fragment } from "react";
import estilos from "./Login.module.css";
import Logo from "../../components/Logo/Logo";

class Login extends Component {
    // metodo para hacer el login
    loginHandler() {
        // mandar al server usuario y contraseña
        // si es incorrecto hacxer visible el div de clase estilos.Error
        // si es correcto hacer un if
        //     si el usuario es un supervisor cargar el componente LayoutSupervisor
        //     si el usuario es un administrador cargar el componente LayoutAdministrador
    }

    render() {
        return (
            <Fragment>
                <div className={estilos.Background}>
                    <div className={estilos.Controles}>
                        <Logo width={185} height={186} />
                        <h1>MultApp</h1>
                        <div className={estilos.Error}>
                            El correo electrónico o la contraseña son incorrectos
                        </div>
                        <label for="email">Correo Electrónico</label>
                        <input type="text" id="email" />
                        <label for="contrasena">Contraseña</label>
                        <input type="password" id="contrasena" />
                        <button onClick={this.loginHandler}>Iniciar sesión</button>
                        <a href="">¿Olvidó su contraseña?</a>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Login;