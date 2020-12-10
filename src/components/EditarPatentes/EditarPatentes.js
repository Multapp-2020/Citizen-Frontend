import React, { useState, useEffect, Fragment } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Radio, RadioGroup, FormLabel, FormControlLabel, FormControl, Grid, DialogContentText, Select, MenuItem, InputLabel, CircularProgress, Tooltip, IconButton, ListItem, Fab, createMuiTheme } from "@material-ui/core";
import { Add, Delete, Edit } from "@material-ui/icons";
import { DropzoneArea } from "material-ui-dropzone";
import { connect } from "react-redux";
import { editarUsuario, addPatente, abrirDialogPatentes, cerrarDialogPatentes } from "../../store/actions/editarUsuario";
import { withSnackbar } from "notistack";
import Notifier from "../Notifier/Notifier";
import useStyles from "../../share/useStyles";

const EditarPatentes = props => {
    /* const [dni, setDni] = useState("");
    const [apellido, setApellido] = useState("");
    const [nombre, setNombre] = useState("");
    const [fechaNacimiento, setFechaNacimiento] = useState(new Date().toISOString().slice(0, 10));
    const [sexo, setSexo] = useState("Masculino");
    const [calle, setCalle] = useState("");
    const [numero, setNumero] = useState("");
    const [piso, setPiso] = useState("");
    const [departamento, setDepartamento] = useState("");
    const [localidad, setLocalidad] = useState("");
    const [provincia, setProvincia] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");
    const [foto, setFoto] = useState([]); */
    const [aceptable, setAceptable] = useState(false);
    const [patentes, setPatentes] = useState([null]);
    const [singlePatente, setSinglePatente] = useState("");
    const [deleteBtn, setDeleteBtn] = useState(true);

    const estilos = useStyles();

    // carga los datos del usuario a editar/todo vacio al abrir/cerrar el dialog
    useEffect(() => {
        if (props.editar) {
            if ((typeof props.patentes) == "string"){
                setPatentes(props.patentes.split(","));
            } else {
                setPatentes(props.patentes);
            }
        }
        else {
            if (props.mostrarDialogPatente){
                if ((typeof props.patentes) == "string"){
                    setPatentes(props.patentes.split(","));
                } else {
                    setPatentes(props.patentes);
                }
            } else {
                setPatentes([null]);
                setSinglePatente("");
            }
        }
    }, [props.mostrarDialog, props.editar, props.mostrarDialogPatente]);

    // evalua si se pueden aceptar los cambios al completar todos los campos obligatorios
    useEffect(() => {
        const bool = validForm();
        if (bool) {
            setAceptable(true);
        }
        else {
            setAceptable(false);
        }
    }, [patentes]);

    // ejecuta la action para mandar todo al backend
    const editarUsuarioHandler = () => {
        props.addPatente(patentes);
        props.cerrarDialogPatentes();
    }

    const theme = createMuiTheme();

    const addFieldPatente = () => {
        setPatentes([
            ...patentes,
            null
        ]);
    }

    const handlePatenteChange = (index, value) => {
        // setDeleteBtn(validDelete());
        const copy = [...patentes];
        copy[index] = value.toUpperCase();
        setPatentes(copy);
        /* const booleano = validDelete();
        setDeleteBtn(booleano); */
    }

    const handlePatenteRemove = (index) => {
        const copy = [...patentes];
        copy.splice(index, 1);
        setPatentes(copy);
        /* if ((patentes.length > 1) && (patentes[0] !== null) && (index === 0)){
            console.log('ENTRA EN EL CONDICIONAL');
            //var copy = Array.apply(null, Array(patentes.length - 1));
            //for (let i=1; i<patentes.length; i++){
                //copy[i-1] = patentes[i];
            //}
            const copy = patentes.slice(1, patentes.length);
            console.log(copy);
            setPatentes([null]);
        } else {
            const copy = [...patentes];
            copy.splice(index, 1);
            setPatentes(copy);
        } */
    }

    const regex = /^[A-Z]{3}[0-9]{3}$/;
    const regexNuevo = /^[A-Z]{2}[0-9]{3}[A-Z]{2}$/;

    const validForm = () => {
        const bool = hasDuplicates(patentes);
        if (bool) {
            return false
        }
        for (let i=0; i<patentes.length; i++){
            if (patentes[i] === null) {
                return false;
            }
            if ((patentes[i].length < 6) || (patentes[i].length > 8)){
                return false;
            }
            if ((!(regex.test(patentes[i]))) && (!(regexNuevo.test(patentes[i])))) {
                return false;
            }
        }
        return true;
    }

    const hasDuplicates = (array) => {
        return (new Set(array)).size !== array.length;
    }

    /* const validDelete = () => {
        console.log('ENTRA A LA FUNCION')
        var bool = true;
        for (let i=1; i<patentes.length; i++){
            if (patentes[i] !== null){
                bool = false;
            }
        }
        if ((patentes[0] !== null) && bool){
            return true;
        }
        return false;
    } */

    return (
        <Dialog open={props.open} onClose={props.onClose} maxWidth="xs">
            <DialogTitle>
                {props.editar ? "Editar usuario " : "Editar Patentes"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>* Campos obligatorios. No se pueden ingresar patentes iguales. Mínimo 1, máxmo 5.</DialogContentText>
                <Grid container={true} spacing={2}>
                    <Grid item={true} xs={8}>
                        { patentes.map( (pat, index) => {
                            return (
                                <FormControl fullWidth={true} key={index}>
                                    <ListItem>
                                        <Tooltip title="Ejemplos de formatos permitidos: AAA000, AA000AB">
                                            <TextField
                                                id={index}
                                                type="text"
                                                label="Patente"
                                                required={true}
                                                value={patentes[index]}
                                                onChange={(event) => handlePatenteChange(index, event.target.value)}
                                            />
                                        </Tooltip>
                                        <IconButton onClick={() => handlePatenteRemove(index)} disabled={index === 0}>
                                            <Delete />
                                        </IconButton>
                                    </ListItem>
                                </FormControl>
                            )
                        }) }
                            <IconButton onClick={addFieldPatente} disabled={patentes.length === 5}>
                                <Add />
                            </IconButton>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose}>Cancelar</Button>
                <Button onClick={editarUsuarioHandler} color="primary" disabled={props.cargando || !aceptable}>
                    Aceptar
                    {props.cargando && <CircularProgress size={24} className={estilos.buttonProgress} />}
                </Button>
            </DialogActions>
            <Notifier />
        </Dialog>
    );
}

const mapStateToProps = state => {
    return {
        usuario: state.usuario.usuario,
        datos: state.perfil.datos,
        mostrarDialog: state.editarUsuario.mostrarDialog,
        cargando: state.editarUsuario.cargando,
        exito: state.editarUsuario.exito,
        error: state.editarUsuario.error,
        textoDeError: state.editarUsuario.textoDeError,
        patentes: state.editarUsuario.patentes,
        mostrarDialogPatente: state.editarUsuario.mostrarDialogPatente,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        editarUsuario: (id, usuario, editar) => {dispatch(editarUsuario(id, usuario, editar))},
        addPatente: (listaPatentes) => {dispatch(addPatente(listaPatentes))},
        abrirDialogPatentes: () => {dispatch(abrirDialogPatentes())},
        cerrarDialogPatentes: () => {dispatch(cerrarDialogPatentes())},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(EditarPatentes));