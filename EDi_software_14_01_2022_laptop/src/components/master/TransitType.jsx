import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button, Card, ButtonToolbar } from "react-bootstrap";
import {
    // Backdrop, makeStyles,CircularProgress, 
    IconButton, Snackbar,
     Table, TableBody, TableCell, TableHead, TableRow, TableContainer
} from '@material-ui/core';
import ShipmentServices from '../../sevices/masterServices/ShipmentServices';
import Sidebar from '../menus/Sidebar';
import CloseIcon from '@material-ui/icons/Close';
// import { removeUserSession } from '../Utils/Common';

// const useStyles = makeStyles((theme) => ({
//     backdrop: {
//         zIndex: theme.zIndex.drawer + 1,
//         backgroundColor: "black",
//         color: '#fff',
//     },
//     container: {
//         margin: theme.spacing(1),
//         width: "96%",
//         maxHeight: 280,
//     },
// }));
function TransitType(props) {
    // const classes = useStyles();
    const [notefy, setNotedfy] = useState(false);
    // const [open, setOpen] = useState(true);
    // const [error, setError] = useState(false);
    const [product, setProduct] = useState([])
    const [validated, setValidated] = useState(false);
    const [values, setValues] = useState({
        txt_trnsitId:0,
        Txt_TransitTypeName: "",
        Txt_TransitTypeCode:"",
        txt_infoMassage:""
    });
    const getAllData = async () => {
        ShipmentServices.getTransitType().then(res => {
            // setOpen(false)
            // setError(false)
            setProduct(res.data);
        }).catch(error => {
            // setValues({ txt_infoMassage: error.message })
            // setError(true)
        })
    };
    useEffect(() => {
        getAllData();
    }, []);

    const addtransitTyp = (e) => {
        e.preventDefault();
    let transitType = {transitTypeName:values.Txt_TransitTypeName,transitTypeCode:values.Txt_TransitTypeCode};
        if(!values.Txt_TransitTypeName || !values.Txt_TransitTypeCode)
        {
            setValues({
                txt_trnsitId: 0,
                txt_addresh: "",
                Txt_TransitTypeName: "",
                Txt_TransitTypeCode:"",
            })
            setValidated(false);
            setNotedfy(true)
        }
        else{
        ShipmentServices.addTrnsit(transitType).then((res) => {
            setValues({
                txt_infoMassage: res.data.message,
                txt_trnsitId: 0,
                txt_addresh: "",
                Txt_TransitTypeName: "",
                Txt_TransitTypeCode:"",
            })
            setValidated(false);
            setNotedfy(true)
            ShipmentServices.getTransitType().then(res => {
                setProduct(res.data);
            })
            
        }).catch(error => {
            if(!values.Txt_TransitTypeName || !values.Txt_TransitTypeCode)
            {
            setValues({
                txt_trnsitId: 0,
                txt_addresh: "",
                Txt_TransitTypeName: "",
                Txt_TransitTypeCode:"",
            })
            setValidated(true);
            setNotedfy(false)
        }
        else{
            setValues({
                txt_infoMassage: error.message,
                txt_trnsitId: 0,
                Txt_TransitTypeName: "",
                Txt_TransitTypeCode:"",
            })
            setValidated(true);
            setNotedfy(true)
        }
        })
    }
    };
    const updatetransitTyp = (e) => {
        e.preventDefault();
        let transitType = {transitTypeName:values.Txt_TransitTypeName,transitTypeCode:values.Txt_TransitTypeCode};
            if(!values.Txt_TransitTypeName || !values.Txt_TransitTypeCode || values.txt_trnsitId === 0)
            {
                setValues({
                    txt_trnsitId: 0,
                    Txt_TransitTypeName: "",
                    Txt_TransitTypeCode:"",
                })
                setValidated(false);
                setNotedfy(true)
            }
            else{
        console.log("Shipment " + values.txt_trnsitId)
        console.log("transitType " + JSON.stringify(transitType))
        ShipmentServices.updateTransit(values.txt_trnsitId, transitType).then((res) => {
            setValues({
                txt_infoMassage: res.data.message,
                txt_trnsitId: 0,
                Txt_TransitTypeCode:"",
                Txt_TransitTypeName: "",
            })
            setValidated(false);
            setNotedfy(true);
            ShipmentServices.getTransitType().then(res => {
                setProduct(res.data);
            })
        }).catch(error => {
            setValues({
                txt_infoMassage: error.message,
                txt_trnsitId: 0,
                Txt_TransitTypeCode:"",
                Txt_TransitTypeName: "",
                
            })
            setValidated(true);
            setNotedfy(true);
        })
    }
    };
    const deletetransitTyp = (e) => {
        e.preventDefault();
        ShipmentServices.DeleteTransitType(values.txt_trnsitId).then((res) => {
            setValues({
                txt_infoMassage: res.data.message,
                txt_trnsitId: 0,
                Txt_TransitTypeCode:"",
                Txt_TransitTypeName: "",
                
            })
            setValidated(false);
            setNotedfy(true);
            ShipmentServices.getTransitType().then(res => {
                setProduct(res.data);
            })
        }).catch(error => {
            setValues({
                txt_infoMassage: error.message,
                txt_trnsitId: 0,
                Txt_TransitTypeCode:"",
                Txt_TransitTypeName: "",
                
            })
            setValidated(true);
            setNotedfy(true);
        })
    };
    const cancle = () => {
        setValues({
            txt_trnsitId: 0,
            Txt_TransitTypeCode:"",
            Txt_TransitTypeName: "",
        })
        setValidated(false)
    }
    const edittransitTyp = (Shipment) => {
        setValues({
            txt_trnsitId: Shipment.tranitTypeId,
            Txt_TransitTypeName: Shipment.transitTypeName,
            Txt_TransitTypeCode: Shipment.transitTypeCode,
        })
    };

    const transiNameChangeHandler = (e) => {
        setValues({ ...values, Txt_TransitTypeName: e.target.value })
    };

    const transitCodeChangeHandler = (e) => {
        setValues({ ...values, Txt_TransitTypeCode: e.target.value })
    };


    const isDisabled = () => {
        if (values.txt_trnsitId === 0) {
            return true
        } else {
            return false
        }
    };
    const submit = () => {
        if (values.txt_trnsitId > 0) {
            return true
        } else {
            return false
        }
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
            <Row>
                <Col xs={11} style={{ margin: "auto" }} className=" font-serif">
                    <Form.Text style={{ fontSize: "20px", color: "black" }}>TransiteType</Form.Text>
                    <Card style={{ borderTop: "4px solid rgb(175, 174, 129)", borderLeft: "3px solid rgb(128, 127, 96)" }}>
                        <center className="m-3">
                            <Row>
                        <Form.Group as={Col} md="4" controlId="validationFormik101" className="position-relative">
                                <Form.Label>TransitTypeName*</Form.Label>
                                <Form.Control size="sm" required type="text" placeholder="TransitTypeName"
                                    value={values.Txt_TransitTypeName} maxLength="50" style={{ borderColor: "black" }}
                                    onChange={transiNameChangeHandler} autoComplete="off" />
                                <Form.Control.Feedback type="invalid" tooltip>
                                    Please Enter a TransitTypeName.
                                </Form.Control.Feedback>
                            </Form.Group>
                            </Row>
                            <Row>
                            <Form.Group as={Col} md="4" controlId="validationFormik101" className="position-relative">
                                <Form.Label>TransitTypeCode*</Form.Label>
                                <Form.Control size="sm" required type="text" placeholder="TransitTypeCode"
                                    value={values.Txt_TransitTypeCode} maxLength="50" style={{ borderColor: "black" }}
                                    onChange={transitCodeChangeHandler} autoComplete="off" />
                                <Form.Control.Feedback type="invalid" tooltip>
                                    Please Enter a TransitTypeCode.
                                </Form.Control.Feedback>
                            </Form.Group>
                            </Row>
                            </center>
                        <Row xs={5} className="mx-4">
                            
                            </Row>
                        <Snackbar
                            anchortransitTyp={{ vertical: 'top', horizontal: 'center', }}
                            open={notefy} autoHideDuration={6000} message={values.txt_infoMassage}
                            action={
                                <IconButton size="small" aria-label="close" color="inherit" onClick={notefyClose}>
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            } />
                        {/* <Backdrop className={classes.backdrop} open={open} >
                            <CircularProgress color="inherit" />
                            {error ? <h2>
                                <p>
                                    {values.txt_infoMassage}
                                </p>
                                <button className="btn btn-light" onClick={gohome}>Go Back</button>
                            </h2> : null}
                        </Backdrop> */}
                    </Card>
                    <ButtonToolbar className="mx-5" bsPrefix >
                        <Button onClick={addtransitTyp} disabled={submit()} className=" p-1" type="submit">
                            Submit
                        </Button>
                        <Button className=" p-1" onClick={updatetransitTyp} disabled={isDisabled()} >update</Button>
                        <Button className=" p-1" onClick={cancle}>Reset</Button>
                        <Button className=" p-1" disabled={isDisabled()} onClick={deletetransitTyp}>Delete</Button>
                    </ButtonToolbar >
                    <Card style={{ height: "20rem", borderTop: "4px solid rgb(175, 174, 129)", borderLeft: "3px solid rgb(128, 127, 96)" }}>
                        <Col className="m-1">
                            <TableContainer
                            // className={classes.container}
                            >
                                <Table stickyHeader aria-label="sticky table" size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Sl.no</TableCell>
                                            <TableCell >Transit Type Name</TableCell>
                                            <TableCell >Transit Type Code</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            product.map(
                                                (transitTyp) => (
                                                    <TableRow hover key={transitTyp.tranitTypeId} onClick={() => edittransitTyp(transitTyp)}>
                                                        <TableCell >{transitTyp.sl_No}</TableCell>
                                                        <TableCell>{transitTyp.transitTypeName}</TableCell>
                                                        <TableCell>{transitTyp.transitTypeCode}</TableCell>
                                                    </TableRow>
                                                ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Col>
                    </Card>
                    <div>
                        ....
                    </div>
                </Col>
                
            </Row>
        </Form>
        </div>
    );
}

export default TransitType;