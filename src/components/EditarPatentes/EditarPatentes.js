import React, { useState, useEffect, Fragment } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Radio, RadioGroup, FormLabel, FormControlLabel, FormControl, Grid, DialogContentText, Select, MenuItem, InputLabel, CircularProgress, Tooltip, IconButton, ListItem, Fab, createMuiTheme } from "@material-ui/core";
import { Add, Delete, Edit } from "@material-ui/icons";
import { DropzoneArea } from "material-ui-dropzone";
import { connect } from "react-redux";
import { editarUsuario, addPatente } from "../../store/actions/editarUsuario";
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
    const [patentes, setPatentes] = useState([]);
    const [singlePatente, setSinglePatente] = useState([null]);

    const estilos = useStyles();

    // carga los datos del usuario a editar/todo vacio al abrir/cerrar el dialog
    useEffect(() => {
        if (props.editar) {
            /* setDni(props.usuario.dni);
            setApellido(props.usuario.apellido);
            setNombre(props.usuario.nombre);
            setFechaNacimiento(props.usuario.fechaNacimiento);
            setSexo(props.usuario.sexo);
            setCalle(props.usuario.calle);
            setNumero(props.usuario.numero);
            setPiso(props.usuario.piso);
            setDepartamento(props.usuario.departamento);
            setLocalidad(props.usuario.localidad);
            setProvincia(props.usuario.provincia);
            setEmail(props.usuario.email);
            setTelefono(props.usuario.telefono); */
            setPatentes(props.usuario.patente);
            setSinglePatente(props.usuario.patente);
        }
        else {
            /* setDni("");
            setApellido("");
            setNombre("");
            setFechaNacimiento(new Date().toISOString().slice(0, 10));
            setSexo("Masculino");
            setCalle("");
            setNumero("");
            setPiso("");
            setDepartamento("");
            setLocalidad("");
            setProvincia("");
            setEmail("");
            setTelefono("");
            setFoto([]); */
            setPatentes([null]);
            setSinglePatente("");
        }
    }, [props.mostrarDialog, props.editar]);

    // evalua si se pueden aceptar los cambios al completar todos los campos obligatorios
    useEffect(() => {
        if (
            patentes[0] !== null
            /* patentes.trim() !== "" &&
            apellido.trim() !== "" &&
            nombre.trim() !== "" &&
            fechaNacimiento.trim() !== "" &&
            calle.trim() !== "" &&
            localidad.trim() !== "" &&
            provincia.trim() !== "" &&
            email.trim() !== "" &&
            telefono.trim() !== "" */
        ) {
            setAceptable(true);
        }
        else {
            setAceptable(false);
        }
    }, [patentes]);

    // ejecuta la action para mandar todo al backend
    const editarUsuarioHandler = () => {
        console.log('SE VA A LOGUEAR LA PATENTE')
        console.log(patentes)
        /* const listaPatentes = {
            patente: patente,
            /* telefono: telefono,
            file: foto,
            dni: dni,
            apellido: apellido,
            nombre: nombre,
            fechaNacimiento: fechaNacimiento,
            sexo: sexo,
            calle: calle,
            numero: numero,
            piso: piso,
            departamento: departamento,
            localidad: localidad,
            provincia: provincia,
        };
        let id = props.editar ? props.usuario.id : ""; */
        // props.editarUsuario(id, usuario, props.editar);
        props.addPatente(patentes);
    }

    const theme = createMuiTheme();
    
    const addFieldPatente = () => {
        setPatentes([
            ...patentes,
            null
        ]);
        console.log('SE VA A LOGUEAR PATENTES');
        console.log(patentes);
    }

    const handlePatenteChange = (index, value) => {
        /* const copy = patentes.slice(0);
        copy[index] = value; */
        const copy = [...patentes];
        copy[index] = value;
        setPatentes(copy);
        console.log('SE VA A LOGUEAR PATENTES');
        console.log(patentes);
    }

    const handlePatenteRemove = (index) => {
        /* let copy = patentes.slice(0);
        copy = copy.splice(index, 1); */
        const copy = [...patentes];
        copy.splice(index, 1);
        setPatentes(copy);
        console.log('SE VA A LOGUEAR PATENTES');
        console.log(patentes);
    }

    return (
        <Dialog open={props.open} onClose={props.onClose} maxWidth="xs">
            <DialogTitle>
                {props.editar ? "Editar usuario " : "Editar Patentes"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>* Campos obligatorios.</DialogContentText>
                <Grid container={true} spacing={2}>
                    <Grid item={true} xs={8}>
                        { patentes.map( (pat, index) => {
                            return (
                                <FormControl fullWidth={true} key={index}>
                                    <ListItem>
                                        <TextField
                                            id={index}
                                            type="text"
                                            label="Patente"
                                            required={true}
                                            value={patentes[index]}
                                            onChange={(event) => handlePatenteChange(index, event.target.value)}
                                        />
                                        {/* <IconButton>
                                            <Edit />
                                        </IconButton> */}
                                        <IconButton onClick={() => handlePatenteRemove(index)}>
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
        mostrarDialog: state.editarUsuario.mostrarDialog,
        cargando: state.editarUsuario.cargando,
        exito: state.editarUsuario.exito,
        error: state.editarUsuario.error,
        textoDeError: state.editarUsuario.textoDeError,
        patentes: state.editarUsuario.patentes
    }
}

const mapDispatchToProps = dispatch => {
    return {
        editarUsuario: (id, usuario, editar) => {dispatch(editarUsuario(id, usuario, editar))},
        addPatente: (listaPatentes) => {dispatch(addPatente(listaPatentes))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(EditarPatentes));