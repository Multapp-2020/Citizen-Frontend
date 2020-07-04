import React, { Component, Fragment } from "react";
import { withRouter } from "react-router";
import axios from "axios";
import { Container, Typography, Grid, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, TextField } from "@material-ui/core";
import { Check, Close } from "@material-ui/icons";
import estilos from "./Multa.module.css";
import { connect } from "react-redux";
import { cargarMulta, cambiarEstado } from "../../store/actions/multa";

class Multa extends Component {
    state = {
        cargando: true,
        huboError: false,
        mostrarDialogAceptar: false,
        mostrarDialogRechazar: false,
        razonAceptar: "",
        razonRechazar: "",
        multa: {},
        fecha: "2020-01-01",
        hora: "12:24",
        lugar: "Plaza 25 de mayo"
    };

    componentDidMount = () => {
        axios.get("/getAll/" + this.props.id)
            .then(response => {
                console.log(response);
                this.setState({
                    cargando: false,
                    huboError: false,
                    multa: response.data,
                })
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    cargando: false,
                    huboError: true,
                })
            });
    }

    toggleDialogHandler = (accion) => {
        let nuevoEstado;
        if (accion === "aceptar") {
            nuevoEstado = !this.state.mostrarDialogAceptar;
            this.setState({mostrarDialogAceptar: nuevoEstado});
        }
        if (accion === "rechazar") {
            nuevoEstado = !this.state.mostrarDialogRechazar;
            this.setState({mostrarDialogRechazar: nuevoEstado});
        }
    }

    inputHandler = (event) => {
        this.setState({[event.target.id]: event.target.value});
    }

    render() {
        return (
            <Fragment>
                <Container>
                    <Typography variant="h3">Detalles de la multa {this.props.id}</Typography>
                    <Grid container={true} spacing={1}>
                        <Grid item={true} xs={12}>
                            <Paper elevation={3} className={estilos.GridItem}>
                                <Typography variant="h6">Ubicación</Typography>
                                <Grid container={true} spacing={3}>
                                    <Grid item={true}>
                                        <Typography variant="overline">Fecha</Typography>
                                        <Typography variant="body2">{this.state.fecha}</Typography>
                                    </Grid>
                                    <Grid item={true}>
                                        <Typography variant="overline">Hora</Typography>
                                        <Typography variant="body2">{this.state.hora}</Typography>
                                    </Grid>
                                    <Grid item={true}>
                                        <Typography variant="overline">Lugar de constatación</Typography>
                                        <Typography variant="body2">{this.state.lugar}</Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item={true} xs={12}>
                            <Paper elevation={3} className={estilos.GridItem}>
                                <Typography variant="h6">Licencia</Typography>
                                <Grid container={true} spacing={3}>
                                    <Grid item={true}>
                                        <Typography variant="overline">Número de licencia</Typography>
                                        <Typography variant="body2">{this.state.nroLicencia}</Typography>
                                    </Grid>
                                    <Grid item={true}>
                                        <Typography variant="overline">Única provincial</Typography>
                                        <Typography variant="body2">{this.state.unicaProvincial}</Typography>
                                    </Grid>
                                    <Grid item={true}>
                                        <Typography variant="overline">Clase</Typography>
                                        <Typography variant="body2">{this.state.clase}</Typography>
                                    </Grid>
                                    <Grid item={true}>
                                        <Typography variant="overline">Vencimiento</Typography>
                                        <Typography variant="body2">{this.state.vencimiento}</Typography>
                                    </Grid>
                                    <Grid item={true}>
                                        <Typography variant="overline">Licencia retenida</Typography>
                                        <Typography variant="body2">{this.state.retenida}</Typography>
                                    </Grid>
                                    <Grid item={true}>
                                        <Typography variant="overline">País</Typography>
                                        <Typography variant="body2">{this.state.paisLicencia}</Typography>
                                    </Grid>
                                    <Grid item={true}>
                                        <Typography variant="overline">Provincia</Typography>
                                        <Typography variant="body2">{this.state.provinciaLicencia}</Typography>
                                    </Grid>
                                    <Grid item={true}>
                                        <Typography variant="overline">Departamento</Typography>
                                        <Typography variant="body2">{this.state.departamentoLicencia}</Typography>
                                    </Grid>
                                    <Grid item={true}>
                                        <Typography variant="overline">Localidad</Typography>
                                        <Typography variant="body2">{this.state.localidadLicencia}</Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item={true} xs={12}>
                            <Paper elevation={3} className={estilos.GridItem}>
                                <Typography variant="h6">Conductor</Typography>
                                <Grid container={true} spacing={3}>
                                    <Grid item={true}>
                                        <Typography variant="overline">Apellido</Typography>
                                        <Typography variant="body2">{this.state.apellidoConductor}</Typography>
                                    </Grid>
                                    <Grid item={true}>
                                        <Typography variant="overline">Nombre</Typography>
                                        <Typography variant="body2">{this.state.nombreConductor}</Typography>
                                    </Grid>
                                    <Grid item={true}>
                                        <Typography variant="overline">Sexo</Typography>
                                        <Typography variant="body2">{this.state.sexoConductor}</Typography>
                                    </Grid>
                                    <Grid item={true}>
                                        <Typography variant="overline">Fecha de nacimiento</Typography>
                                        <Typography variant="body2">{this.state.fechaNacimiento}</Typography>
                                    </Grid>
                                    <Grid item={true}>
                                        <Typography variant="overline">Tipo de documento</Typography>
                                        <Typography variant="body2">{this.state.tipoDocumentoConductor}</Typography>
                                    </Grid>
                                    <Grid item={true}>
                                        <Typography variant="overline">Número de documento</Typography>
                                        <Typography variant="body2">{this.state.nroDocumentoConductor}</Typography>
                                    </Grid>
                                    <Grid item={true}>
                                        <Typography variant="overline">Calle</Typography>
                                        <Typography variant="body2">{this.state.calleConductor}</Typography>
                                    </Grid>
                                    <Grid item={true}>
                                        <Typography variant="overline">Número</Typography>
                                        <Typography variant="body2">{this.state.numeroConductor}</Typography>
                                    </Grid>
                                    <Grid item={true}>
                                        <Typography variant="overline">Piso</Typography>
                                        <Typography variant="body2">{this.state.pisoConductor}</Typography>
                                    </Grid>
                                    <Grid item={true}>
                                        <Typography variant="overline">Departamento</Typography>
                                        <Typography variant="body2">{this.state.departamentoConductor}</Typography>
                                    </Grid>
                                    <Grid item={true}>
                                        <Typography variant="overline">Localidad</Typography>
                                        <Typography variant="body2">{this.state.localidadConductor}</Typography>
                                    </Grid>
                                    <Grid item={true}>
                                        <Typography variant="overline">Código postal</Typography>
                                        <Typography variant="body2">{this.state.codigoPostalConductor}</Typography>
                                    </Grid>
                                    <Grid item={true}>
                                        <Typography variant="overline">Provincia</Typography>
                                        <Typography variant="body2">{this.state.provinciaConductor}</Typography>
                                    </Grid>
                                    <Grid item={true}>
                                        <Typography variant="overline">País</Typography>
                                        <Typography variant="body2">{this.state.paisConductor}</Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item={true} xs={12}>
                            <Paper elevation={3} className={estilos.GridItem}>
                                <Typography variant="h6">Vehículo</Typography>
                                <Grid container={true} spacing={3}>
                                    <Grid item={true}>
                                        <Typography variant="overline">Dominio</Typography>
                                        <Typography variant="body2">{this.state.dominio}</Typography>
                                    </Grid>
                                    <Grid item={true}>
                                        <Typography variant="overline">Marca</Typography>
                                        <Typography variant="body2">{this.state.marca}</Typography>
                                    </Grid>
                                    <Grid item={true}>
                                        <Typography variant="overline">Modelo</Typography>
                                        <Typography variant="body2">{this.state.modelo}</Typography>
                                    </Grid>
                                    <Grid item={true}>
                                        <Typography variant="overline">Tipo</Typography>
                                        <Typography variant="body2">{this.state.tipo}</Typography>
                                    </Grid>
                                    <Grid item={true}>
                                        <Typography variant="overline">Titular</Typography>
                                        <Typography variant="body2">{this.state.titular}</Typography>
                                    </Grid>
                                    <Grid item={true}>
                                        <Typography variant="overline">Tipo de documento</Typography>
                                        <Typography variant="body2">{this.state.tipoDocumentoTitular}</Typography>
                                    </Grid>
                                    <Grid item={true}>
                                        <Typography variant="overline">Número de documento</Typography>
                                        <Typography variant="body2">{this.state.nroDocumentoTitular}</Typography>
                                    </Grid>
                                    <Grid item={true}>
                                        <Typography variant="overline">Calle</Typography>
                                        <Typography variant="body2">{this.state.calleTitular}</Typography>
                                    </Grid>
                                    <Grid item={true}>
                                        <Typography variant="overline">Número</Typography>
                                        <Typography variant="body2">{this.state.numeroTitular}</Typography>
                                    </Grid>
                                    <Grid item={true}>
                                        <Typography variant="overline">Piso</Typography>
                                        <Typography variant="body2">{this.state.pisoTitular}</Typography>
                                    </Grid>
                                    <Grid item={true}>
                                        <Typography variant="overline">Departamento</Typography>
                                        <Typography variant="body2">{this.state.departamentoTitular}</Typography>
                                    </Grid>
                                    <Grid item={true}>
                                        <Typography variant="overline">Localidad</Typography>
                                        <Typography variant="body2">{this.state.localidadTitular}</Typography>
                                    </Grid>
                                    <Grid item={true}>
                                        <Typography variant="overline">Código postal</Typography>
                                        <Typography variant="body2">{this.state.codigoPostalTitular}</Typography>
                                    </Grid>
                                    <Grid item={true}>
                                        <Typography variant="overline">Provincia</Typography>
                                        <Typography variant="body2">{this.state.provinciaTitular}</Typography>
                                    </Grid>
                                    <Grid item={true}>
                                        <Typography variant="overline">País</Typography>
                                        <Typography variant="body2">{this.state.paisTitular}</Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item={true} xs={12}>
                            <Paper elevation={3} className={estilos.GridItem}>
                                <Typography variant="h6">Infracción</Typography>
                                <Grid container={true} spacing={3}>
                                    <Grid item={true}>
                                        <Typography variant="overline">Código de infracción</Typography>
                                        <Typography variant="body2">{this.state.codigoInfraccion}</Typography>
                                    </Grid>
                                    <Grid item={true}>
                                        <Typography variant="overline">Artículo nº</Typography>
                                        <Typography variant="body2">{this.state.articulo}</Typography>
                                    </Grid>
                                    <Grid item={true}>
                                        <Typography variant="overline">Inciso nº</Typography>
                                        <Typography variant="body2">{this.state.inciso}</Typography>
                                    </Grid>
                                    <Grid item={true}>
                                        <Typography variant="overline">Extracto</Typography>
                                        <Typography variant="body2">{this.state.extracto}</Typography>
                                    </Grid>
                                    <Grid item={true}>
                                        <Typography variant="overline">Observaciones</Typography>
                                        <Typography variant="body2">{this.state.observaciones}</Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item={true} xs={12}>
                            <Paper elevation={3} className={estilos.GridItem}>
                                <Typography variant="h6">Funcionario interviniente</Typography>
                                <Grid container={true} spacing={3}>
                                    <Grid item={true}>
                                        <Typography variant="overline">Nombre</Typography>
                                        <Typography variant="body2">{this.state.nombreInspector}</Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item={true} xs={12}>
                            <Paper elevation={3} className={estilos.GridItem}>
                                <Typography variant="h6">Pruebas fotográficas</Typography>
                                {this.state.imagenes ? 
                                    <Grid container={true} spacing={1}>
                                        {this.state.imagenes.map(imagen => (
                                            <Grid item={true}>
                                                <img src={imagen} />
                                            </Grid>
                                        ))}
                                    </Grid>
                                : <Typography variant="body2">El inspector no adjuntó pruebas fotográficas</Typography>}
                            </Paper>
                        </Grid>
                        <Grid item={true} xs={12}>
                            <Paper elevation={3} className={estilos.GridItem}>
                                <Typography variant="h6">Vencimientos</Typography>
                                <Grid container={true} spacing={3}>
                                    <Grid item={true} xs={6}>
                                        <Typography variant="overline">Primer vencimiento</Typography>
                                        <Typography variant="body2">{this.state.fechaPrimerVencimiento}</Typography>
                                    </Grid>
                                    <Grid item={true} xs={6}>
                                        <Typography variant="overline">Monto</Typography>
                                        <Typography variant="body2">{this.state.montoPrimerVencimiento}</Typography>
                                    </Grid>
                                    <Grid item={true} xs={6}>
                                        <Typography variant="overline">Segundo vencimiento</Typography>
                                        <Typography variant="body2">{this.state.fechaSegundoVencimiento}</Typography>
                                    </Grid>
                                    <Grid item={true} xs={6}>
                                        <Typography variant="overline">Monto</Typography>
                                        <Typography variant="body2">{this.state.montoSegundoVencimiento}</Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Typography>Estado de la multa: </Typography>
                    <Typography>{this.estado}</Typography>
                    <Grid container={true}>
                        <Grid item={true} xs={6}>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth={true}
                                size="large"
                                startIcon={<Check />}
                                onClick={() => this.toggleDialogHandler("aceptar")}
                            >
                                Aceptar multa
                            </Button>
                        </Grid>
                        <Grid item={true} xs={6}>
                            <Button
                                variant="contained"
                                color="secondary"
                                fullWidth={true}
                                size="large"
                                startIcon={<Close />}
                                onClick={() => this.toggleDialogHandler("rechazar")}
                            >
                                Rechazar multa
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
                <Dialog open={this.state.mostrarDialogAceptar} onClose={() => this.toggleDialogHandler("aceptar")}>
                    <DialogTitle>
                        Aceptar multa
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            ¿Está seguro de que quiere aceptar esta multa?. Debe brindar una razón.
                        </DialogContentText>
                        <TextField
                            id="razonAceptar"
                            label="Razón para aceptar la multa"
                            multiline={true}
                            rows={4}
                            fullWidth={true}
                            value={this.state.razonAceptar}
                            onChange={this.inputHandler}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.toggleDialogHandler("aceptar")}>Cancelar</Button>
                        <Button
                            color="primary"
                            disabled={this.state.razonRechazar === ""}
                            onClick={() => this.props.cambiarEstado(this.props.multa.id, "Aceptada", this.state.razonAceptar)}
                        >
                            Aceptar multa
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={this.state.mostrarDialogRechazar} onClose={() => this.toggleDialogHandler("rechazar")}>
                    <DialogTitle>
                        Rechazar multa
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            ¿Está seguro de que quiere rechazar esta multa?. Debe brindar una razón.
                        </DialogContentText>
                        <TextField
                            id="razonRechazar"
                            label="Razón para rechazar la multa"
                            multiline={true}
                            rows={4}
                            fullWidth={true}
                            value={this.state.razonRechazar}
                            onChange={this.inputHandler}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.toggleDialogHandler("rechazar")}>Cancelar</Button>
                        <Button
                            color="primary"
                            disabled={this.state.razonRechazar === ""}
                            onClick={() => this.props.cambiarEstado(this.props.multa.id, "Rechazada", this.state.razonRechazar)}
                        >
                            Rechazar multa
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        multa: state.multa,
        cargando: state.cargando,
        error: state.error,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        cargarMulta: (id) => {dispatch(cargarMulta(id))},
        cambiarEstado: (id, estado, razon) => {dispatch(cambiarEstado(id, estado, razon))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Multa));