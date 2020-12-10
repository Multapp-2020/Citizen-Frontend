import * as actionTypes from "./actionTypes";
import Axios from "axios";

const loginStart = () => {
    return {
        type: actionTypes.LOGIN_START,
    }
}

const loginConExito = (idToken) => {
    return {
        type: actionTypes.LOGIN_CON_EXITO,
        idToken: idToken,
    }
}

const loginConError = (error) => {
    return {
        type: actionTypes.LOGIN_CON_ERROR,
        error: error,
    }
}

export const login = (email, password) => {
    return dispatch => {
        dispatch(loginStart());
        const data = {
            email: email,
            password: password,
            returnSecureToken: true,
        }
        const headers = {
            "content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
        }
        Axios.post("/sessionLogin", data, headers)
            .then(response => {
                localStorage.setItem("idToken", response.data.idToken);
                localStorage.setItem("uid", response.data.uid);
                localStorage.setItem("email", response.data.email);
                localStorage.setItem("rol", response.data.rol);
                localStorage.setItem("displayName", response.data.displayName);
                localStorage.setItem("photoURL", response.data.photoURL);
                // localStorage.setItem("expirationDate", response.data.expiresIn);
                // localStorage.setItem("localId", response.data.localId);
                dispatch(loginConExito(response.data.idToken));
            }).catch(error => {
                dispatch(loginConError(error.response.data.message));
            });
    }
}

const recuperarContrasenaConExito = () => {
    return {
        type: actionTypes.RECUPERAR_CONTRASENA_CON_EXITO,
    }
}

export const recuperarContrasena = (email) => {
    return dispatch => {
        dispatch(loginStart());
        const data = {
            email: email,
            returnSecureToken: true,
        }
        const headers = {
            "content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
        }
        Axios.post("/recuperarContrasena", data, headers)
            .then(response => {
                dispatch(recuperarContrasenaConExito());
            }).catch(error => {
                dispatch(loginConError(error.response.data.message));
            });
    }

}