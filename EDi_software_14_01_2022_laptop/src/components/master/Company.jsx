import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button, Card, ButtonToolbar } from "react-bootstrap";
import {
    // Backdrop,  CircularProgress,makeStyles,
     IconButton, Snackbar,
    Table, TableBody, TableCell, TableHead, TableRow, TableContainer
} from '@material-ui/core';
import Organizetion from '../../sevices/masterServices/Organizetion';
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

function Company(props) {
        // const classes = useStyles();
        const [notefy, setNotedfy] = useState(false);
        // const [open, setOpen] = useState(true);
        // const [error, setError] = useState(false);
        const [product, setProduct] = useState([])
        const [validated, setValidated] = useState(false);
        const [loading, setLoading] = useState(false);
        const [LodingUd, setLodingU_D] = useState(false);
        const [LodingDelete ,setLodingDelete] = useState(false);
        const [values, setValues] = useState({
            txt_Orgsid: 0,
            txt_name: "",
            txt_code: "",
            txt_addresh: "",
            txt_emailid: "",
            txt_Logo: "",
            txt_year_of_Established: "",
            txt_Phon_no: "",
            txt_website: "",       
            txt_tin_no: "",
            txt_Pan_no: "",
            tbl_point_Id:0,
            txt_infoMassage: ""
        });
        const getAllData = async () => {
            Organizetion.getCompany().then(res => {
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
    
        const addOrgs = (e) => {
            e.preventDefault();
            setLoading(true)
            let OrgsDetails = {
                organizetionName: values.txt_name,organizetionCode: values.txt_code,address: values.txt_addresh,
                phoneNumber: values.txt_Phon_no, mailId: values.txt_emailid, website: values.txt_website, tinNumber: values.txt_tin_no,
                panNumber:values.txt_Pan_no, yearOfEstablishment: values.txt_year_of_Established
            };
            if(!values.txt_name || !values.txt_code || !values.txt_year_of_Established )
            {
                setValues({
                    txt_Orgsid: 0,
                    txt_addresh: "",
                    txt_Logo: "",
                    txt_name: "",
                    txt_year_of_Established: "",
                    txt_Phon_no: "",
                    txt_website: "",
                    txt_code: "",
                    txt_emailid: "",
                    txt_tin_no: "",
                    txt_Pan_no: "",
                    tbl_point_Id:0
                })
                setLoading(false)
                setValidated(true);
                setNotedfy(true)
            }
            else{
            Organizetion.addcompany(OrgsDetails).then((res) => {
                setValues({
                    txt_infoMassage: res.data.message,
                    txt_Orgsid: 0,
                    txt_addresh: "",
                    txt_Logo: "",
                    txt_name: "",
                    txt_year_of_Established: "",
                    txt_Phon_no: "",
                    txt_website: "",
                    txt_code: "",
                    txt_emailid: "",
                    txt_tin_no: "",
                    txt_Pan_no: "",
                    tbl_point_Id:0
                })
                setLoading(false)
                setValidated(false);
                setNotedfy(true)
                Organizetion.getCompany().then(res => {
                    setProduct(res.data);
                })
                
            }).catch(error => {
                if(!values.txt_name || !values.txt_code || !values.txt_year_of_Established || !values.txt_Phon_no)
                {
                setValues({
                    txt_Orgsid: 0,
                    txt_addresh: "",
                    txt_Logo: "",
                    txt_name: "",
                    txt_year_of_Established: "",
                    txt_Phon_no: "",
                    txt_website: "",
                    txt_code: "",
                    txt_emailid: "",
                    txt_tin_no: "",
                    txt_Pan_no: "",
                    tbl_point_Id:0
                })
                setLoading(false)
                setValidated(true);
                setNotedfy(false)
            }
            else{
                setValues({
                    txt_infoMassage: error.message,
                    txt_Orgsid: 0,
                    txt_addresh: "",
                    txt_Logo: "",
                    txt_name: "",
                    txt_year_of_Established: "",
                    txt_Phon_no: "",
                    txt_website: "",
                    txt_code: "",
                    txt_emailid: "",
                    txt_tin_no: "",
                    txt_Pan_no: "",
                    tbl_point_Id:0
                })
                setLoading(false)
                setValidated(true);
                setNotedfy(true)
            }
            })
        }
        };
        const updateOrgs = (e) => {
            e.preventDefault();
            setLodingU_D(true)
            let OrgsDetails = {
                organizetionName: values.txt_name,organizetionCode: values.txt_code,address: values.txt_addresh,
                phoneNumber: values.txt_Phon_no, mailId: values.txt_emailid, website: values.txt_website, tinNumber: values.txt_tin_no,
                panNumber:values.txt_Pan_no, yearOfEstablishment: values.txt_year_of_Established
            };
            console.log("Orgs " + values.txt_Orgsid)
            console.log("OrgsDetails " + JSON.stringify(OrgsDetails))
            Organizetion.updatecompany(values.tbl_point_Id, OrgsDetails).then((res) => {
                setValues({
                    txt_infoMassage: res.data.message,
                    txt_Orgsid: 0,
                    txt_addresh: "",
                    txt_Logo: "",
                    txt_name: "",
                    txt_year_of_Established: "",
                    txt_Phon_no: "",
                    txt_website: "",
                    txt_code: "",
                    txt_emailid: "",
                    txt_tin_no: "",
                    txt_Pan_no: "",
                    tbl_point_Id:0
                })
                setLodingU_D(false)
                setValidated(false);
                setNotedfy(true);
                Organizetion.getCompany().then(res => {
                    setProduct(res.data);
                })
            }).catch(error => {
                setValues({
                    txt_infoMassage: error.message,
                    txt_Orgsid: 0,
                    txt_addresh: "",
                    txt_Logo: "",
                    txt_name: "",
                    txt_year_of_Established: "",
                    txt_Phon_no: "",
                    txt_website: "",
                    txt_code: "",
                    txt_emailid: "",
                    txt_tin_no: "",
                    txt_Pan_no: "",
                    tbl_point_Id:0
                })
                setLodingU_D(false)
                setValidated(true);
                setNotedfy(true);
            })
        };
        const deleteOrgs = (e) => {
            e.preventDefault();
            setLodingDelete(true)
            Organizetion.deletecompany(values.tbl_point_Id).then((res) => {
                setValues({
                    txt_infoMassage: res.data.message,
                    txt_Orgsid: 0,
                    txt_addresh: "",
                    txt_Logo: "",
                    txt_name: "",
                    txt_year_of_Established: "",
                    txt_Phon_no: "",
                    txt_website: "",
                    txt_code: "",
                    txt_emailid: "",
                    txt_tin_no: "",
                    txt_Pan_no: "",
                    tbl_point_Id:0
                })
                setLodingDelete(false)
                setValidated(false);
                setNotedfy(true);
                Organizetion.getCompany().then(res => {
                    setProduct(res.data);
                })
            }).catch(error => {
                setValues({
                    txt_infoMassage: error.message,
                    txt_Orgsid: 0,
                    txt_addresh: "",
                    txt_Logo: "",
                    txt_name: "",
                    txt_year_of_Established: "",
                    txt_Phon_no: "",
                    txt_website: "",
                    txt_code: "",
                    txt_emailid: "",
                    txt_tin_no: "",
                    txt_Pan_no: "",
                    tbl_point_Id:0
                })
                setLodingDelete(false)
                setValidated(true);
                setNotedfy(true);
            })
        };
        const cancle = () => {
            setValues({
                txt_Orgsid: 0,
                txt_addresh: "",
                txt_Logo: "",
                txt_name: "",
                txt_year_of_Established: "",
                txt_Phon_no: "",
                txt_website: "",
                txt_code: "",
                txt_emailid: "",
                txt_tin_no: "",
                txt_Pan_no: "",
                tbl_point_Id:0
            })
            setValidated(false);
            setNotedfy(false);
        }
        const editOrgs = (Orgs) => {
            setValues({
                txt_Orgsid: Orgs.organizetionId,
                txt_addresh: Orgs.address,
                txt_Logo: Orgs.organizationLogo,
                txt_name: Orgs.organizetionName,
                txt_year_of_Established: Orgs.yearOfEstablishment,
                txt_Phon_no: Orgs.phoneNumber,
                txt_website: Orgs.website,
                txt_code: Orgs.organizetionCode,
                txt_emailid: Orgs.mailId,
                txt_tin_no: Orgs.tinNumber,
                txt_Pan_no: Orgs.panNumber,
                tbl_point_Id: Orgs.pointId,
            })
        };
    
        const AddreshChangeHandler = (e) => {
            setValues({ ...values, txt_addresh: e.target.value })
        };
        const LogoChangeHandler = (e) => {
            setValues({ ...values, txt_Logo: e.target.value })
        };
        const NameChangeHandler = (e) => {
            setValues({ ...values, txt_name: e.target.value })
        };
        const EstablishChangeHandler = (e) => {
            setValues({ ...values, txt_year_of_Established: e.target.value })
        };
        const PhonChangeHandler = (e) => {
            setValues({ ...values, txt_Phon_no: e.target.value })
        };
        const WebsitChangeHandler = (e) => {
            setValues({ ...values, txt_website: e.target.value })
        };
        const CodeChangeHandler = (e) => {
            setValues({ ...values, txt_code: e.target.value })
        };
        const EmailidChangeHandler = (e) => {
            setValues({ ...values, txt_emailid: e.target.value })
        };
        const TinCodeChangeHandler = (e) => {
            setValues({ ...values, txt_tin_no: e.target.value })
        };
        const PanNoChangeHandler = (e) => {
            setValues({ ...values, txt_Pan_no: e.target.value })
        };
        const isDisabled = () => {
            if (values.tbl_point_Id === 0) {
                return true
            } else {
                return false
            }
        };
        const submit = () => {
            if (values.tbl_point_Id > 0) {
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
                            <Form.Text style={{ fontSize: "20px", color: "black" }}>Company</Form.Text>
                            <Card style={{ borderTop: "4px solid rgb(175, 174, 129)", borderLeft: "3px solid rgb(128, 127, 96)" }}>
                                <Row xs={5} className="mx-4">
                                    <Form.Group as={Col} md="4" controlId="validationFormik101" className="position-relative">
                                        <Form.Label>Name*</Form.Label>
                                        <Form.Control size="sm" required type="text" placeholder="Name"
                                            value={values.txt_name} maxLength="50" style={{ borderColor: "black" }}
                                            onChange={NameChangeHandler} autoComplete="off" />
                                        <Form.Control.Feedback type="invalid" tooltip>
                                            Please Enter a Name.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                  
                                    <Form.Group as={Col} md="4" controlId="validationFormik101" className="position-relative">
                                        {/* <Form.Group className="mb-3"> */}
                                        <Form.Label>Addresh</Form.Label>
                                        <Form.Control as="textarea" value={values.txt_addresh}
                                            onChange={AddreshChangeHandler} rows={2} placeholder="Addresh" />
                                    </Form.Group>
                                <Form.Group as={Col} md="4" controlId="validationFormik101" className="position-relative">
                                        <Form.Label>Website</Form.Label>
                                        <Form.Control size="sm" type="text" placeholder="State"
                                            value={values.txt_website} maxLength="50" style={{ borderColor: "black" }}
                                            onChange={WebsitChangeHandler} autoComplete="off" />
                                    </Form.Group>
                                    
                                    </Row>
                                    {/*  */}
                                    <Row xs={5} className="mx-4" >
                                    <Form.Group as={Col} md="4" controlId="validationFormik101" className="position-relative">
                                        <Form.Label>Logo</Form.Label>
                                        <Form.Control size="sm" type="text" placeholder="Logo"
                                            value={values.txt_Logo} maxLength="50" style={{ borderColor: "black" }}
                                            onChange={LogoChangeHandler} autoComplete="off" />
                                    </Form.Group>
                                        </Row>
                                    {/*  */}
                                    <Row xs={5} className="mx-4">
                                    <Form.Group as={Col} md="4" controlId="validationFormik101" className="position-relative">
                                        <Form.Label>Code*</Form.Label>
                                        <Form.Control size="sm" required type="text" placeholder="Code"
                                            value={values.txt_code} maxLength="5" style={{ borderColor: "black" }}
                                            onChange={CodeChangeHandler} autoComplete="off" />
                                        <Form.Control.Feedback type="invalid" tooltip>
                                            Please Enter a Code.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="4" controlId="validationFormik101" className="position-relative">
                                        <Form.Label>Tin Number</Form.Label>
                                        <Form.Control size="sm" required type="text" placeholder="Tin Number"
                                            value={values.txt_tin_no} maxLength="50" style={{ borderColor: "black" }}
                                            onChange={TinCodeChangeHandler} autoComplete="off" />
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
                                    <Form.Group as={Col} md="4" className="position-relative">
                                        <Form.Label>year of  Establishment*</Form.Label>
                                        <Form.Control size="sm" required type="text" placeholder="year of  Establishment"
                                            value={values.txt_year_of_Established} maxLength="15" style={{ borderColor: "black" }}
                                            onChange={EstablishChangeHandler} autoComplete="off"  />
                                       <Form.Control.Feedback type="invalid" tooltip>
                                            Please Enter a Year of Establishment.
                                        </Form.Control.Feedback>
                                    </Form.Group>    
                                    <Form.Group as={Col} md="4" controlId="validationFormik101" className="position-relative">
                                        <Form.Label>PhonNumber</Form.Label>
                                        <Form.Control size="sm" type="text" placeholder="phone Number"
                                            value={values.txt_Phon_no} maxLength="50" style={{ borderColor: "black" }}
                                            onChange={PhonChangeHandler} autoComplete="off" />
                                    </Form.Group> 
                                    <Form.Group as={Col} md="4" controlId="validationFormik101" className="position-relative">
                                        <Form.Label>Pan No</Form.Label>
                                        <Form.Control size="sm"  type="text" placeholder="Pan.No"
                                            value={values.txt_Pan_no} maxLength="50" style={{ borderColor: "black" }}
                                            onChange={PanNoChangeHandler} autoComplete="off" />
                                    </Form.Group>                         
                                </Row>
                                <Row  xs={5} className="m-4">
                                    {/*  */}
                                </Row>
                               
                                <Snackbar
                                    anchorOrgs={{ vertical: 'top', horizontal: 'center', }}
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
                                <Button onClick={addOrgs} disabled={submit()+loading} className=" p-1" type="submit">
                                {loading ? 'Processing...' : 'submit'}
                                </Button>
                                <Button className=" p-1" onClick={updateOrgs} disabled={isDisabled()+LodingUd} >{LodingUd ? 'Processing...' : 'update'}</Button>
                                <Button className=" p-1" onClick={cancle}>Reset</Button>
                                <Button className=" p-1" disabled={isDisabled()+LodingDelete} onClick={deleteOrgs}>{LodingDelete ? 'Processing...' : 'update'}</Button>
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
                                                    <TableCell >Clearance Org Name</TableCell>
                                                    <TableCell >Clearance Org code</TableCell>
                                                    <TableCell >Phone Number</TableCell>
                                                    <TableCell >Adreesh</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {
                                                    product.map(
                                                        (orgs) => (
                                                            <TableRow hover key={orgs.organizetionId} onClick={() => editOrgs(orgs)}>
                                                                <TableCell >{orgs.sl_No}</TableCell>
                                                                <TableCell>{orgs.organizetionName}</TableCell>
                                                                <TableCell>{orgs.organizetionCode}</TableCell>
                                                                <TableCell>{orgs.phoneNumber}</TableCell>
                                                                <TableCell>{orgs.address}</TableCell>
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

export default Company;