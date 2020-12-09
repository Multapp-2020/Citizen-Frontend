import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Radio, RadioGroup, FormLabel, FormControlLabel, FormControl, Grid, DialogContentText, Select, MenuItem, InputLabel, CircularProgress, Tooltip } from "@material-ui/core";
import { DropzoneArea } from "material-ui-dropzone";
import { connect } from "react-redux";
import { editarUsuario } from "../../store/actions/editarUsuario";
import { withSnackbar } from "notistack";
import Notifier from "../Notifier/Notifier";
import useStyles from "../../share/useStyles";
import { abrirDialogPatentes, cerrarDialogPatentes } from "../../store/actions/editarUsuario";
import EditarPatentes from '../EditarPatentes/EditarPatentes';

const CrearUsuario = props => {

    const [rol, setRol] = useState("Ciudadano");
    const [dni, setDni] = useState("");
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
    const [foto, setFoto] = useState([]);
    const [patentes, setPatentes] = useState([]);
    const [unaPatente, setUnaPatente] = useState("");
    const [aceptable, setAceptable] = useState(false);

    const estilos = useStyles();

    // carga los datos del usuario a editar/todo vacio al abrir/cerrar el dialog
    useEffect(() => {
        if (props.editar) {
            setRol(props.datos.rol);
            setDni(props.datos.dni);
            setApellido(props.datos.nombre.split(" ")[1]);
            setNombre(props.datos.nombre.split(" ")[0]);
            setFechaNacimiento(props.datos.fechaNacimiento);
            setSexo(props.datos.sexo);
            setCalle(props.datos.direccion);
            setNumero(props.datos.numero);
            setPiso(props.datos.piso);
            setDepartamento(props.datos.departamento);
            setLocalidad(props.datos.localidad);
            setProvincia(props.datos.provincia);
            setEmail(props.datos.email);
            setTelefono(props.datos.telefono);
            setPatentes(props.patentes);
            setUnaPatente(props.datos.unaPatente);
        }
        else {
            setRol("Ciudadano");
            setDni("");
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
            setPatentes(props.patentes);
            setUnaPatente("");
            setFoto([]);
        }
    }, [props.mostrarDialog, props.editar, props.patentes, props.mostrarDialogEditarPerfil]);

    // evalua si se pueden aceptar los cambios al completar todos los campos obligatorios
    useEffect(() => {
        if (
            dni.trim() !== "" &&
            apellido.trim() !== "" &&
            nombre.trim() !== "" &&
            fechaNacimiento.trim() !== "" &&
            calle.trim() !== "" &&
            localidad.trim() !== "" &&
            provincia.trim() !== "" &&
            email.trim() !== "" &&
            telefono.trim() !== ""
        ) {
            setAceptable(true);
        }
        else {
            setAceptable(false);
        }
    }, [rol, dni, apellido, nombre, fechaNacimiento, calle, localidad, provincia, email, telefono]);

    // carga el radio que selecciona el usuario en el state
    const radioHandler = (event) => {
        setSexo(event.target.value);
    }

    // carga lo que selecciona el usuario en el select en el state
    const selectHandler = (event) => {
        setRol(event.target.value);
    }

    // carga la foto subida en el state
    const imageUploadHandler = (files) => {
        setFoto(files[0]);
    }

    // Agrega una patente al array que se enviará al backend
    const unaPatenteHandler = () => {
        setPatentes([
            ...patentes,
            unaPatente
        ]);
        setUnaPatente("");
    }

    const editarPatentesHandler = () => {
        // props.mostrarDialogPatente = true;
        /* this.setState((state) => {
            return {
                ...state,
                mostrarDialogPatente: true
            }
        }); */
        // this.setState({mostrarDialogPatente: true});
        // this.state.mostrarDialogPatente = true;
        props.abrirDialogPatentes();
        return
    }

    // ejecuta la action para mandar todo al backend
    const editarUsuarioHandler = () => {
        const usuario = {
            rol: rol,
            email: email,
            telefono: telefono,
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
            patentes: patentes
        };
        /* let id = props.editar ? props.usuario.id : "";
        props.editarUsuario(id, usuario, props.editar); */
        let id = localStorage.getItem("uid");
        props.editarUsuario(id, usuario, props.editar);
    }

    console.log('SE VAN A LOGUEAR LAS PROPS DE CREARUSUARIO.JS');
    console.log(props);

    return (
        <Dialog open={props.open} onClose={props.onClose} maxWidth="xl" fullWidth={true}>
            <DialogTitle>
                {props.editar ? "Editar usuario " : "Regístrate para realizar un seguimiento de tus multas"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>* Campos obligatorios. Pase el cursor sobre algunos campos para más información.</DialogContentText>
                <Grid container={true} spacing={2}>
                    <Grid item={true} xs={12}>
                        {/* <FormControl>
                            <Tooltip title="La patente consta de 3 letras en mayúscula seguidas de 3 números. Se debe agregar como mínimo una patente, y como máximo se permiten 5">
                                <TextField
                                    id="patente"
                                    type="text"
                                    label="Patente"
                                    value={unaPatente}
                                    onChange={event => setUnaPatente(event.target.value)}
                                />
                            </Tooltip>
                            <Button color="primary" onClick={unaPatenteHandler} disabled={patentes.length > 4}>
                                Agregar  
                            </Button>
                            <Button color="primary" onClick={editarPatentesHandler} disabled={patentes.length > 4}>
                                Editar  
                            </Button>
                        </FormControl> */}
                        <FormControl required={true} fullWidth={true}>
                            <TextField
                                id="patentes"
                                type="text"
                                label="Patentes"
                                required={true}
                                value={patentes}
                                disabled={true}
                                onChange={event => setPatentes(event.target.value)}
                            />
                            <Button color="primary" onClick={editarPatentesHandler}>
                                Editar  
                            </Button>
                        </FormControl>
                    </Grid>
                    <Grid item={true} xs={4}>
                        <FormControl fullWidth={true}>
                            <FormLabel>Datos personales</FormLabel>
                            <Tooltip title="El número de DNI sin puntos">
                                <TextField
                                    id="dni"
                                    type="number"
                                    label="DNI"
                                    required={true}
                                    value={dni}
                                    onChange={event => setDni(event.target.value)}
                                />
                            </Tooltip>
                            <TextField
                                id="apellido"
                                type="text"
                                label="Apellido"
                                required={true}
                                value={apellido}
                                onChange={event => setApellido(event.target.value)}
                            />
                            <TextField
                                id="nombre"
                                type="text"
                                label="Nombre"
                                required={true}
                                value={nombre}
                                onChange={event => setNombre(event.target.value)}
                            />
                            <TextField
                                id="fechaNacimiento"
                                type="date"
                                label="Fecha de nacimiento"
                                required={true}
                                value={fechaNacimiento}
                                onChange={event => setFechaNacimiento(event.target.value)}
                            />
                            <FormLabel component="legend">Sexo</FormLabel>                                
                            <RadioGroup value={sexo} onChange={radioHandler}>
                                <FormControlLabel value="Masculino" label="Masculino" control={<Radio color="primary" />} />
                                <FormControlLabel value="Femenino" label="Femenino" control={<Radio color="primary" />} />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item={true} xs={4}>
                        <FormControl fullWidth={true}>
                            <FormLabel>Dirección</FormLabel>
                            <Tooltip title="Si la calle del usuario no tiene nombre, escriba Calle sin nombre">
                                <TextField
                                    id="calle"
                                    type="text"
                                    label="Calle"
                                    required={true}
                                    value={calle}
                                    onChange={event => setCalle(event.target.value)}
                                />
                            </Tooltip>
                            <Tooltip title="Si la casa del usuario no tiene número, deje vacío este campo">
                                <TextField
                                    id="numero"
                                    type="number"
                                    label="Número"
                                    value={numero}
                                    onChange={event => setNumero(event.target.value)}
                                />
                            </Tooltip>
                            <Tooltip title="Si el usuario no vive en un edificio, deje vacío este campo">
                                <TextField
                                    id="piso"
                                    type="text"
                                    label="Piso"
                                    value={piso}
                                    onChange={event => setPiso(event.target.value)}
                                />
                            </Tooltip>
                            <Tooltip title="Si el usuario no vive en un edificio, deje vacío este campo">
                                <TextField
                                    id="departamento"
                                    type="text"
                                    label="Departamento"
                                    value={departamento}
                                    onChange={event => setDepartamento(event.target.value)}
                                />
                            </Tooltip>
                            <TextField
                                id="localidad"
                                type="text"
                                label="Localidad"
                                required={true}
                                value={localidad}
                                onChange={event => setLocalidad(event.target.value)}
                            />
                            <TextField
                                id="provincia"
                                type="text"
                                label="Provincia"
                                required={true}
                                value={provincia}
                                onChange={event => setProvincia(event.target.value)}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item={true} xs={4}>
                        <FormControl fullWidth={true}>
                            <FormLabel>Cuenta</FormLabel>
                            <TextField
                                id="email"
                                type="email"
                                label="Correo electrónico"
                                required={true}
                                value={email}
                                onChange={event => setEmail(event.target.value)}
                            />
                            <Tooltip title="El formato del teléfono es: +54 + código de área (sin 0) + número (sin 15)">
                                <TextField
                                    id="telefono"
                                    type="phone"
                                    label="Teléfono"
                                    required={true}
                                    value={telefono}
                                    onChange={event => setTelefono(event.target.value)}
                                />
                            </Tooltip>
                            <FormLabel component="legend">Foto</FormLabel>
                            <DropzoneArea
                                dropzoneText="Cargue aquí la foto"
                                acceptedFiles={["image/*"]}
                                filesLimit={1}
                                onChange={imageUploadHandler.bind(this)}
                            />
                        </FormControl>
                        <EditarPatentes open={props.mostrarDialogPatente} onClose={props.cerrarDialogPatentes} editar={false} />
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
        mostrarDialogPatente: state.editarUsuario.mostrarDialogPatente,
        patentes: state.editarUsuario.patentes,
        mostrarDialogEditarPerfil: state.editarUsuario.mostrarDialogEditarPerfil,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        editarUsuario: (id, usuario, editar) => {dispatch(editarUsuario(id, usuario, editar))},
        abrirDialogPatentes: () => {dispatch(abrirDialogPatentes())},
        cerrarDialogPatentes: () => {dispatch(cerrarDialogPatentes())},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(CrearUsuario));