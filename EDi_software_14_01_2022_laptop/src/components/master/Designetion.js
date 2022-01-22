import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button, Card, ButtonToolbar } from "react-bootstrap";
import {
    // Backdrop, CircularProgress, 
     makeStyles,IconButton, Snackbar,
    Table, TableBody, TableCell, TableHead, TableRow, TableContainer
} from '@material-ui/core';
import Organizetion from '../../sevices/masterServices/Organizetion';
import Sidebar from '../menus/Sidebar';
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
        width: "96%",
        maxHeight: 280,
    },
}));

function Designetion(props) {
    const classes = useStyles();
    const [notefy, setNotedfy] = useState(false);
    // const [open, setOpen] = useState(true);
    // const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [LodingUd, setLodingU_D] = useState(false);
    const [LodingDelete ,setLodingDelete] = useState(false);
    const [product, setProduct] = useState([])
    const [validated, setValidated] = useState(false);
    const [values, setValues] = useState({
        txt_dsgntionid:0,
        txt_Designetion: "",
        txt_infoMassage:""
    });
    const getAllData = async () => {
        Organizetion.getDesignetion().then(res => {
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

    const adddsgntion = (e) => {
        e.preventDefault();
        setLoading(true);
        let dsgntionDetails = {designationName: values.txt_Designetion};
        if(!values.txt_Designetion)
        {
            setValues({
                txt_dsgntionid:0,
                txt_Designetion: "",
            });
            setLoading(false)
            setValidated(false);
            setNotedfy(false)
        }
        else{
        Organizetion.adddesignation(dsgntionDetails).then((res) => {
            setValues({
                txt_infoMassage: res.data.message,
                txt_dsgntionid:0,
                txt_Designetion: "",
            });
            setLoading(true);
            setValidated(false);
            setNotedfy(true)
            Organizetion.getDesignetion().then(res => {
                setProduct(res.data);
            })
            
        }).catch(error => {
            if(!values.txt_Designetion)
            {
            setValues({
                txt_dsgntionid:0,
                txt_Designetion: "",
            });
            setLoading(false);
            setValidated(true);
            setNotedfy(false);
        }
        else{
            setValues({
                txt_infoMassage: error.message,
                txt_dsgntionid:0,
                txt_Designetion: "",
            });
            setLoading(false);
            setValidated(true);
            setNotedfy(true);
        }
        })
    }
    };
    const updatedsgntion = (e) => {
        e.preventDefault();
        setLodingU_D(true);
        let dsgntionDetails = {designationName: values.txt_Designetion};
        console.log("dsgntion " + values.txt_dsgntionid)
        console.log("dsgntionDetails " + JSON.stringify(dsgntionDetails))
        Organizetion.updatedesignation(values.txt_dsgntionid, dsgntionDetails).then((res) => {
            setValues({
                txt_infoMassage: res.data.message,
                txt_dsgntionid:0,
                txt_Designetion: "",
            });
            setLodingU_D(false);
            setValidated(false);
            setNotedfy(true);
            Organizetion.getDesignetion().then(res => {
                setProduct(res.data);
            })
        }).catch(error => {
            setValues({
                txt_infoMassage: error.message,
                txt_dsgntionid:0,
                txt_Designetion: "",
            });
            setLodingU_D(false);
            setValidated(true);
            setNotedfy(true);
        })
    };
    const deletedsgntion = (e) => {
        e.preventDefault();
        setLodingDelete(true);
        Organizetion.deletedsignation(values.txt_dsgntionid).then((res) => {
            setValues({
                txt_infoMassage: res.data.message,
                txt_dsgntionid:0,
                txt_Designetion: "",
            });
            setLodingDelete(false);
            setValidated(false);
            setNotedfy(true);
            Organizetion.getDesignetion().then(res => {
                setProduct(res.data);
            })
        }).catch(error => {
            setValues({
                txt_infoMassage: error.message,
                txt_dsgntionid:0,
                txt_Designetion: "",
            });
            setLodingDelete(false);
            setValidated(true);
            setNotedfy(true);
        })
    };
    const cancle = () => {
        setValues({
            txt_dsgntionid:0,
                txt_Designetion: "",
                txt_infoMassage:""
        })
        setNotedfy(false);
        setValidated(false);
    }
    const editdsgntion = (dsgntion) => {
        setValues({
            txt_dsgntionid:dsgntion.designationId,
            txt_Designetion: dsgntion.designationName,
        })
        setValidated(false);
        setNotedfy(false);
    };

    const NameChangeHandler = (e) => {
        setValues({ ...values, txt_Designetion: e.target.value })
    };

    const isDisabled = () => {
        if (values.txt_dsgntionid === 0) {
            return true
        } else {
            return false
        }
    };
    const submit = () => {
        if (values.txt_dsgntionid > 0) {
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
                    <Form.Text style={{ fontSize: "20px", color: "black" }}>Designetion</Form.Text>
                    <Card style={{ borderTop: "4px solid rgb(175, 174, 129)", borderLeft: "3px solid rgb(128, 127, 96)" }}>
                        <center className="m-3">
                        <Form.Group as={Col} md="4" controlId="validationFormik101" className="position-relative">
                                <Form.Label>Designetion*</Form.Label>
                                <Form.Control size="sm" required type="text" placeholder="Designetion"
                                    value={values.txt_Designetion} maxLength="50" style={{ borderColor: "black" }}
                                    onChange={NameChangeHandler} autoComplete="off" />
                                <Form.Control.Feedback type="invalid" tooltip>
                                    Please Enter a Name.
                                </Form.Control.Feedback>
                            </Form.Group>
                            </center>
                        <Row xs={5} className="mx-4">
                            
                            </Row>
                        <Snackbar
                            anchordsgntion={{ vertical: 'top', horizontal: 'center', }}
                            open={notefy} autoHideDuration={100} message={values.txt_infoMassage}
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
                        <Button onClick={adddsgntion} disabled={submit()+loading} className=" p-1" type="submit">
                        {loading ? 'Processing...' : 'submit'}
                        </Button>
                        <Button className=" p-1" onClick={updatedsgntion} disabled={isDisabled()+LodingUd} >{LodingUd ? 'Processing...' : 'update'}</Button>
                        <Button className=" p-1" onClick={cancle}>Reset</Button>
                        <Button className=" p-1" disabled={isDisabled()+LodingDelete} onClick={deletedsgntion}>{LodingDelete ? 'Processing...' : 'delete'}</Button>
                    </ButtonToolbar >
                    <Card style={{ height: "20rem", borderTop: "4px solid rgb(175, 174, 129)", borderLeft: "3px solid rgb(128, 127, 96)" }}>
                        <Col className="m-1">
                            <TableContainer className={classes.container}>
                                <Table stickyHeader aria-label="sticky table" size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Sl.no</TableCell>
                                            <TableCell >Designetion</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            product.map(
                                                (dsgntion) => (
                                                    <TableRow hover key={dsgntion.designationId} onClick={() => editdsgntion(dsgntion)}>
                                                        <TableCell >{dsgntion.sl_No}</TableCell>
                                                        <TableCell>{dsgntion.designationName}</TableCell>
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

export default Designetion;