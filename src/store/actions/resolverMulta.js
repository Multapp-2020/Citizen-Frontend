import * as actionTypes from "./actionTypes";
import Axios from "axios";
import { enqueueSnackbar } from "./notifier";
import { traducirError } from "../../share/traducirError";
import { cargarMulta } from "./multa";

export const abrirDialogResolver = () => {
    return {
        type: actionTypes.ABRIR_DIALOG_RESOLVER,
    }
}

export const cerrarDialogResolver = () => {
    return {
        type: actionTypes.CERRAR_DIALOG_RESOLVER,
    }
}

const resolverMultaStart = () => {
    return {
        type: actionTypes.RESOLVER_MULTA_START,
    }
}

const resolverMultaConExito = () => {
    return {
        type: actionTypes.RESOLVER_MULTA_CON_EXITO,
    }
}

const resolverMultaConError = error => {
    return {
        type: actionTypes.RESOLVER_MULTA_CON_ERROR,
        error: error,
    }
}

export const resolverMulta = (id, estado, razon) => {
    return dispatch => {
        dispatch(resolverMultaStart());
        const data = {
            id: id,
            estado: estado,
            razon: razon,
            idSupervisor: localStorage.getItem("uid"),
        };
        const headers = {
            "content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
        };
        Axios.post("/actualizarEstado", data, headers)
            .then(() => {
                dispatch(resolverMultaConExito());
                dispatch(enqueueSnackbar({message: "Multa resuelta con éxito", options: {variant: "success"}}));
                dispatch(cerrarDialogResolver());
                dispatch(cargarMulta(id));
            }).catch(error => {
                dispatch(resolverMultaConError(error.response.data.message));
                dispatch(enqueueSnackbar({message: traducirError(error.response.data.message), options: {variant: "error"}}));
            });
    }
}