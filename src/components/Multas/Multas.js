import React, { Component, Fragment } from 'react';
import { withRouter } from "react-router-dom";
import { Button, Typography, TableHead, TableRow, TableCell, Table, TableContainer, Paper, TableBody, CircularProgress, Container } from "@material-ui/core";
import Filtro from "../Filtro/Filtro";
import { cargarMultas } from "../../store/actions/multas";
import { connect } from 'react-redux';
import { withSnackbar } from "notistack";
import Notifier from "../Notifier/Notifier";
import { abrirDialogFiltro } from '../../store/actions/filtro';

class Multas extends Component {
    // recupero el listado de todas las multas del servidor y lo meto en el estado
    componentDidMount() {
        this.props.cargarMultas();
    }

    // metodo que carga todos los datos de una multa al hacer clic en una
    multaSeleccionadaHandler = (id) => {
        this.props.history.push("/multas/" + id);
    }

    render() {
        let numeroDeMultasSinResolver = 0; // el numero total de multas que estan sin resolver
        let textoDeMultasSinResolver = ""; // el texto que se va a mostrar debajo del h2 que da la bienvenida

        let multasFiltradas = this.props.multas.filter(multa => {
            let seDebeMostrar = true;
            if (!this.props.noResueltas && multa.estado === "No resuelta") {
                seDebeMostrar = false;
            }
            if (!this.props.aceptadas && multa.estado === "Aceptada") {
                seDebeMostrar = false;
            }
            if (!this.props.rechazadas && multa.estado === "Rechazada") {
                seDebeMostrar = false;
            }
            if (this.props.desde > multa.fecha) {
                seDebeMostrar = false;
            }
            if (this.props.hasta < multa.fecha) {
                seDebeMostrar = false;
            }
            if (this.props.dni !== "" && this.props.dni !== multa.dniConductor) {
                seDebeMostrar = false;
            }
            if (multa.estado === "No resuelta") {
                numeroDeMultasSinResolver++;
            }
            return seDebeMostrar;
        });
  
        let multasParaMostrar = multasFiltradas.map(multa => (
            <TableRow key={multa.id} hover={true} onClick={() => this.multaSeleccionadaHandler(multa.id)}>
                <TableCell>{multa.id}</TableCell>
                <TableCell>{multa.dniConductor}</TableCell>
                <TableCell>{multa.nombreConductor}</TableCell>
                <TableCell>{multa.fecha}</TableCell>
                <TableCell>{multa.extracto}</TableCell>
            </TableRow>
        ));
        
        if (numeroDeMultasSinResolver === 0) {
            textoDeMultasSinResolver = "No quedan multas sin resolver";
        } else if (numeroDeMultasSinResolver === 1) {
            textoDeMultasSinResolver = "Tiene 1 multa sin resolver";
        } else {
            textoDeMultasSinResolver = "Tiene " + numeroDeMultasSinResolver + " multas sin resolver";
        }
  
        return (
            <Container maxWidth="lg" style={{minHeight: "100vh"}}>
                <Typography variant="h3">Bienvenido, {localStorage.getItem("displayName")}</Typography>
                {this.props.cargando ? <CircularProgress /> : null}
                {!this.props.cargando && !this.props.error ?
                    <Fragment>
                        <Typography variant="h5">{textoDeMultasSinResolver}</Typography>
                        <Button variant="contained" color="primary" onClick={this.props.abrirDialogFiltro}>
                            Filtrar
                        </Button>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>DNI del conductor</TableCell>
                                        <TableCell>Nombre del conductor</TableCell>
                                        <TableCell>Fecha</TableCell>
                                        <TableCell>Extracto</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {multasParaMostrar}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Filtro />
                        <Notifier />
                    </Fragment>
                : null}
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        multas: state.multas.multas,
        cargando: state.multas.cargando,
        error: state.multas.error,
        textoDeError: state.multas.textoDeError,
        noResueltas: state.filtro.noResueltas,
        aceptadas: state.filtro.aceptadas,
        rechazadas: state.filtro.rechazadas,
        desde: state.filtro.desde,
        hasta: state.filtro.hasta,
        dni: state.filtro.dni,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        cargarMultas: () => dispatch(cargarMultas()),
        abrirDialogFiltro: () => dispatch(abrirDialogFiltro()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(withRouter(Multas)));