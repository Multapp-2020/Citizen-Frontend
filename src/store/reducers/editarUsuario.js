import * as actionTypes from "../actions/actionTypes";

const initialState = {
    mostrarDialogPatente: false,
    mostrarDialog: false,
    cargando: false,
    exito: false,
    error: false,
    textoDeError: "",
    patentes: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ABRIR_DIALOG_PATENTES:
            console.log('ENTRA EN EL REDUCER');
            return {
                ...state,
                mostrarDialogPatente: true,
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
            return {
                ...state,
                cargando: false,
                exito: true,
                error: false,
                textoDeError: "",
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
            console.log('ENTRA AL REDUCER')
            return {
                ...state,
                patentes: state.patentes.concat(action.data)
            };
        default:
            return state;
    }
}

export default reducer;