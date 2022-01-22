import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button, Card, ButtonToolbar } from "react-bootstrap";
import {
    // Backdrop, CircularProgress, makeStyles, 
    IconButton, Snackbar,
    Table, TableBody, TableCell, TableHead, TableRow, TableContainer
} from '@material-ui/core';
import PlaceServices from '../../sevices/masterServices/PlaceServices';
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
function OriginCargo(props) {
    // const classes = useStyles();
    const [notefy, setNotedfy] = useState(false);
    // const [open, setOpen] = useState(true);
    // const [error, setError] = useState(false);
    const [drpcountry, setDrpcountry] = useState([]);
    const [drpParentOrigin, setDrpParentOrigin] = useState([]);
    const [product, setProduct] = useState([])
    const [validated, setValidated] = useState(false);
    const [values, setValues] = useState({
        txt_orginId: 0,
        drp_countryId: "",
        txt_selectedCountryID: "",
        txt_addresh: "",
        txt_city: "",
        txt_companyname: "",
        txt_contct_number: "",
        txt_prefix: "",
        txt_state: "",
        txt_company_code: "",
        txt_emailid: "",
        drp_prentoriginid: 0,
        drp_slectedoriginid: 0,
        txt_pincode: "",
        tbl_pointId: 0,
        txt_infoMassage: ""
    });
    const getAllData = async () => {
        PlaceServices.getCountry().then(res => {
            setDrpcountry(res.data)
        });
        PlaceServices.getParentOrigin().then(res => {
            setDrpParentOrigin(res.data)
        });
        PlaceServices.getClearanceOrigin().then(res => {
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

    const addOrigin = (e) => {
        e.preventDefault();
        let originDetails = {
            orgineCompanyName: values.txt_companyname, countryId: values.drp_countryId
            , address: values.txt_addresh, contactNo: values.txt_contct_number, orgineCompanyCode: values.txt_company_code,
            originPrefix: values.txt_prefix, emailId: values.txt_emailid, contractCopy: 0
            , parentOriginId: values.drp_prentoriginid, city: values.txt_city, state: values.txt_state, pinCode: values.txt_pincode
        };
        if(!values.drp_countryId || !values.txt_city || !values.txt_companyname || !values.txt_company_code || !values.txt_state || !values.txt_pincode)
        {
            setValues({
                txt_orginId: 0,
                drp_countryId: "",
                txt_selectedCountryID: "",
                txt_addresh: "",
                txt_city: "",
                txt_companyname: "",
                txt_contct_number: "",
                txt_prefix: "",
                txt_state: "",
                txt_company_code: "",
                txt_emailid: "",
                drp_prentoriginid: 0,
                drp_slectedoriginid: 0,
                txt_pincode: "",
                tbl_pointId: 0,
            })
            setValidated(true);
            setNotedfy(true)
        }
        else{
        PlaceServices.addOrginCompany(originDetails).then((res) => {
            setValues({
                txt_infoMassage: res.data.message,
                txt_orginId: 0,
                drp_countryId: "",
                txt_selectedCountryID: "",
                txt_addresh: "",
                txt_city: "",
                txt_companyname: "",
                txt_contct_number: "",
                txt_prefix: "",
                txt_state: "",
                txt_company_code: "",
                txt_emailid: "",
                drp_prentoriginid: 0,
                drp_slectedoriginid: 0,
                txt_pincode: "",
                tbl_pointId: 0,
            })
            setValidated(false);
            setNotedfy(true)
            PlaceServices.getClearanceOrigin().then(res => {
                setProduct(res.data);
            })
            
        }).catch(error => {
            if(!values.drp_countryId || !values.txt_city || !values.txt_companyname || !values.txt_company_code || !values.txt_state || !values.txt_pincode)
            {
            setValues({
                txt_orginId: 0,
                drp_countryId: "",
                txt_selectedCountryID: "",
                txt_addresh: "",
                txt_city: "",
                txt_companyname: "",
                txt_contct_number: "",
                txt_prefix: "",
                txt_state: "",
                txt_company_code: "",
                txt_emailid: "",
                drp_prentoriginid: 0,
                drp_slectedoriginid: 0,
                txt_pincode: "",
                tbl_pointId: 0,
            })
            setValidated(true);
            setNotedfy(false)
        }
        else{
            setValues({
                txt_infoMassage: error.message,
                txt_orginId: 0,
                drp_countryId: "",
                txt_selectedCountryID: "",
                txt_addresh: "",
                txt_city: "",
                txt_companyname: "",
                txt_contct_number: "",
                txt_prefix: "",
                txt_state: "",
                txt_company_code: "",
                txt_emailid: "",
                drp_prentoriginid: 0,
                drp_slectedoriginid: 0,
                txt_pincode: "",
                tbl_pointId: 0,
            })
            setValidated(true);
            setNotedfy(true)
        }
        })
    }
    };
    const updateOrigin = (e) => {
        e.preventDefault();
        let originDetails = {
            orgineCompanyName: values.txt_companyname, countryId: values.drp_countryId
            , address: values.txt_addresh, contactNo: values.txt_contct_number, orgineCompanyCode: values.txt_company_code,
            originPrefix: values.txt_prefix, emailId: values.txt_emailid, contractCopy: " "
            , parentOriginId: values.drp_prentoriginid, city: values.txt_city, state: values.txt_state, pinCode: values.txt_pincode
        };
        console.log("point " + values.tbl_pointId)
        console.log("origin " + values.txt_orginId)
        console.log("originDetails " + JSON.stringify(originDetails))
        PlaceServices.updateOrginCompany(values.tbl_pointId, values.txt_orginId, originDetails).then((res) => {
            setValues({
                txt_infoMassage: res.data.message,
                txt_orginId: 0,
                drp_countryId: "",
                txt_selectedCountryID: "",
                txt_addresh: "",
                txt_city: "",
                txt_companyname: "",
                txt_contct_number: "",
                txt_prefix: "",
                txt_state: "",
                txt_company_code: "",
                txt_emailid: "",
                drp_prentoriginid: "",
                drp_slectedoriginid: "",
                txt_pincode: "",
                tbl_pointId: 0,
            })
            setValidated(false);
            setNotedfy(true);
            PlaceServices.getClearanceOrigin().then(res => {
                setProduct(res.data);
            })
        }).catch(error => {
            setValues({
                txt_infoMassage: error.message,
                txt_orginId: 0,
                drp_countryId: "",
                txt_selectedCountryID: "",
                txt_addresh: "",
                txt_city: "",
                txt_companyname: "",
                txt_contct_number: "",
                txt_prefix: "",
                txt_state: "",
                txt_company_code: "",
                txt_emailid: "",
                drp_prentoriginid: 0,
                drp_slectedoriginid: 0,
                txt_pincode: "",
                tbl_pointId: 0,
            })
            setValidated(true);
            setNotedfy(true);
        })
    };
    const deleteOrigin = (e) => {
        e.preventDefault();
        PlaceServices.deleteOrginCompany(values.tbl_pointId).then((res) => {
            setValues({
                txt_infoMassage: res.data.message,
                txt_orginId: 0,
                drp_countryId: "",
                txt_selectedCountryID: "",
                txt_addresh: "",
                txt_city: "",
                txt_companyname: "",
                txt_contct_number: "",
                txt_prefix: "",
                txt_state: "",
                txt_company_code: "",
                txt_emailid: "",
                drp_prentoriginid: 0,
                drp_slectedoriginid: 0,
                txt_pincode: "",
                tbl_pointId: 0,
            })
            setValidated(false);
            setNotedfy(true);
            PlaceServices.getClearanceOrigin().then(res => {
                setProduct(res.data);
            })
        }).catch(error => {
            setValues({
                txt_infoMassage: error.message,
                txt_orginId: 0,
                drp_countryId: "",
                txt_selectedCountryID: "",
                txt_addresh: "",
                txt_city: "",
                txt_companyname: "",
                txt_contct_number: "",
                txt_prefix: "",
                txt_state: "",
                txt_company_code: "",
                txt_emailid: "",
                drp_prentoriginid: 0,
                drp_slectedoriginid: 0,
                txt_pincode: "",
                tbl_pointId: 0,
            })
            setValidated(true);
            setNotedfy(true);
        })
    };
    const cancle = () => {
        setValues({
            txt_orginId: 0,
            drp_countryId: "",
            txt_selectedCountryID: "",
            txt_addresh: "",
            txt_city: "",
            txt_companyname: "",
            txt_contct_number: "",
            txt_prefix: "",
            txt_state: "",
            txt_company_code: "",
            txt_emailid: "",
            drp_prentoriginid: 0,
            drp_slectedoriginid: 0,
            txt_pincode: "",
            tbl_pointId: 0,
        })
    }
    const editOrigin = (origin) => {
        setValues({
            txt_orginId: origin.orginId,
            drp_countryId: origin.countryId,
            txt_addresh: origin.address,
            txt_city: origin.city,
            txt_companyname: origin.orgineCompanyName,
            txt_contct_number: origin.contactNo,
            txt_prefix: origin.originPrefix,
            txt_state: origin.state,
            txt_company_code: origin.orgineCompanyCode,
            txt_emailid: origin.emailId,
            drp_prentoriginid: origin.parentOriginId,
            txt_pincode: origin.pinCode,
            tbl_pointId: origin.pointId
        })
    };
    const CountryChangehandle = (e) => {
        setValues({ ...values, drp_countryId: e.target.value });
    };
    const AddreshChangeHandler = (e) => {
        setValues({ ...values, txt_addresh: e.target.value })
    };
    const CityChangeHandler = (e) => {
        setValues({ ...values, txt_city: e.target.value })
    };
    const CompanyNameChangeHandler = (e) => {
        setValues({ ...values, txt_companyname: e.target.value })
    };
    const ContactChangeHandler = (e) => {
        setValues({ ...values, txt_contct_number: e.target.value })
    };
    const PrefixChangeHandler = (e) => {
        setValues({ ...values, txt_prefix: e.target.value })
    };
    const StateChangeHandler = (e) => {
        setValues({ ...values, txt_state: e.target.value })
    };
    const CompanyCodeChangeHandler = (e) => {
        setValues({ ...values, txt_company_code: e.target.value })
    };
    const EmailidChangeHandler = (e) => {
        setValues({ ...values, txt_emailid: e.target.value })
    };
    const ParentOriginChangeHandler = (e) => {
        setValues({ ...values, drp_prentoriginid: e.target.value })
    };
    const PinCodeChangeHandler = (e) => {
        setValues({ ...values, txt_pincode: e.target.value })
    };
    const isDisabled = () => {
        if (values.tbl_pointId === 0) {
            return true
        } else {
            return false
        }
    };
    const submit = () => {
        if (values.tbl_pointId > 0) {
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
                        <Form.Text style={{ fontSize: "20px", color: "black" }}>Origin Cargo Company </Form.Text>
                        <Card style={{ borderTop: "4px solid rgb(175, 174, 129)", borderLeft: "3px solid rgb(128, 127, 96)" }}>
                            <Row xs={5} className="mx-4">
                                <Form.Group as={Col} md="3" controlId="validationFormik101" className="position-relative">
                                    <Form.Label>CountryName*</Form.Label>
                                    <Form.Select required size="sm" value={values.drp_countryId}
                                        onChange={CountryChangehandle}
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
                                            Please Select a countryName.
                                        </Form.Control.Feedback>
                                </Form.Group>
                                {/*  */}
                                <Form.Group as={Col} md="3" controlId="validationFormik101" className="position-relative">
                                    <Form.Label>CompenyName*</Form.Label>
                                    <Form.Control size="sm" required type="text" placeholder="CompenyName"
                                        value={values.txt_companyname} maxLength="50" style={{ borderColor: "black" }}
                                        onChange={CompanyNameChangeHandler} autoComplete="off" />
                                    <Form.Control.Feedback type="invalid" tooltip>
                                        Please Enter a CompenyName.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                {/*  */}
                                <Form.Group as={Col} md="3" controlId="validationFormik101" className="position-relative">
                                    <Form.Label>CompanyCode*</Form.Label>
                                    <Form.Control size="sm" required type="text" placeholder="CompanyCode"
                                        value={values.txt_company_code} maxLength="5" style={{ borderColor: "black" }}
                                        onChange={CompanyCodeChangeHandler} autoComplete="off" />
                                    <Form.Control.Feedback type="invalid" tooltip>
                                        Please Enter a CompanyCode.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row  xs={5} className="mx-4">
                                <Form.Group as={Col} md="3" controlId="validationFormik101" className="position-relative">
                                    {/* <Form.Group className="mb-3"> */}
                                    <Form.Label>Addresh</Form.Label>
                                    <Form.Control as="textarea" value={values.txt_addresh}
                                        onChange={AddreshChangeHandler} rows={2} placeholder="Addresh" />
                                </Form.Group>
                                {/*  */}
                                <Form.Group as={Col} md="3" className="position-relative">
                                    <Form.Label>ContectNumber</Form.Label>
                                    <Form.Control size="sm" type="text" placeholder="Contect Number"
                                        value={values.txt_contct_number} maxLength="15" style={{ borderColor: "black" }}
                                        onChange={ContactChangeHandler} autoComplete="off"  />
                                </Form.Group>
                                {/*  */}
                                <Form.Group as={Col} md="3" controlId="validationFormik101" className="position-relative">
                                    <Form.Label>EmailId</Form.Label>
                                    <Form.Control size="sm" type="email" placeholder="EmailId"
                                        value={values.txt_emailid} maxLength="50" style={{ borderColor: "black" }}
                                        onChange={EmailidChangeHandler} autoComplete="off" />
                                </Form.Group>
                            </Row>
                            {/*  */}
                            <Row  xs={5} className="mx-4">
                                <Form.Group as={Col} md="3" controlId="validationFormik101" className="position-relative">
                                    <Form.Label>City*</Form.Label>
                                    <Form.Control size="sm" required type="text" placeholder="City"
                                        value={values.txt_city} maxLength="50" style={{ borderColor: "black" }}
                                        onChange={CityChangeHandler} autoComplete="off" />
                                    <Form.Control.Feedback type="invalid" tooltip>
                                        Please Enter a City.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="3" controlId="validationFormik101" className="position-relative">
                                    <Form.Label>Prefix</Form.Label>
                                    <Form.Control size="sm" type="text" placeholder="Prefix"
                                        value={values.txt_prefix} maxLength="50" style={{ borderColor: "black" }}
                                        onChange={PrefixChangeHandler} autoComplete="off" />

                                </Form.Group>
                                {/*  */}
                                <Form.Group as={Col} md="3" controlId="validationFormik101" className="position-relative">
                                    <Form.Label>parentOrigin</Form.Label>
                                    <Form.Select size="sm" value={values.drp_prentoriginid}
                                        onChange={ParentOriginChangeHandler}
                                        style={{ borderColor: "black" }}
                                        autoComplete="off">
                                        <option value={values.drp_slectedoriginid} selected disabled={true}>---- SELECT ----</option>
                                        {
                                            drpParentOrigin.map((parent) =>
                                                <option key={parent.parentOriginId}
                                                    value={parent.parentOriginId}>
                                                    {parent.orgineCompanyName}
                                                </option>
                                            )
                                        }
                                    </Form.Select>
                                </Form.Group>
                            </Row>

                            <Row  xs={5} className="m-4">
                                <Form.Group as={Col} md="3" controlId="validationFormik101" className="position-relative">
                                    <Form.Label>State*</Form.Label>
                                    <Form.Control size="sm" required type="text" placeholder="State"
                                        value={values.txt_state} maxLength="50" style={{ borderColor: "black" }}
                                        onChange={StateChangeHandler} autoComplete="off" />
                                    <Form.Control.Feedback type="invalid" tooltip>
                                        Please Enter a State.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                {/*  */}
                                <Form.Group as={Col} md="3" controlId="validationFormik101" className="position-relative">
                                    <Form.Label>PinCode*</Form.Label>
                                    <Form.Control size="sm" required type="text" placeholder="PinCode"
                                        value={values.txt_pincode} maxLength="50" style={{ borderColor: "black" }}
                                        onChange={PinCodeChangeHandler} autoComplete="off" />
                                    <Form.Control.Feedback type="invalid" tooltip>
                                        Please Enter a PinCode.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Snackbar
                                anchorOrigin={{ vertical: 'top', horizontal: 'center', }}
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
                            <Button onClick={addOrigin} disabled={submit()} className=" p-1" type="submit">
                                Submit
                            </Button>
                            <Button className=" p-1" onClick={updateOrigin} disabled={isDisabled()} >update</Button>
                            <Button className=" p-1" onClick={cancle}>Reset</Button>
                            <Button className=" p-1" disabled={isDisabled()} onClick={deleteOrigin}>Delete</Button>
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
                                                <TableCell >Origin Company Name</TableCell>
                                                <TableCell >Origin Company code</TableCell>
                                                <TableCell >Country Name</TableCell>
                                                <TableCell >City</TableCell>
                                                <TableCell >State</TableCell>
                                                <TableCell >Pin Code</TableCell>
                                                <TableCell >Parent Origin</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                product.map(
                                                    (origin) => (
                                                        <TableRow hover key={origin.orginId} onClick={() => editOrigin(origin)}>
                                                            <TableCell >{origin.sl_No}</TableCell>
                                                            <TableCell>{origin.orgineCompanyName}</TableCell>
                                                            <TableCell>{origin.orgineCompanyCode}</TableCell>
                                                            <TableCell>{origin.countryName}</TableCell>
                                                            <TableCell>{origin.city}</TableCell>
                                                            <TableCell>{origin.state}</TableCell>
                                                            <TableCell>{origin.pinCode}</TableCell>
                                                            <TableCell>{origin.ParentOrgin}</TableCell>
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

export default OriginCargo;