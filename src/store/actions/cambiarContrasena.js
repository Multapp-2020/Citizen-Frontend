import * as actionTypes from "./actionTypes";
import Axios from "axios";
import { enqueueSnackbar } from "./notifier";
import { traducirError } from "../../share/traducirError";

export const abrirDialogCambiarContrasena = () => {
    return {
        type: actionTypes.ABRIR_DIALOG_CAMBIAR_CONTRASENA,
    }
}

export const cerrarDialogCambiarContrasena = () => {
    return {
        type: actionTypes.CERRAR_DIALOG_CAMBIAR_CONTRASENA,
    }
}

const cambiarContrasenaStart = () => {
    return {
        type: actionTypes.CAMBIAR_CONTRASENA_START,
    }
}

const cambiarContrasenaConExito = () => {
    return {
        type: actionTypes.CAMBIAR_CONTRASENA_CON_EXITO,
    }
}

const cambiarContrasenaConError = (error) => {
    return {
        type: actionTypes.CAMBIAR_CONTRASENA_CON_ERROR,
        error: error,
    }
}

export const cambiarContrasena = (contrasenaActual, contrasenaNueva) => {
    return dispatch => {
        dispatch(cambiarContrasenaStart());
        const data = {
            uid: localStorage.uid,
            contrasenaActual: contrasenaActual,
            contrasenaNueva: contrasenaNueva,
        };
        const headers = {
            "content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
        };
        Axios.post("/cambiarContrasena", data, headers)
            .then(response => {
                dispatch(cambiarContrasenaConExito());
                dispatch(cerrarDialogCambiarContrasena());
                dispatch(enqueueSnackbar({message: "Contraseña cambiada correctamente", options: {variant: "success"}}));
            }).catch(error => {
                dispatch(cambiarContrasenaConError(error));
                dispatch(enqueueSnackbar({message: traducirError(error.response.data.message), options: {variant: "error"}}));
            });
    }
}