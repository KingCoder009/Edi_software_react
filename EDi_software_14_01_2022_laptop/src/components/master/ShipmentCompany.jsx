import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button, Card, ButtonToolbar } from "react-bootstrap";
import {
    // Backdrop, CircularProgress,
    IconButton,Snackbar,
    makeStyles, Table, TableBody, TableCell, TableHead, TableRow, TableContainer
} from '@material-ui/core';
import ShipmentServices from '../../sevices/masterServices/ShipmentServices';
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
function ShipmentCompany(props) {
      const classes = useStyles();
        const [notefy, setNotedfy] = useState(false);
        // const [open, setOpen] = useState(true);
        // const [error, setError] = useState(false);
        const [product, setProduct] = useState([])
        const [validated, setValidated] = useState(false);
        const [values, setValues] = useState({
            txt_Shipmentid: 0,
            txt_company_name: "",
            txt_company_code: "",
            txt_addresh: "",
            txt_emailid: "",
            txt_Phon_no: "",
            txt_website: "",       
            txt_infoMassage: ""
        });
        const getAllData = async () => {
            ShipmentServices.getClearanceShipment().then(res => {
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
    
        const addShipment = (e) => {
            e.preventDefault();
        let ShipmentCompany = {shipmentCompenyName:values.txt_company_name,S_CompanyCode:values.txt_company_code,shipmentCompanyAddress:values.txt_addresh
        ,shipmentCompanyPhoneNumber:values.txt_Phon_no,shipmentCompanyWebsite:values.txt_website,shipmentCompanyEmailAddress:values.txt_emailid};
            if(!values.txt_company_name || !values.txt_company_code)
            {
                setValues({
                    txt_Shipmentid: 0,
                    txt_addresh: "",
                    txt_company_name: "",
                    txt_Phon_no: "",
                    txt_website: "",
                    txt_company_code: "",
                    txt_emailid: "",
                })
                setValidated(false);
                setNotedfy(true)
            }
            else{
            ShipmentServices.addShipment(ShipmentCompany).then((res) => {
                setValues({
                    txt_infoMassage: res.data.message,
                    txt_Shipmentid: 0,
                    txt_addresh: "",
                    txt_company_name: "",
                    txt_Phon_no: "",
                    txt_website: "",
                    txt_company_code: "",
                    txt_emailid: "",
                })
                setValidated(false);
                setNotedfy(true)
                ShipmentServices.getClearanceShipment().then(res => {
                    setProduct(res.data);
                })
                
            }).catch(error => {
                if(!values.txt_company_name || !values.txt_company_code)
                {
                setValues({
                    txt_Shipmentid: 0,
                    txt_addresh: "",
                    txt_company_name: "",
                    txt_Phon_no: "",
                    txt_website: "",
                    txt_company_code: "",
                    txt_emailid: "",
                })
                setValidated(true);
                setNotedfy(false)
            }
            else{
                setValues({
                    txt_infoMassage: error.message,
                    txt_Shipmentid: 0,
                    txt_addresh: "",
                    txt_company_name: "",
                    txt_Phon_no: "",
                    txt_website: "",
                    txt_company_code: "",
                    txt_emailid: "",
                })
                setValidated(true);
                setNotedfy(true)
            }
            })
        }
        };
        const updateShipment = (e) => {
            e.preventDefault();
            let ShipmentCompany = {shipmentCompenyName:values.txt_company_name,S_CompanyCode:values.txt_company_code,shipmentCompanyAddress:values.txt_addresh
        ,shipmentCompanyPhoneNumber:values.txt_Phon_no,shipmentCompanyWebsite:values.txt_website,shipmentCompanyEmailAddress:values.txt_emailid};
                if(!values.txt_company_name || !values.txt_company_code || values.txt_Shipmentid === 0)
                {
                    setValues({
                        txt_Shipmentid: 0,
                        txt_addresh: "",
                        txt_company_name: "",
                        txt_Phon_no: "",
                        txt_website: "",
                        txt_company_code: "",
                        txt_emailid: "",
                    })
                    setValidated(false);
                    setNotedfy(true)
                }
                else{
            console.log("Shipment " + values.txt_Shipmentid)
            console.log("ShipmentCompany " + JSON.stringify(ShipmentCompany))
            ShipmentServices.updateShipment(values.txt_Shipmentid, ShipmentCompany).then((res) => {
                setValues({
                    txt_infoMassage: res.data.message,
                    txt_Shipmentid: 0,
                    txt_addresh: "",
                    txt_company_name: "",
                    txt_Phon_no: "",
                    txt_website: "",
                    txt_company_code: "",
                    txt_emailid: "",
                })
                setValidated(false);
                setNotedfy(true);
                ShipmentServices.getClearanceShipment().then(res => {
                    setProduct(res.data);
                })
            }).catch(error => {
                setValues({
                    txt_infoMassage: error.message,
                    txt_Shipmentid: 0,
                    txt_addresh: "",
                    txt_company_name: "",
                    txt_Phon_no: "",
                    txt_website: "",
                    txt_company_code: "",
                    txt_emailid: "",
                })
                setValidated(true);
                setNotedfy(true);
            })
        }
        };
        const deleteShipment = (e) => {
            e.preventDefault();
            ShipmentServices.deleteShipmwent(values.txt_Shipmentid).then((res) => {
                setValues({
                    txt_infoMassage: res.data.message,
                    txt_Shipmentid: 0,
                    txt_addresh: "",
                    txt_company_name: "",
                    txt_Phon_no: "",
                    txt_website: "",
                    txt_company_code: "",
                    txt_emailid: "",
                })
                setValidated(false);
                setNotedfy(true);
                ShipmentServices.getClearanceShipment().then(res => {
                    setProduct(res.data);
                })
            }).catch(error => {
                setValues({
                    txt_infoMassage: error.message,
                    txt_Shipmentid: 0,
                    txt_addresh: "",
                    txt_company_name: "",
                    txt_Phon_no: "",
                    txt_website: "",
                    txt_company_code: "",
                    txt_emailid: "",
                })
                setValidated(true);
                setNotedfy(true);
            })
        };
        const cancle = () => {
            setValues({
                txt_Shipmentid: 0,
                txt_addresh: "",
                txt_company_name: "",
                txt_Phon_no: "",
                txt_website: "",
                txt_company_code: "",
                txt_emailid: "",
            })
            setValidated(false)
        }
        const editShipment = (Shipment) => {
            setValues({
                txt_Shipmentid: Shipment.shipmentCompenyId,
                txt_company_code: Shipment.S_CompanyCode,
                txt_company_name: Shipment.shipmentCompenyName,
                txt_addresh: Shipment.shipmentCompanyAddress,
                txt_Phon_no: Shipment.shipmentCompanyPhoneNumber,
                txt_website: Shipment.shipmentCompanyWebsite,
                txt_emailid: Shipment.shipmentCompanyEmailAddress,
            })
        };
    
        const AddreshChangeHandler = (e) => {
            setValues({ ...values, txt_addresh: e.target.value })
        };

        const NameChangeHandler = (e) => {
            setValues({ ...values, txt_company_name: e.target.value })
        };

        const PhonChangeHandler = (e) => {
            setValues({ ...values, txt_Phon_no: e.target.value })
        };
        const WebsitChangeHandler = (e) => {
            setValues({ ...values, txt_website: e.target.value })
        };
        const CodeChangeHandler = (e) => {
            setValues({ ...values, txt_company_code: e.target.value })
        };
        const EmailidChangeHandler = (e) => {
            setValues({ ...values, txt_emailid: e.target.value })
        };
        const isDisabled = () => {
            if (values.txt_Shipmentid === 0) {
                return true
            } else {
                return false
            }
        };
        const submit = () => {
            if (values.txt_Shipmentid > 0) {
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
                        <Form.Text style={{ fontSize: "20px", color: "black" }}>ShipmentCompany</Form.Text>
                        <Card style={{ borderTop: "4px solid rgb(175, 174, 129)", borderLeft: "3px solid rgb(128, 127, 96)" }}>
                            <Row xs={5} className="mx-4">
                                <Form.Group as={Col} md="4" controlId="validationFormik101" className="position-relative">
                                    <Form.Label>CompanyName*</Form.Label>
                                    <Form.Control size="sm" required type="text" placeholder="Name"
                                        value={values.txt_company_name} maxLength="50" style={{ borderColor: "black" }}
                                        onChange={NameChangeHandler} autoComplete="off" />
                                    <Form.Control.Feedback type="invalid" tooltip>
                                        Please Enter a Name.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            <Form.Group as={Col} md="4" controlId="validationFormik101" className="position-relative">
                                    <Form.Label>Website</Form.Label>
                                    <Form.Control size="sm" type="text" placeholder="State"
                                        value={values.txt_website} maxLength="50" style={{ borderColor: "black" }}
                                        onChange={WebsitChangeHandler} autoComplete="off" />
                                </Form.Group>
                                
                                </Row>
                                {/*  */}
                                <Row xs={5} className="mx-4">
                                <Form.Group as={Col} md="4" controlId="validationFormik101" className="position-relative">
                                    <Form.Label>Code*</Form.Label>
                                    <Form.Control size="sm" required type="text" placeholder="Code"
                                        value={values.txt_company_code} maxLength="5" style={{ borderColor: "black" }}
                                        onChange={CodeChangeHandler} autoComplete="off" />
                                    <Form.Control.Feedback type="invalid" tooltip>
                                        Please Enter a Code.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="4" controlId="validationFormik101" className="position-relative">
                                    <Form.Label>MailId</Form.Label>
                                    <Form.Control size="sm" type="email" placeholder="EmailId"
                                        value={values.txt_emailid} maxLength="50" style={{ borderColor: "black" }}
                                        onChange={EmailidChangeHandler} autoComplete="off" />
                                </Form.Group>
                            </Row>
                            {/*  */}
                            <Row xs={5} className="mx-4">  
                            <Form.Group as={Col} md="4" controlId="validationFormik101" className="position-relative">
                                    {/* <Form.Group className="mb-3"> */}
                                    <Form.Label>Addresh</Form.Label>
                                    <Form.Control as="textarea" value={values.txt_addresh}
                                        onChange={AddreshChangeHandler} rows={3} placeholder="Addresh" />
                                </Form.Group>
                                <Form.Group as={Col} md="4" controlId="validationFormik101" className="position-relative">
                                    <Form.Label>PhonNumber</Form.Label>
                                    <Form.Control size="sm" type="text" placeholder="phone Number"
                                        value={values.txt_Phon_no} maxLength="50" style={{ borderColor: "black" }}
                                        onChange={PhonChangeHandler} autoComplete="off" />
                                </Form.Group>                         
                            </Row>
                            <Row  xs={5} className="m-4">
                                {/*  */}
                            </Row>
                           
                             <Snackbar
                                anchorShipment={{ vertical: 'top', horizontal: 'center', }}
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
                            <Button onClick={addShipment} disabled={submit()} className=" p-1" type="submit">
                                Submit
                            </Button>
                            <Button className=" p-1" onClick={updateShipment} disabled={isDisabled()} >update</Button>
                            <Button className=" p-1" onClick={cancle}>Reset</Button>
                            <Button className=" p-1" disabled={isDisabled()} onClick={deleteShipment}>Delete</Button>
                        </ButtonToolbar >
                        <Card style={{ height: "20rem", borderTop: "4px solid rgb(175, 174, 129)", borderLeft: "3px solid rgb(128, 127, 96)" }}>
                            <Col className="m-1">
                                <TableContainer className={classes.container}>
                                    <Table stickyHeader aria-label="sticky table" size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Sl.no</TableCell>
                                                <TableCell >Shipment company Name</TableCell>
                                                <TableCell >Shipment company code</TableCell>
                                                <TableCell >Phone Number</TableCell>
                                                <TableCell >Adreesh</TableCell>
                                                <TableCell >Wbsite</TableCell>
                                                <TableCell >Email Addresh</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                product.map(
                                                    (Shipment) => (
                                                        <TableRow hover key={Shipment.shipmentCompenyId} onClick={() => editShipment(Shipment)}>
                                                            <TableCell >{Shipment.sl_No}</TableCell>
                                                            <TableCell>{Shipment.shipmentCompenyName}</TableCell>
                                                            <TableCell>{Shipment.S_CompanyCode}</TableCell>
                                                            <TableCell>{Shipment.shipmentCompanyPhoneNumber}</TableCell>
                                                            <TableCell>{Shipment.shipmentCompanyAddress}</TableCell>
                                                            <TableCell>{Shipment.shipmentCompanyWebsite}</TableCell>
                                                            <TableCell>{Shipment.shipmentCompanyEmailAddress}</TableCell>
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

export default ShipmentCompany;

/*


      
       
*/