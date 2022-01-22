import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button, Card } from "react-bootstrap";
import PlaceServices from '../../sevices/masterServices/PlaceServices';
import Sidebar from '../menus/Sidebar';
// import TableScrollbar from "react-table-scrollbar";
import {
    // Backdrop, CircularProgress,
    makeStyles, IconButton, Snackbar,
    Table, TableBody, TableCell, TableHead, TableRow, TableContainer
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
// import { removeUserSession } from '../Utils/Common';


const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: "black",
        color: '#fff',
    },
    container: {
        margin: theme.spacing(1),
        width: "100%",
        maxHeight: 300,
    },
}));
function StateComponent(props) {
    const classes = useStyles();
    const [notefy, setNotedfy] = useState(false);
    const [product, setProduct] = useState([]);
    const [drpcountry, setDrpcountry] = useState([]);
    const [loading, setLoading] = useState(false);
    const [updateing, setUpdateing] = useState(false);
    const [deleteing, setDeleting] = useState(false);
    // const [open, setOpen] = useState(true);
    // const [error, setError] = useState(false);
    const [validated, setValidated] = useState(false);
    const [values, setValues] = useState({
        drp_countryId: '',
        txt_stateid: 0,
        txt_selectedCountryID: '',
        txt_stateName: '',
        txt_stateCode: '',
        txt_customsStateCode: '',
        txt_infoMassage: ''
    });

    const serviceData = async () => {
        PlaceServices.getState().then((res) => {
            setProduct(res.data);
            // setOpen(false)
            // setError(false)
        }).catch(error => {
            // setValues({ txt_infoMassage: error.message })
            // setError(true)
        })
        PlaceServices.getCountry().then((res) => {
            setDrpcountry(res.data);
        })
    };

    useEffect(() => {
        serviceData();
    }, []);
    const isDisabled = () => {
        if (values.txt_stateid !== 0) {
            return false
        } else {
            return true
        }
    };
    const submit = () => {
        if (values.txt_stateid !== 0) {
            return true
        } else {
            return false
        }
    };

    const changeStateNameHandler = (event) => {
        setValues({ ...values, txt_stateName: event.target.value.replace(/[^a-zA-Z ]/ig, '') });
    }
    const changeStateCodeHandler = (event) => {
        setValues({ ...values, txt_stateCode: event.target.value.replace(/[^a-zA-Z ]/ig, '') });
    }
    const changeCustomStateCodeHandler = (event) => {
        setValues({ ...values, txt_customsStateCode: event.target.value.replace(/[^0-9]/ig, '') });
    }

    const addState = (e) => {
        e.preventDefault();
        let StateDetails = {
            countryId: values.drp_countryId, stateName: values.txt_stateName,
            stateCode: values.txt_stateCode, customsStateCode: values.txt_customsStateCode
        };
        setLoading(true);
        //insert Data
        PlaceServices.addState(StateDetails).then(res => {
            console.log('Code  =>' + JSON.stringify(res.data.message));
            setNotedfy(true);
            setValues({
                txt_infoMassage: res.data.message,
                drp_countryId: '',
                txt_selectedCountryID: '',
                txt_stateid: 0,
                txt_stateName: '',
                txt_stateCode: '',
                txt_customsStateCode: ''
            });
            //then get data
            PlaceServices.getState().then(res => {
                setProduct(res.data);
                setValidated(false);
                setLoading(false);
                //caatch black
            }).catch(error => {
                setValues({
                    txt_infoMassage: error.message,
                    drp_countryId: '',
                    txt_selectedCountryID: '',
                    txt_stateid: 0,
                    txt_stateName: '',
                    txt_stateCode: '',
                    txt_customsStateCode: ''
                });
                setLoading(false);
                setNotedfy(true);
            })
        }).catch(error => {
            if (values.drp_countryId === '') {
                setValues({
                    drp_countryId: '',
                    txt_selectedCountryID: '',
                    txt_stateid: 0,
                    txt_stateName: '',
                    txt_stateCode: '',
                    txt_customsStateCode: ''
                });
                setValidated(true);
                setLoading(false);
            }
            else if (values.txt_stateName === '') {
                setValues({
                    drp_countryId: '',
                    txt_selectedCountryID: '',
                    txt_stateid: 0,
                    txt_stateName: '',
                    txt_stateCode: '',
                    txt_customsStateCode: ''
                });
                setValidated(true);
                setLoading(false);
            }
            else if (values.txt_stateCode === '') {
                setValues({
                    drp_countryId: '',
                    txt_selectedCountryID: '',
                    txt_stateid: 0,
                    txt_stateName: '',
                    txt_stateCode: '',
                    txt_customsStateCode: ''
                });
                setValidated(true);
                setLoading(false);
            }
            else if (values.txt_customsStateCode === '') {
                setValues({
                    drp_countryId: '',
                    txt_selectedCountryID: '',
                    txt_stateid: 0,
                    txt_stateName: '',
                    txt_stateCode: '',
                    txt_customsStateCode: ''
                });
                setValidated(true);
                setLoading(false);
            }
            else {
                setValues({
                    txt_infoMassage: error.message,
                    drp_countryId: '',
                    txt_selectedCountryID: '',
                    txt_stateid: 0,
                    txt_stateName: '',
                    txt_stateCode: '',
                    txt_customsStateCode: ''
                });
                setNotedfy(true);
                setValidated(true);
                setLoading(false);
            }
        });
    }
    //update
    const updateState = (e) => {
        e.preventDefault();
        let StateDetails = {
            countryId: values.drp_countryId, stateName: values.txt_stateName,
            stateCode: values.txt_stateCode, customsStateCode: values.txt_customsStateCode
        };
        setUpdateing(true);
        PlaceServices.updateState(values.txt_stateid, StateDetails).then(res => {
            setValues({
                txt_infoMassage: res.data.message,
                drp_countryId: '',
                txt_selectedCountryID: '',
                txt_stateid: 0,
                txt_stateName: '',
                txt_stateCode: '',
                txt_customsStateCode: ''
            });
            setNotedfy(true);
            PlaceServices.getState().then((res) => {
                setProduct(res.data);
                setValidated(false);
                setUpdateing(false);
                //catch black
            }).catch(error => {
                setValues({
                    txt_infoMassage: error.res.data.message,
                    drp_countryId: '',
                    txt_selectedCountryID: '',
                    txt_stateid: 0,
                    txt_stateName: '',
                    txt_stateCode: '',
                    txt_customsStateCode: ''
                });
                setUpdateing(false);
                setNotedfy(true);
            })
            //catch black 
        }).catch(error => {
            if (values.drp_countryId === '') {
                setValues({
                    drp_countryId: '',
                    txt_selectedCountryID: '',
                    txt_stateid: 0,
                    txt_stateName: '',
                    txt_stateCode: '',
                    txt_customsStateCode: ''
                });
                setValidated(true);
                setUpdateing(false);
            }
            else if (values.txt_stateName === '') {
                setValues({
                    drp_countryId: '',
                    txt_selectedCountryID: '',
                    txt_stateid: 0,
                    txt_stateName: '',
                    txt_stateCode: '',
                    txt_customsStateCode: ''
                });
                setValidated(true);
                setUpdateing(false);
            }
            else if (values.txt_stateCode === '') {
                setValues({
                    drp_countryId: '',
                    txt_selectedCountryID: '',
                    txt_stateid: 0,
                    txt_stateName: '',
                    txt_stateCode: '',
                    txt_customsStateCode: ''
                });
                setValidated(true);
                setUpdateing(false);
            }
            else if (values.txt_customsStateCode === '') {
                setValues({
                    drp_countryId: '',
                    txt_selectedCountryID: '',
                    txt_stateid: 0,
                    txt_stateName: '',
                    txt_stateCode: '',
                    txt_customsStateCode: ''
                });
                setValidated(true);
                setUpdateing(false);
            }
            else {
                setValues({
                    txt_infoMassage: error.message,
                    drp_countryId: '',
                    txt_selectedCountryID: '',
                    txt_stateid: 0,
                    txt_stateName: '',
                    txt_stateCode: '',
                    txt_customsStateCode: ''
                });
                setNotedfy(true);
                setValidated(true);
                setUpdateing(false);
            }
        });
    }
    //delete
    const deleteState = (e) => {
        e.preventDefault();
        setDeleting(true);
        PlaceServices.deleteState(values.txt_stateid).then(res => {
            setValues({
                txt_infoMassage: res.data.message,
                drp_countryId: '',
                txt_selectedCountryID: '',
                txt_stateid: 0,
                txt_stateName: '',
                txt_stateCode: '',
                txt_customsStateCode: ''
            });
            setNotedfy(true);
            PlaceServices.getState().then((res) => {
                setProduct(res.data);
                setValidated(false);
                setDeleting(false);
            }).catch(error => {
                setValues({
                    txt_infoMassage: error.message,
                    drp_countryId: '',
                    txt_selectedCountryID: '',
                    txt_stateid: 0,
                    txt_stateName: '',
                    txt_stateCode: '',
                    txt_customsStateCode: ''
                });
                setNotedfy(true);
                setDeleting(false);
            })
        }).catch(error => {
            if (values.drp_countryId === '') {
                setValues({
                    drp_countryId: 0,
                    txt_selectedCountryID: '',
                    txt_stateid: 0,
                    txt_stateName: '',
                    txt_stateCode: '',
                    txt_customsStateCode: ''
                });
                setValidated(true);
                setDeleting(false);
            }
            else if (values.txt_stateName === '') {
                setValues({
                    drp_countryId: '',
                    txt_selectedCountryID: '',
                    txt_stateid: 0,
                    txt_stateName: '',
                    txt_stateCode: '',
                    txt_customsStateCode: ''
                });
                setValidated(true);
                setDeleting(false);
            }
            else if (values.txt_stateCode === '') {
                setValues({
                    drp_countryId: '',
                    txt_selectedCountryID: '',
                    txt_stateid: 0,
                    txt_stateName: '',
                    txt_stateCode: '',
                    txt_customsStateCode: ''
                });
                setValidated(true);
                setDeleting(false);
            }
            else if (values.txt_customsStateCode === '') {
                setValues({
                    drp_countryId: '',
                    txt_selectedCountryID: '',
                    txt_stateid: 0,
                    txt_stateName: '',
                    txt_stateCode: '',
                    txt_customsStateCode: ''
                });
                setValidated(true);
                setDeleting(false);
            }
            else {
                setValues({
                    txt_infoMassage: error.message,
                    drp_countryId: '',
                    txt_selectedCountryID: '',
                    txt_stateid: 0,
                    txt_stateName: '',
                    txt_stateCode: '',
                    txt_customsStateCode: ''
                });
                setNotedfy(true);
                setValidated(true);
                setDeleting(false);
            }
        });
    }
    const cancle = () => {
        setValues({
            drp_countryId: '',
            txt_selectedCountryID: '',
            txt_stateid: 0,
            txt_stateName: '',
            txt_stateCode: '',
            txt_customsStateCode: ''
        });
        setValidated(false);
    };
    const editCountry = (statlizt) => {
        setValues({
            drp_countryId: statlizt.countryId,
            txt_stateid: statlizt.stateid,
            txt_stateName: statlizt.stateName,
            txt_stateCode: statlizt.stateCode,
            txt_customsStateCode: statlizt.customsStateCode
        });
    };
    const notefyClose = () => {
        setNotedfy(false);
    };
    // const gohome = () => {
    //     removeUserSession();
    //     props.history.push('/');
    // }
    return (
        <div>
            <Sidebar />
            <div style={{ marginTop: "4rem" }} />
            <Form noValidate validated={validated} style={{ fontFamily: "serif", overflowX: "hidden" }}>
                <Row >
                    <Col xs={11} style={{ margin: "auto" }} className=" font-serif">
                        <Form.Text style={{ fontSize: "20px", color: "black" }}>State Detailes</Form.Text>
                        <Card style={{ height: '10rem', borderTop: "4px solid rgb(175, 174, 129)", borderLeft: "3px solid rgb(128, 127, 96)" }}>
                            <Row className="mx-2">
                                <Col xs={4}>
                                    <Form.Label>CountryName</Form.Label>
                                    <Form.Select required size="sm" as="select" value={values.drp_countryId}
                                        onChange={(e) => setValues({ ...values, drp_countryId: e.target.value })}
                                        style={{ borderColor: "black" }}
                                        autoComplete="off">
                                        <option value={values.txt_selectedCountryID} selected disabled={true}>---- SELECT ----</option>
                                        {
                                            drpcountry.map((countrys) =>
                                                <option key={countrys.countryId}
                                                    value={countrys.countryId}>
                                                    {countrys.countryName}
                                                </option>
                                            )
                                        }
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid" tooltip>
                                        Please choose a countryName.
                                    </Form.Control.Feedback>
                                </Col>
                                <Col xs={4}>
                                    <Form.Label>StateName</Form.Label>
                                    <Form.Control size="sm" required type="text" placeholder="stateName"
                                        value={values.txt_stateName} maxLength="50"
                                        onChange={changeStateNameHandler} autoComplete="off" style={{ borderColor: "black" }} />
                                    <Form.Control.Feedback type="invalid" tooltip>
                                        Please choose a stateName.
                                    </Form.Control.Feedback>
                                </Col>
                            </Row>
                            <Row className="mx-2 my-1">
                                <Col xs={4}>
                                    <Form.Label>StateCode</Form.Label>
                                    <Form.Control size="sm" required type="text" placeholder="stateCode"
                                        value={values.txt_stateCode} maxLength="15" style={{ borderColor: "black" }}
                                        onChange={changeStateCodeHandler} autoComplete="off" />

                                    <Form.Control.Feedback type="invalid" tooltip>
                                        Please choose a SteateCode.
                                    </Form.Control.Feedback>
                                </Col>
                                <Col xs={4}>
                                    <Form.Label>Customs State Code</Form.Label>
                                    <Form.Control size="sm" required type="text" placeholder="customStateCode"
                                        value={values.txt_customsStateCode} maxLength="2" style={{ borderColor: "black" }}
                                        onChange={changeCustomStateCodeHandler} autoComplete="off" />
                                    <Form.Control.Feedback type="invalid" tooltip>
                                        Please choose a Customs state code.
                                    </Form.Control.Feedback>
                                </Col>
                            </Row>
                        </Card>
                        <br />
                        <Snackbar
                            anchorOrigin={{ vertical: 'top', horizontal: 'center', }}
                            open={notefy} autoHideDuration={100} message={values.txt_infoMassage}
                            action={
                                <IconButton size="small" aria-label="close" color="inherit" onClick={notefyClose}>
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            } />
                        <Button onClick={addState} disabled={submit()} className="btn btn-info p-2" type="submit">
                            {loading ? 'Loading...' : 'submit'}
                        </Button>
                        <Button className="btn btn-info p-2" onClick={updateState} disabled={isDisabled() + updateing}>
                            {updateing ? 'Loading...' : 'update'}
                        </Button>
                        <Button className="btn btn-info p-2" onClick={cancle}>Reset</Button>
                        <Button className="btn btn-danger p-2" disabled={isDisabled() + deleteing} onClick={deleteState}>
                            {deleteing ? 'Loading...' : 'delete'}
                        </Button>
                        {/* <Backdrop className={classes.backdrop} open={open} >
                            <CircularProgress color="inherit" />
                            {error ? <h2>
                                <p>
                                    {values.txt_infoMassage}
                                </p>
                                <button className="btn btn-light" onClick={gohome}>Go Back</button>
                            </h2> : null}
                        </Backdrop> */}
                        <Card style={{ borderTop: "4px solid rgb(175, 174, 129)", borderLeft: "3px solid rgb(128, 127, 96)" ,height:"45vh"}}>
                            <Col className="my-2 ">
                                <TableContainer className={classes.container}>
                                    <Table stickyHeader aria-label="sticky table" size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Sl.no</TableCell>
                                                <TableCell >CountryName</TableCell>
                                                <TableCell >StateName</TableCell>
                                                <TableCell >StateCode</TableCell>
                                                <TableCell >customStateCode</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                product.map((statlizt) => (
                                                    <TableRow hover key={statlizt.stateid} onClick={() => editCountry(statlizt)}>
                                                        <TableCell >{statlizt.sl_No}</TableCell>
                                                        <TableCell>{statlizt.countryName}</TableCell>
                                                        <TableCell>{statlizt.stateName}</TableCell>
                                                        <TableCell>{statlizt.stateCode}</TableCell>
                                                        <TableCell>{statlizt.customsStateCode}</TableCell>
                                                    </TableRow>
                                                ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Col>
                        </Card>
                        <div>
                            .
                        </div>
                    </Col>
                </Row>
            </Form>

        </div>

    );

}
export default StateComponent;
/*      <TableScrollbar style={{ height: "10vh" }}>
                                    <table className="table table-light border-dark table-hover table-bordered" >
                                        <thead style={{ color: "black", fontWeight: "bold" }}>
                                            <tr>
                                                <th className="border-dark p-1">Sl.No</th>
                                                <th className="border-dark p-1">CountryName</th>
                                                <th className="border-dark p-1">StateName</th>
                                                <th className="border-dark p-1">StateCode</th>
                                                <th className="border-dark p-1">customStateCode</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                product.map(
                                                    (statlizt) =>
                                                        <tr key={statlizt.stateid} onClick={() => editCountry(statlizt)}>
                                                            <td className="border-dark p-2">{statlizt.sl_No}</td>
                                                            <td className="border-dark p-2">{statlizt.countryName}</td>
                                                            <td className=" border-dark p-2">{statlizt.stateName}</td>
                                                            <td className=" border-dark p-2">{statlizt.stateCode}</td>
                                                            <td className=" border-dark p-2">{statlizt.customsStateCode}</td>
                                                        </tr>
                                                )
                                            }


                                        </tbody>
                                    </table>
                                </TableScrollbar> */