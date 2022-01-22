import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Button, Card, ButtonToolbar } from "react-bootstrap";
import {
    // Backdrop, makeStyles, CircularProgress,
     IconButton, Snackbar,
    Table, TableBody, TableCell, TableHead, TableRow, TableContainer
} from '@material-ui/core';
import Sidebar from '../menus/Sidebar';
import CloseIcon from '@material-ui/icons/Close';
// import { removeUserSession } from '../Utils/Common';
import PlaceServices from '../../sevices/masterServices/PlaceServices';

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
function ParentOriginCustomer(props) {
    // const classes = useStyles();
    const [notefy, setNotedfy] = useState(false);
    // const [open, setOpen] = useState(true);
    // const [error, setError] = useState(false);
    const [drpcountry, setDrpcountry] = useState([]);
    const [product, setProduct] = useState([])
    const [validated, setValidated] = useState(false);
    const [values, setValues] = useState({
        txt_orginId: 0,
        drp_countryId: "",
        txt_selectedCountryID: "",
        txt_addresh: "",
        txt_companyname: "",
        txt_contct_number: "",
        txt_company_code: "",
        txt_emailid: "",
        tbl_pointId: 0,
        txt_infoMassage: ""
    });
    const drpdata = async () => {
        PlaceServices.getCountry().then(res => {
            setDrpcountry(res.data)
        });
        PlaceServices.getParentOrigin().then(res => {
            // setOpen(false)
            // setError(false)
            setProduct(res.data);
        }).catch(error => {
            // setValues({txt_infoMassage:error.message})
            // setOpen(true)
            // setError(true)
        })
    };
    useEffect(() => {
        drpdata();
    }, []);

    const addOrigin = (e) => {
        e.preventDefault();
        let ParentoriginDetails = {
            orgineCompanyName: values.txt_companyname, countryId: values.drp_countryId
            , address: values.txt_addresh, contactNo: values.txt_contct_number, orgineCompanyCode: values.txt_company_code,
            emailId: values.txt_emailid};
        PlaceServices.addParentOrgin(ParentoriginDetails).then((res) => {
            setValues({
                txt_infoMassage: res.data.message,
                txt_orginId: 0,
                drp_countryId: "",
                txt_selectedCountryID: "",
                txt_addresh: "",
                txt_companyname: "",
                txt_contct_number: "",
                txt_company_code: "",
                txt_emailid: "",
                tbl_pointId: 0,
            })
            setValidated(false);
            setNotedfy(true)
            PlaceServices.getParentOrigin().then(res => {
                setProduct(res.data);
            })
        }).catch(error => {
            setValues({
                txt_infoMassage: error.message,
                txt_orginId: 0,
                drp_countryId: "",
                txt_selectedCountryID: "",
                txt_addresh: "",
                txt_companyname: "",
                txt_contct_number: "",
                txt_company_code: "",
                txt_emailid: "",
                tbl_pointId: 0,
            })
            setValidated(true);
            setNotedfy(true)
        })
    };
    const updateOrigin = (e) => {
        e.preventDefault();
        let ParentoriginDetails = {
            orgineCompanyName: values.txt_companyname, countryId: values.drp_countryId
            , address: values.txt_addresh, contactNo: values.txt_contct_number, orgineCompanyCode: values.txt_company_code,
          emailId: values.txt_emailid
        };
        PlaceServices.updateParentOrgin(values.tbl_pointId, values.txt_orginId, ParentoriginDetails).then((res) => {
            setValues({
                txt_infoMassage: res.data.message,
                txt_orginId: 0,
                drp_countryId: "",
                txt_selectedCountryID: "",
                txt_addresh: "",
                txt_companyname: "",
                txt_contct_number: "",
                txt_company_code: "",
                txt_emailid: "",
                tbl_pointId: 0,
            })
            setValidated(false);
            setNotedfy(true)
            PlaceServices.getParentOrigin().then(res => {
                setProduct(res.data);
            })
        }).catch(error => {
            setValues({
                txt_infoMassage: error.message,
                txt_orginId: 0,
                drp_countryId: "",
                txt_selectedCountryID: "",
                txt_addresh: "",
                txt_companyname: "",
                txt_contct_number: "",
                txt_company_code: "",
                txt_emailid: "",
                tbl_pointId: 0,
            })
            setValidated(true);
            setNotedfy(true)
        })
    };
    const deleteOrigin = (e) => {
        e.preventDefault();
        console.log("point id "+values.tbl_pointId);
        PlaceServices.deleteParentOrgin(values.tbl_pointId).then((res) => {
            setValues({
                txt_infoMassage: res.data.message,
                txt_orginId: 0,
                drp_countryId: "",
                txt_selectedCountryID: "",
                txt_addresh: "",
                txt_companyname: "",
                txt_contct_number: "",
                txt_company_code: "",
                txt_emailid: "",
                tbl_pointId: 0,
            })
            setValidated(false);
            setNotedfy(true)
            PlaceServices.getParentOrigin().then(res => {
                setProduct(res.data);
            })
        }).catch(error => {
            setValues({
                txt_infoMassage: error.message,
                txt_orginId: 0,
                drp_countryId: "",
                txt_selectedCountryID: "",
                txt_addresh: "",
                txt_companyname: "",
                txt_contct_number: "",
                txt_company_code: "",
                txt_emailid: "",
                tbl_pointId: 0,
            })
            setValidated(true);
            setNotedfy(true)
        })
    };
    const cancle = () => {
        setValues({
            txt_orginId: 0,
            drp_countryId: "",
            txt_selectedCountryID: "",
            txt_addresh: "",
            txt_companyname: "",
            txt_contct_number: "",
            txt_company_code: "",
            txt_emailid: "",
            tbl_pointId: 0,
        })
    }
    const editOrigin = (origin) => {
        setValues({
            txt_orginId: origin.parentOriginId,
            drp_countryId: origin.countryId,
            txt_addresh:origin.address,
            txt_companyname: origin.orgineCompanyName,
            txt_contct_number: origin.contactNo,
            txt_company_code: origin.orgineCompanyCode,
            txt_emailid: origin.emailId,
            tbl_pointId: origin.pointId
        })
    };
    const CountryChangehandle = (e) => {
        setValues({ ...values, drp_countryId: e.target.value });
    };
    const AddreshChangeHandler = (e) => {
        setValues({ ...values, txt_addresh: e.target.value })
    };
    const CompanyNameChangeHandler = (e) => {
        setValues({ ...values, txt_companyname: e.target.value.replace(/[^a-zA-Z ]/ig,'')})
    };
    const ContactChangeHandler = (e) => {
        setValues({ ...values, txt_contct_number: e.target.value })
    };
    const CompanyCodeChangeHandler = (e) => {
        setValues({ ...values, txt_company_code: e.target.value })
    };
    const EmailidChangeHandler = (e) => {
        setValues({ ...values, txt_emailid: e.target.value })
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
                    <Form.Text style={{ fontSize: "20px", color: "black" }}>Parent Origin Custamer </Form.Text>
                    <Card style={{ borderTop: "4px solid rgb(175, 174, 129)", borderLeft: "3px solid rgb(128, 127, 96)" }}>
                        <Row >
                            <Col xs={3} className="mx-4">
                                <Form.Label>CountryName*</Form.Label>
                                <Form.Select required size="sm" value={values.drp_countryId}
                                    onChange={CountryChangehandle}
                                    style={{ borderColor: "black" }}
                                    autoComplete="off" >
                                    <option value={values.txt_selectedCountryID} selected disabled={true}>---- SELECT ----</option>
                                    {
                                        drpcountry.map((countrys) =>
                                            <option key={countrys.countryId}
                                                value={countrys.countryId}>
                                                {countrys.countryName}
                                            </option>
                                        )
                                    }
                                    <Form.Control.Feedback type="invalid" tooltip>
                                        Please Select a countryName.
                                    </Form.Control.Feedback>
                                </Form.Select>
                                {/*  */}
                                <Form.Group className="mb-3">
                                    <Form.Label>Addresh</Form.Label>
                                    <Form.Control as="textarea" value={values.txt_addresh}
                                        onChange={AddreshChangeHandler} rows={2} placeholder="Addresh" autoComplete="off"/>
                                </Form.Group>
                                <Form.Control.Feedback type="invalid" tooltip>
                                    Please Enter a Addresh.
                                </Form.Control.Feedback>
                            </Col>
                            {/*  */}
                            <Col xs={3} className="my-2 mx-2">
                                <Form.Label>Parent origin Customer Name*</Form.Label>
                                <Form.Control size="sm"  type="text" placeholder="ParentOrigin"
                                    value={values.txt_companyname} maxLength="50" style={{ borderColor: "black" }}
                                    onChange={CompanyNameChangeHandler} autoComplete="off" autoCapitalize="on" />
                                <Form.Control.Feedback type="invalid" tooltip>
                                    Please Enter a Parent Origin Name.
                                </Form.Control.Feedback>
                                <Form.Label>ContectNumber</Form.Label>
                                <Form.Control size="sm" required type="text" placeholder="ContectNumber"
                                    value={values.txt_contct_number} maxLength="15" style={{ borderColor: "black" }}
                                    onChange={ContactChangeHandler} autoComplete="off" />
                                <Form.Control.Feedback type="invalid" tooltip>
                                    Please Enter a ContactNumber.
                                </Form.Control.Feedback>
                            </Col>
                            {/*  */}
                            <Col xs={3} className="my-2 mx-2">
                                <Form.Label>parent origin Customer Code*</Form.Label>
                                <Form.Control size="sm" required type="text" placeholder="CompanyCode"
                                    value={values.txt_company_code} maxLength="5" style={{ borderColor: "black" }}
                                    onChange={CompanyCodeChangeHandler} autoComplete="off" autoCapitalize />
                                <Form.Control.Feedback type="invalid" tooltip>
                                    Please Enter a CompanyCode.
                                </Form.Control.Feedback>
                                {/*  */}
                                <Form.Label>EmailId</Form.Label>
                                <Form.Control size="sm" required type="email" placeholder="EmailId"
                                    value={values.txt_emailid} maxLength="40" style={{ borderColor: "black" }}
                                    onChange={EmailidChangeHandler} autoComplete="off" />
                                <Form.Control.Feedback type="invalid" tooltip>
                                    Please Enter a EmailId.
                                </Form.Control.Feedback>
                            </Col>
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
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            product.map(
                                                (origin) => (
                                                    <TableRow hover key={origin.parentOriginId} onClick={() => editOrigin(origin)}>
                                                        <TableCell >{origin.sl_No}</TableCell>
                                                        <TableCell>{origin.orgineCompanyName}</TableCell>
                                                        <TableCell>{origin.orgineCompanyCode}</TableCell>
                                                        <TableCell>{origin.countryName}</TableCell>
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

export default ParentOriginCustomer;