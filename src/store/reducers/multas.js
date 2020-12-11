import * as actionTypes from "../actions/actionTypes";

const initialState = {
    multas: [],
    cargando: true,
    error: false,
    textoDeError: false,
    multaId: 0,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_MULTA_ID:
            return {
                ...state,
                multaId: action.id,
            };
        case actionTypes.CARGAR_MULTAS_CON_EXITO:
            return {
                ...state,
                multas: action.multas,
                cargando: false,
                error: false,
            };
        case actionTypes.CARGAR_MULTAS_CON_ERROR:
            return {
                ...state,
                cargando: false,
                error: true,
                textoDeError: action.error,
            };
        default:
            return state;
    }
}

export default reducer;