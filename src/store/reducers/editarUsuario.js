import * as actionTypes from "../actions/actionTypes";

const initialState = {
    mostrarDialogPatente: false,
    mostrarDialog: false,
    cargando: false,
    exito: false,
    error: false,
    textoDeError: "",
    patentes: [],
    mostrarDialogEditarPerfil: false,
    fotoEditar: false,
    editado: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ABRIR_DIALOG_PATENTES:
            return {
                ...state,
                mostrarDialogPatente: true,
            };
        case actionTypes.FOTO_EDITAR_TRUE:
            return {
                ...state,
                fotoEditar: true,
            };
        case actionTypes.FOTO_EDITAR_FALSE:
            return {
                ...state,
                fotoEditar: false,
            };
        case actionTypes.CERRAR_DIALOG_PATENTES:
            return {
                ...state,
                mostrarDialogPatente: false,
            };
        case actionTypes.ABRIR_DIALOG_EDITAR:
            return {
                ...state,
                mostrarDialog: true,
            };
        case actionTypes.CERRAR_DIALOG_EDITAR:
            return {
                ...state,
                mostrarDialog: false,
                cargando: false,
                exito: false,
                error: false,
                textoDeError: "",
            };
        case actionTypes.EDITAR_USUARIO_START:
            return {
                ...state,
                cargando: true,
            };
        case actionTypes.EDITAR_USUARIO_CON_EXITO:
            let switcher;
            if (state.editado === false) {
                switcher = true;
            } else {
                if (state.editado === true) {
                    switcher = false;
                }
            }
            return {
                ...state,
                cargando: false,
                exito: true,
                error: false,
                textoDeError: "",
                editado: switcher,
            };
        case actionTypes.EDITAR_USUARIO_CON_ERROR:
            return {
                ...state,
                cargando: false,
                exito: false,
                error: false,
                textoDeError: action.error.toString(),
            };
        case actionTypes.ADD_PATENTE:
            return {
                ...state,
                patentes: action.data
            };
        case actionTypes.ABRIR_DIALOG_EDITAR_PERFIL:
            return {
                ...state,
                mostrarDialogEditarPerfil: true
            };
        case actionTypes.CERRAR_DIALOG_EDITAR_PERFIL:
            return {
                ...state,
                mostrarDialogEditarPerfil: false
            };
        default:
            return state;
    }
}

export default reducer;