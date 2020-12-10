import * as actionTypes from "./actionTypes";
import Axios from "axios";
import { enqueueSnackbar } from "./notifier";
import { cargarUsuarios } from "./usuarios";

export const abrirDialogEliminar = () => {
    return {
        type: actionTypes.ABRIR_DIALOG_ELIMINAR,
    }
}

export const cerrarDialogEliminar = () => {
    return {
        type: actionTypes.CERRAR_DIALOG_ELIMINAR,
    }
}

const eliminarUsuarioStart = () => {
    return {
        type: actionTypes.ELIMINAR_USUARIO_START,
    }
}

const eliminarUsuarioConExito = () => {
    return {
        type: actionTypes.ELIMINAR_USUARIO_CON_EXITO,
    }
}

const eliminarUsuarioConError = (error) => {
    return {
        type: actionTypes.ELIMINAR_USUARIO_CON_ERROR,
        error: error,
    }
}

export const setUsuarioAEliminar = (id, nombre) => {
    return {
        type: actionTypes.SET_USUARIO_A_ELIMINAR,
        id: id,
        nombre: nombre,
    }
}

export const eliminarUsuario = (id) => {
    return dispatch => {
        dispatch(eliminarUsuarioStart());
        const params = {
            headers: {
                "content-type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            params: {
                id: id,
            },
        };
        Axios.delete("/deleteUsuario", params)
            .then(response => {
                dispatch(eliminarUsuarioConExito());
                dispatch(enqueueSnackbar({message: "Usuario eliminado con éxito", options: {variant: "success"}}));
                dispatch(cargarUsuarios());
                dispatch(cerrarDialogEliminar());
            }).catch(error => {
                dispatch(eliminarUsuarioConError(error));
                dispatch(enqueueSnackbar({message: "Error al eliminar usuario", options: {variant: "error"}}));
            });
    }
}