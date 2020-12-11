import * as actionTypes from "./actionTypes";
import Axios from "axios";
import { enqueueSnackbar } from "./notifier";

const cargarPerfilStart = () => {
    return {
        type: actionTypes.CARGAR_PERFIL_START,
    }
}

const cargarPerfilConExito = (datos) => {
    return {
        type: actionTypes.CARGAR_PERFIL_CON_EXITO,
        datos: datos,
    }
}

const cargarPerfilConError = (error) => {
    return {
        type: actionTypes.CARGAR_PERFIL_CON_ERROR,
        error: error,
    }
}

export const cargarPerfil = () => {
    const params = {
        headers: {
            "content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        params: {
            id: localStorage.uid,
        },
    };
    /* const data = {
        params: {
            uid: localStorage.uid,
        }
    }; */
    return dispatch => {
        dispatch(cargarPerfilStart());
        Axios.get("/getUsuario", params)
            .then(response => {
                dispatch(cargarPerfilConExito(response.data));
            }).catch(error => {
                dispatch(cargarPerfilConError(error));
                dispatch(enqueueSnackbar({message: "No se pudieron obtener sus datos personales", options: {variant: "error"}}));
            });
    }
}