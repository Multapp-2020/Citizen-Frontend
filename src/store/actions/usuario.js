import * as actionTypes from "./actionTypes";
import Axios from "axios";
import { enqueueSnackbar } from "./notifier";

const cargarUsuarioStart = () => {
    return {
        type: actionTypes.CARGAR_USUARIO_START,
    }
}

const cargarUsuarioConExito = (usuario) => {
    return {
        type: actionTypes.CARGAR_USUARIO_CON_EXITO,
        id: usuario.id,
        foto: usuario.foto,
        usuario: usuario.datos,
        patentes: usuario.patentes
    }
}

const cargarUsuarioConError = (error) => {
    return {
        type: actionTypes.CARGAR_USUARIO_CON_ERROR,
        error: error,
    }
}

export const cargarUsuario = (id) => {
    const params = {
        headers: {
            "content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        params: {
            uid: id,
        },
    };
    return dispatch => {
        dispatch(cargarUsuarioStart());
        Axios.get("/getPerfil", params)
            .then(response => {
                dispatch(cargarUsuarioConExito(response.data));
            }).catch(error => {
                dispatch(cargarUsuarioConError(error));
                dispatch(enqueueSnackbar({message: "Error al cargar usuario. Intente nuevamente", options: {variant: "error"}}));
            });
    }
}
