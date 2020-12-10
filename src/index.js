import React from 'react';
import ReactDOM from 'react-dom';
import Axios from "axios";
import { Provider } from 'react-redux';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import { SnackbarProvider } from "notistack";
import App from './App';
import * as serviceWorker from './serviceWorker';
import notifierReducer from "./store/reducers/notifier";
import loginReducer from "./store/reducers/login";
import cambiarContrasenaReducer from "./store/reducers/cambiarContrasena";
import perfilReducer from "./store/reducers/perfil";
import multasReducer from "./store/reducers/multas";
import filtroReducer from "./store/reducers/filtro";
import multaReducer from "./store/reducers/multa";
import resolverMultaReducer from "./store/reducers/resolverMulta";
import usuariosReducer from "./store/reducers/usuarios";
import editarUsuarioReducer from "./store/reducers/editarUsuario";
import eliminarUsuarioReducer from "./store/reducers/eliminarUsuario";
import usuarioReducer from "./store/reducers/usuario";

Axios.defaults.baseURL = "https://multapp-back.herokuapp.com/api"; // esto es para usar la misma url en todas las peticiones http sin tener que andar escribiendo

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
    notifier: notifierReducer,
    login: loginReducer,
    cambiarContrasena: cambiarContrasenaReducer,
    perfil: perfilReducer,
    multas: multasReducer,
    filtro: filtroReducer,
    multa: multaReducer,
    resolverMulta: resolverMultaReducer,
    usuarios: usuariosReducer,
    editarUsuario: editarUsuarioReducer,
    eliminarUsuario: eliminarUsuarioReducer,
    usuario: usuarioReducer,
});

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <SnackbarProvider>
                <App />
            </SnackbarProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
