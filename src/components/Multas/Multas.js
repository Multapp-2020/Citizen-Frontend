import React, { Component, Fragment } from 'react';
import { withRouter } from "react-router-dom";
import { Button, Typography, TableHead, TableRow, TableCell, Table, TableContainer, Paper, TableBody, CircularProgress, Container, Tooltip } from "@material-ui/core";
import { Done, Warning, Clear } from "@material-ui/icons";
import Filtro from "../Filtro/Filtro";
import { cargarMultas, setMultaId } from "../../store/actions/multas";
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
    multaSeleccionadaHandler = (id, index) => {
        this.props.setMultaId(index + 1);
        this.props.history.push("/multas/" + id);
    }

    render() {

        let numeroDeMultasSinResolver = 0; // el numero total de multas que estan sin resolver
        // let textoDeMultasSinResolver = ""; // el texto que se va a mostrar debajo del h2 que da la bienvenida

        let multasFiltradas = this.props.multas.filter(multa => {
            let fecha = multa.fecha.split("/").reverse(); // convierte la fecha en dd/mm/aaaa a aaaa-mm-dd para comparar con los filtros
            fecha[1] = parseInt(fecha[1]); // esta idiotez es porque los meses en el constructor de Date empiezan en 0
            fecha[1]--;
            let fechaParaComparar = new Date(...fecha);
            let desde = this.props.desde.split("-");
            desde[1] = parseInt(desde[1]);
            desde[1]--;
            let desdeParaComparar = new Date(...desde);
            let hasta = this.props.hasta.split("-");
            hasta[1] = parseInt(hasta[1]);
            hasta[1]--;
            let hastaParaComparar = new Date(...hasta);
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
            if (desdeParaComparar > fechaParaComparar) {
                seDebeMostrar = false;
            }
            if (hastaParaComparar < fechaParaComparar) {
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
  
        let multasParaMostrar = multasFiltradas.map((multa, index) => (
            <TableRow key={multa.id} hover={true} onClick={() => this.multaSeleccionadaHandler(multa.id, index)} style={{ cursor: 'pointer' }} >
                <TableCell align="center">
                    <Tooltip title={multa.estado}>
                        {multa.estado === "No resuelta" ?
                            <Warning fontSize="small" style={{ fill: 'darkgoldenrod' }} />
                            : multa.estado === "Aceptada" ?
                            <Done fontSize="small" style={{ fill: 'green' }} />
                            : <Clear fontSize="small" style={{ fill: 'red' }} />
                        }
                    </Tooltip>
                </TableCell>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{multa.dniConductor}</TableCell>
                <TableCell>{multa.nombreConductor}</TableCell>
                <TableCell>{multa.fecha}</TableCell>
                <TableCell>{multa.extracto}</TableCell>
            </TableRow>
        ));
        
        /* if (numeroDeMultasSinResolver === 0) {
            textoDeMultasSinResolver = "No quedan multas sin resolver";
        } else if (numeroDeMultasSinResolver === 1) {
            textoDeMultasSinResolver = "Tiene 1 multa sin resolver";
        } else {
            textoDeMultasSinResolver = "Tiene " + numeroDeMultasSinResolver + " multas sin resolver";
        } */
  
        return (
            <Container maxWidth="lg" style={{minHeight: "100vh"}}>
                <Typography variant="h3">Bienvenido, {localStorage.getItem("displayName")}</Typography>
                {this.props.cargando ? <CircularProgress /> : null}
                {!this.props.cargando && !this.props.error ?
                    <Fragment>
                        {/* <Typography variant="h5">{textoDeMultasSinResolver}</Typography> */}
                        <Button variant="contained" color="primary" onClick={this.props.abrirDialogFiltro}>
                            Filtrar
                        </Button>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell />
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
        multaId: state.multas.multaId,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        cargarMultas: () => dispatch(cargarMultas()),
        abrirDialogFiltro: () => dispatch(abrirDialogFiltro()),
        setMultaId: (index) => dispatch(setMultaId(index)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(withRouter(Multas)));