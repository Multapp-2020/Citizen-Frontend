import * as actionTypes from "./actionTypes";
import Axios from "axios";
import { enqueueSnackbar } from "./notifier";
import { cargarUsuarios } from "./usuarios";
import { cargarUsuario } from "./usuario";
import { traducirError } from "../../share/traducirError";

export const abrirDialogEditar = () => {
    return {
        type: actionTypes.ABRIR_DIALOG_EDITAR,
    }
}

export const cerrarDialogEditar = () => {
    return {
        type: actionTypes.CERRAR_DIALOG_EDITAR,
    }
}

const editarUsuarioStart = () => {
    return {
        type: actionTypes.EDITAR_USUARIO_START,
    }
}

const editarUsuarioConExito = () => {
    return {
        type: actionTypes.EDITAR_USUARIO_CON_EXITO,
    }
}

const editarUsuarioConError = (error) => {
    return {
        type: actionTypes.EDITAR_USUARIO_CON_ERROR,
        error: error,
    }
}

export const fotoEditarTrue = () => {
    return {
        type: actionTypes.FOTO_EDITAR_TRUE,
    }
}

export const fotoEditarFalse = () => {
    return {
        type: actionTypes.FOTO_EDITAR_FALSE,
    }
}

export const editarUsuario = (id, usuario, editar) => {
    return dispatch => {
        dispatch(editarUsuarioStart());
        const data = new FormData();
        if (editar) {
            data.append("id", id);
        }
        Object.keys(usuario).map(key => {
            data.append(key.toString(), usuario[key]);
        });
        const headers = {
            "content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
        };
        // si editar es true, edita el usuario, si es false crea uno nuevo
        let url = editar ? "/editUsuario" : "/addUsuario";
        Axios.post(url, data, headers)
            .then(response => {
                dispatch(editarUsuarioConExito());
                let texto = editar ? "Usuario actualizado exitosamente" : "Usuario creado exitosamente";
                dispatch(enqueueSnackbar({message: texto, options: {variant: "success"}}));
                if (editar) {
                    dispatch(cerrarDialogEditarPerfil());
                    dispatch(cargarUsuario(id));
                }
                else {
                    // dispatch(cargarUsuarios());
                    dispatch(cerrarDialogEditar());
                }
                // dispatch(cargarUsuario(id));
                // dispatch(cerrarDialogEditarPerfil());
            }).catch(error => {
                dispatch(editarUsuarioConError(error));
                dispatch(enqueueSnackbar({message: traducirError(error.response.data.message), options: {variant: "error"}}));
            });
    }
}

export const abrirDialogPatentes = () => {
    return {
        type: actionTypes.ABRIR_DIALOG_PATENTES,
    }
}

export const cerrarDialogPatentes = () => {
    return {
        type: actionTypes.CERRAR_DIALOG_PATENTES,
    }
}

export const addPatente = (listaPatentes) => {
    return {
        type: actionTypes.ADD_PATENTE,
        data: listaPatentes
    }
}

export const abrirDialogEditarPerfil = () => {
    return {
        type: actionTypes.ABRIR_DIALOG_EDITAR_PERFIL,
    }
}

export const cerrarDialogEditarPerfil = () => {
    return {
        type: actionTypes.CERRAR_DIALOG_EDITAR_PERFIL,
    }
}