import React, { Component, Fragment } from "react";
import { withRouter } from "react-router";
import { Container, Typography, Grid, Paper, Button, CircularProgress, } from "@material-ui/core";
import { Check, Close, LocationOn, Person, DirectionsCar, Gavel, PhotoCamera, InsertInvitation, ContactMail, Warning, Done, Clear, AccountCircle } from "@material-ui/icons";
import estilos from "./Multa.module.css";
import { connect } from "react-redux";
import { cargarMulta } from "../../store/actions/multa";
import { withSnackbar } from "notistack";
import Notifier from "../Notifier/Notifier";
import ResolverMulta from "../ResolverMulta/ResolverMulta";
import { abrirDialogResolver } from "../../store/actions/resolverMulta";
import CustomImagePreview from "../CustomImagePreview/CustomImagePreview";

class Multa extends Component {
    state = {
        accion: "aceptar",
    };

    componentDidMount = () => {
        const id = this.props.location.pathname.concat("").split("/")[2];
        this.props.cargarMulta(id);
    }

    toggleDialogHandler = (accion) => {
        this.setState({accion: accion}, () => this.props.abrirDialogResolver());
    }

    render() {

        console.log('PROPS DE SINGLEMULTA.JS');
        console.log(this.props);

        return (
            <Fragment>
                {this.props.cargando ? <CircularProgress /> : null}
                {!this.props.cargando && !this.props.errorAlCargar ?
                    <Fragment>
                        <Container>
                            {this.props.multaId > 0 ?
                                <Typography variant="h3">Detalles de la multa con id. {this.props.multaId}</Typography>
                            : 
                            <Typography variant="h3">Detalles de multa</Typography>
                            }
                            <Grid container={true} spacing={1}>
                                <Grid item={true} xs={12}>
                                    <Paper elevation={3} className={estilos.GridItem}>
                                        <Typography variant="h6">
                                            <LocationOn />
                                            Ubicación
                                        </Typography>
                                        <Grid container={true} spacing={3}>
                                            <Grid item={true}>
                                                <Typography variant="overline">Fecha</Typography>
                                                <Typography variant="body2">{this.props.multa.ubicacion.fecha}</Typography>
                                            </Grid>
                                            <Grid item={true}>
                                                <Typography variant="overline">Hora</Typography>
                                                <Typography variant="body2">{this.props.multa.ubicacion.hora}</Typography>
                                            </Grid>
                                            <Grid item={true}>
                                                <Typography variant="overline">Lugar de constatación</Typography>
                                                <Typography variant="body2">{this.props.multa.ubicacion.lugar}</Typography>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>
                                <Grid item={true} xs={12}>
                                    <Paper elevation={3} className={estilos.GridItem}>
                                        <Typography variant="h6">
                                            <ContactMail />
                                            Licencia
                                        </Typography>
                                        <Grid container={true} spacing={3}>
                                            <Grid item={true}>
                                                <Typography variant="overline">Número de licencia</Typography>
                                                <Typography variant="body2">{this.props.multa.licencia.numero}</Typography>
                                            </Grid>
                                            <Grid item={true}>
                                                <Typography variant="overline">Única provincial</Typography>
                                                <Typography variant="body2">{this.props.multa.licencia.unicaProvincial}</Typography>
                                            </Grid>
                                            <Grid item={true}>
                                                <Typography variant="overline">Clase</Typography>
                                                <Typography variant="body2">{this.props.multa.licencia.clase}</Typography>
                                            </Grid>
                                            <Grid item={true}>
                                                <Typography variant="overline">Vencimiento</Typography>
                                                <Typography variant="body2">{this.props.multa.licencia.vencimiento}</Typography>
                                            </Grid>
                                            <Grid item={true}>
                                                <Typography variant="overline">Licencia retenida</Typography>
                                                <Typography variant="body2">{this.props.multa.licencia.retenida}</Typography>
                                            </Grid>
                                            <Grid item={true}>
                                                <Typography variant="overline">País</Typography>
                                                <Typography variant="body2">{this.props.multa.licencia.pais}</Typography>
                                            </Grid>
                                            <Grid item={true}>
                                                <Typography variant="overline">Provincia</Typography>
                                                <Typography variant="body2">{this.props.multa.licencia.provincia}</Typography>
                                            </Grid>
                                            <Grid item={true}>
                                                <Typography variant="overline">Departamento</Typography>
                                                <Typography variant="body2">{this.props.multa.licencia.departamento}</Typography>
                                            </Grid>
                                            <Grid item={true}>
                                                <Typography variant="overline">Localidad</Typography>
                                                <Typography variant="body2">{this.props.multa.licencia.localidad}</Typography>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>
                                <Grid item={true} xs={12}>
                                    <Paper elevation={3} className={estilos.GridItem}>
                                        <Typography variant="h6">
                                            <Person />
                                            Conductor
                                        </Typography>
                                        <Grid container={true} spacing={3}>
                                            <Grid item={true}>
                                                <Typography variant="overline">Apellido</Typography>
                                                <Typography variant="body2">{this.props.multa.conductor.apellido}</Typography>
                                            </Grid>
                                            <Grid item={true}>
                                                <Typography variant="overline">Nombre</Typography>
                                                <Typography variant="body2">{this.props.multa.conductor.nombre}</Typography>
                                            </Grid>
                                            <Grid item={true}>
                                                <Typography variant="overline">Sexo</Typography>
                                                <Typography variant="body2">{this.props.multa.conductor.sexo}</Typography>
                                            </Grid>
                                            <Grid item={true}>
                                                <Typography variant="overline">Fecha de nacimiento</Typography>
                                                <Typography variant="body2">{this.props.multa.conductor.fechaNacimiento}</Typography>
                                            </Grid>
                                            <Grid item={true}>
                                                <Typography variant="overline">Tipo de documento</Typography>
                                                <Typography variant="body2">{this.props.multa.conductor.tipoDocumento}</Typography>
                                            </Grid>
                                            <Grid item={true}>
                                                <Typography variant="overline">Número de documento</Typography>
                                                <Typography variant="body2">{this.props.multa.conductor.nroDocumento}</Typography>
                                            </Grid>
                                            <Grid item={true}>
                                                <Typography variant="overline">Calle</Typography>
                                                <Typography variant="body2">{this.props.multa.conductor.calle}</Typography>
                                            </Grid>
                                            <Grid item={true}>
                                                <Typography variant="overline">Número</Typography>
                                                <Typography variant="body2">{this.props.multa.conductor.numero}</Typography>
                                            </Grid>
                                            <Grid item={true}>
                                                <Typography variant="overline">Piso</Typography>
                                                <Typography variant="body2">{this.props.multa.conductor.piso}</Typography>
                                            </Grid>
                                            <Grid item={true}>
                                                <Typography variant="overline">Departamento</Typography>
                                                <Typography variant="body2">{this.props.multa.conductor.departamento}</Typography>
                                            </Grid>
                                            <Grid item={true}>
                                                <Typography variant="overline">Localidad</Typography>
                                                <Typography variant="body2">{this.props.multa.conductor.localidad}</Typography>
                                            </Grid>
                                            <Grid item={true}>
                                                <Typography variant="overline">Código postal</Typography>
                                                <Typography variant="body2">{this.props.multa.conductor.codigoPostal}</Typography>
                                            </Grid>
                                            <Grid item={true}>
                                                <Typography variant="overline">Provincia</Typography>
                                                <Typography variant="body2">{this.props.multa.conductor.provincia}</Typography>
                                            </Grid>
                                            <Grid item={true}>
                                                <Typography variant="overline">País</Typography>
                                                <Typography variant="body2">{this.props.multa.conductor.pais}</Typography>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>
                                <Grid item={true} xs={12}>
                                    <Paper elevation={3} className={estilos.GridItem}>
                                        <Typography variant="h6">
                                            <DirectionsCar />
                                            Vehículo
                                        </Typography>
                                        <Grid container={true} spacing={3}>
                                            <Grid item={true}>
                                                <Typography variant="overline">Dominio</Typography>
                                                <Typography variant="body2">{this.props.multa.vehiculo.dominio}</Typography>
                                            </Grid>
                                            <Grid item={true}>
                                                <Typography variant="overline">Marca</Typography>
                                                <Typography variant="body2">{this.props.multa.vehiculo.marca}</Typography>
                                            </Grid>
                                            <Grid item={true}>
                                                <Typography variant="overline">Modelo</Typography>
                                                <Typography variant="body2">{this.props.multa.vehiculo.modelo}</Typography>
                                            </Grid>
                                            <Grid item={true}>
                                                <Typography variant="overline">Tipo</Typography>
                                                <Typography variant="body2">{this.props.multa.vehiculo.tipo}</Typography>
                                            </Grid>
                                            <Grid item={true}>
                                                <Typography variant="overline">Titular</Typography>
                                                <Typography variant="body2">{this.props.multa.vehiculo.titular}</Typography>
                                            </Grid>
                                            <Grid item={true}>
                                                <Typography variant="overline">Tipo de documento</Typography>
                                                <Typography variant="body2">{this.props.multa.vehiculo.tipoDocumento}</Typography>
                                            </Grid>
                                            <Grid item={true}>
                                                <Typography variant="overline">Número de documento</Typography>
                                                <Typography variant="body2">{this.props.multa.vehiculo.nroDocumento}</Typography>
                                            </Grid>
                                            <Grid item={true}>
                                                <Typography variant="overline">Calle</Typography>
                                                <Typography variant="body2">{this.props.multa.vehiculo.calle}</Typography>
                                            </Grid>
                                            <Grid item={true}>
                                                <Typography variant="overline">Número</Typography>
                                                <Typography variant="body2">{this.props.multa.vehiculo.numero}</Typography>
                                            </Grid>
                                            <Grid item={true}>
                                                <Typography variant="overline">Piso</Typography>
                                                <Typography variant="body2">{this.props.multa.vehiculo.piso}</Typography>
                                            </Grid>
                                            <Grid item={true}>
                                                <Typography variant="overline">Departamento</Typography>
                                                <Typography variant="body2">{this.props.multa.vehiculo.departamento}</Typography>
                                            </Grid>
                                            <Grid item={true}>
                                                <Typography variant="overline">Localidad</Typography>
                                                <Typography variant="body2">{this.props.multa.vehiculo.localidad}</Typography>
                                            </Grid>
                                            <Grid item={true}>
                                                <Typography variant="overline">Código postal</Typography>
                                                <Typography variant="body2">{this.props.multa.vehiculo.codigoPostal}</Typography>
                                            </Grid>
                                            <Grid item={true}>
                                                <Typography variant="overline">Provincia</Typography>
                                                <Typography variant="body2">{this.props.multa.vehiculo.provincia}</Typography>
                                            </Grid>
                                            <Grid item={true}>
                                                <Typography variant="overline">País</Typography>
                                                <Typography variant="body2">{this.props.multa.vehiculo.pais}</Typography>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>
                                <Grid item={true} xs={12}>
                                    <Paper elevation={3} className={estilos.GridItem}>
                                        <Typography variant="h6">
                                            <Gavel />
                                            Infracción
                                        </Typography>
                                        <Grid container={true} spacing={3}>
                                            <Grid item={true}>
                                                <Typography variant="overline">Código de infracción</Typography>
                                                <Typography variant="body2">{this.props.multa.infraccion.codigo}</Typography>
                                            </Grid>
                                            <Grid item={true}>
                                                <Typography variant="overline">Artículo nº</Typography>
                                                <Typography variant="body2">{this.props.multa.infraccion.articulo}</Typography>
                                            </Grid>
                                            <Grid item={true}>
                                                <Typography variant="overline">Inciso nº</Typography>
                                                <Typography variant="body2">{this.props.multa.infraccion.inciso}</Typography>
                                            </Grid>
                                            <Grid item={true}>
                                                <Typography variant="overline">Extracto</Typography>
                                                <Typography variant="body2">{this.props.multa.infraccion.extracto}</Typography>
                                            </Grid>
                                            <Grid item={true}>
                                                <Typography variant="overline">Observaciones</Typography>
                                                <Typography variant="body2">{this.props.multa.infraccion.observaciones}</Typography>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>
                                <Grid item={true} xs={12}>
                                    <Paper elevation={3} className={estilos.GridItem}>
                                        <Typography variant="h6">
                                            <AccountCircle />
                                            Funcionario interviniente
                                        </Typography>
                                        <Grid container={true} spacing={3}>
                                            <Grid item={true}>
                                                <Typography variant="overline">Nombre</Typography>
                                                <Typography variant="body2">{this.props.multa.nombreInspector}</Typography>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>
                                <Grid item={true} xs={12}>
                                    <Paper elevation={3} className={estilos.GridItem}>
                                        <Typography variant="h6">
                                            <PhotoCamera />
                                            Pruebas fotográficas
                                        </Typography>
                                        {this.props.multa.fotos.length > 0 ? 
                                            <Grid container={true} spacing={1}>
                                                {/* {this.props.multa.fotos.map(foto => (
                                                    <Grid item={true}>
                                                        <img src={foto} />
                                                    </Grid>
                                                ))} */}
                                                <CustomImagePreview uris={this.props.multa.fotos} />
                                            </Grid>
                                        : <Typography variant="body2">El inspector no adjuntó pruebas fotográficas</Typography>}
                                    </Paper>
                                </Grid>
                                <Grid item={true} xs={12}>
                                    <Paper elevation={3} className={estilos.GridItem}>
                                        <Typography variant="h6">
                                            <InsertInvitation />
                                            Vencimientos
                                        </Typography>
                                        <Grid container={true} spacing={3}>
                                            <Grid item={true} xs={6}>
                                                <Typography variant="overline">Primer vencimiento</Typography>
                                                <Typography variant="body2">{this.props.multa.vencimientos.fechaPrimerVencimiento}</Typography>
                                            </Grid>
                                            <Grid item={true} xs={6}>
                                                <Typography variant="overline">Monto</Typography>
                                                <Typography variant="body2">${this.props.multa.vencimientos.montoPrimerVencimiento}</Typography>
                                            </Grid>
                                            <Grid item={true} xs={6}>
                                                <Typography variant="overline">Segundo vencimiento</Typography>
                                                <Typography variant="body2">{this.props.multa.vencimientos.fechaSegundoVencimiento}</Typography>
                                            </Grid>
                                            <Grid item={true} xs={6}>
                                                <Typography variant="overline">Monto</Typography>
                                                <Typography variant="body2">${this.props.multa.vencimientos.montoSegundoVencimiento}</Typography>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>
                                <Grid item={true} xs={12}>
                                    <Paper elevation={3} className={estilos.GridItem}>
                                        <Typography variant="h6">
                                            {this.props.multa.estado === "No resuelta" ? <Warning /> :
                                                this.props.multa.estado === "Aceptada" ? <Done /> : <Clear />
                                            }
                                            Estado
                                        </Typography>
                                        <Grid container={true} spacing={3}>
                                            <Grid item={true} xs={6}>
                                                <Typography variant="overline">Estado de la multa</Typography>
                                                <Typography variant="body2">{this.props.multa.estado}</Typography>
                                            </Grid>
                                            {this.props.multa.estado === "Aceptada" || this.props.multa.estado === "Rechazada" ?
                                                <Fragment>
                                                    <Grid item={true} xs={6}>
                                                        <Typography variant="overline">Razón</Typography>
                                                        <Typography variant="body2">{this.props.multa.razon}</Typography>
                                                    </Grid>
                                                    <Grid item={true} xs={6}>
                                                        <Typography variant="overline">Supervisor</Typography>
                                                        <Typography variant="body2">{this.props.multa.nombreSupervisor}</Typography>
                                                    </Grid>
                                                </Fragment>
                                            : null}
                                        </Grid>
                                    </Paper>
                                </Grid>
                                {/* {this.props.multa.estado === "No resuelta" ?
                                    <Fragment>
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
                                    </Fragment>
                                : null} */}
                            </Grid>
                        </Container>
                        <ResolverMulta
                            open={this.state.mostrarDialog}
                            onClose={() => this.setState({mostrarDialog: false})}
                            accion={this.state.accion}
                        />
                        <Notifier />
                    </Fragment>
                : null }
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        multa: state.multa.multa,
        cargando: state.multa.cargando,
        errorAlCargar: state.multa.errorAlCargar,
        textoDeErrorAlCargar: state.multa.textoDeErrorAlCargar,
        multaId: state.multas.multaId,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        cargarMulta: id => dispatch(cargarMulta(id)),
        abrirDialogResolver: () => dispatch(abrirDialogResolver()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(withRouter(Multa)));