import * as actionTypes from "../actions/actionTypes";

const initialState = {
    usuario: null,
    cargando: true,
    errorAlCargar: false,
    textoDeErrorAlCargar: false,
    estadoCambiado: false,
    errorAlModificarDatos: false,
    textoDeErrorAlModificarDatos: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CARGAR_USUARIO_CON_EXITO:
            return {
                ...state,
                usuario: action.usuario,
                cargando: false,
                errorAlCargar: false,
            };
        case actionTypes.CARGAR_USUARIO_CON_ERROR:
            return {
                ...state,
                cargando: false,
                errorAlCargar: true,
                textoDeErrorAlCargar: action.error,
            };
        default:
            return state;
        }
}

export default reducer;