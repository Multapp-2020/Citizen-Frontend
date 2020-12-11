import * as actionTypes from "../actions/actionTypes";

const initialState = {
    id: "",
    datos: null,
    foto: "",
    cargando: true,
    error: false,
    textoDeError: "",
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CARGAR_PERFIL_START:
            console.log('ENTRA AL REDUCER');
            return {
                ...state,
                cargando: true,
            };
        case actionTypes.CARGAR_PERFIL_CON_EXITO:
            return {
                ...state,
                id: action.id,
                datos: action.datos,
                foto: action.foto,
                cargando: false,
                error: false,
                textoDeError: "",
            };
        case actionTypes.CARGAR_PERFIL_CON_ERROR:
            return {
                ...state,
                id: "",
                datos: null,
                foto: "",
                cargando: false,
                error: true,
                textoDeError: action.error,
            };
        default:
            return state;
    }
}

export default reducer;