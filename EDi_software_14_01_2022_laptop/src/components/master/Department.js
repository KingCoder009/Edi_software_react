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


function Department(props) {
    const classes = useStyles();
    const [notefy, setNotedfy] = useState(false);
    // const [open, setOpen] = useState(true);
    // const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [LodingUd, setLodingU_D] = useState(false);
    const [LodingDelete ,setLodingDelete] = useState(false);
    const [product, setProduct] = useState([]);
    const [validated, setValidated] = useState(false);
    const [values, setValues] = useState({
        txt_CompanyName: "",
        txt_Department: "",
        txt_department_id: 0,
        txt_infoMassage:""
    });
    const getAllData = async () => {
        Organizetion.getDepartment().then(res => {
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

    const addDepartment = (e) => {
        e.preventDefault();
        setLoading(true);
        let DesignationDetails = { departmentName: values.txt_Department ,companyName:values.txt_CompanyName};
        if (!values.txt_CompanyName && !values.txt_Department) {
            setValues({
                txt_CompanyName: "",
                txt_Department: "",
                txt_department_id: 0,
            })
            setLoading(false);
            setValidated(false);
            setNotedfy(true);
        }
        else {
            Organizetion.addDepartment(DesignationDetails).then((res) => {
                setValues({
                    txt_infoMassage: res.data.message,
                    txt_CompanyName: "",
                    txt_Department: "",
                    txt_department_id: 0,
                })
                setLoading(false);
                setValidated(false);
                setNotedfy(true);
                Organizetion.getDepartment().then(res => {
                    setProduct(res.data);
                });
            }).catch(error => {
                if (!values.txt_CompanyName) {
                    setValues({
                        txt_CompanyName: "",
                        txt_Department: "",
                        txt_department_id: 0,
                    });
                    setLoading(false);
                    setValidated(true);
                    setNotedfy(false);
                }
                else {
                    setValues({
                        txt_infoMassage: error.message,
                        txt_CompanyName: "",
                        txt_Department: "",
                        txt_department_id: 0,
                    })
                    setLoading(false);
                    setValidated(true);
                    setNotedfy(true)
                }
            })
        }
    };
    const updateDepartmnet = (e) => {
        e.preventDefault();
        setLodingU_D(true);
        let DesignationDetails = { departmentName: values.txt_Department ,companyName:values.txt_CompanyName };
        if (!values.txt_CompanyName && !values.txt_Department && values.txt_department_id===0) {
            setValues({
                txt_CompanyName: "",
                txt_Department: "",
                txt_department_id: 0,
            })
            setLodingU_D(false);
            setValidated(false);
            setNotedfy(true);
        }
        else {
        console.log("point " + values.txt_department_id)
        console.log("DesignationDetails " + JSON.stringify(DesignationDetails))
        Organizetion.updateDepartment(values.txt_department_id, DesignationDetails).then((res) => {
            setValues({
                txt_infoMassage: res.data.message,
                txt_CompanyName: "",
                txt_Department: "",
                txt_department_id: 0,
            });
            setLodingU_D(false);
            setValidated(false);
            setNotedfy(true);
            Organizetion.getDepartment().then(res => {
                setProduct(res.data);
            });
        }).catch(error => {
            setValues({
                txt_infoMassage: error.message,
                txt_CompanyName: "",
                txt_Department: "",
                txt_department_id: 0,
            })
            setLodingU_D(false);
            setValidated(true);
            setNotedfy(true);
        })
    }
    };
    const deleteDepartment = (e) => {
        e.preventDefault();
        setLodingDelete(true);
        if (values.txt_department_id === 0) {
            setValues({
                txt_CompanyName: "",
                txt_Department: "",
                txt_department_id: 0,
            });
            setLodingDelete(false);
            setValidated(false);
            setNotedfy(true);
        }
        else {
        Organizetion.deleteDepartment(values.txt_department_id).then((res) => {
            setValues({
                txt_infoMassage: res.data.message,
                txt_CompanyName: "",
                txt_Department: "",
                txt_department_id: 0,
            });
            setLodingDelete(false);
            setValidated(false);
            setNotedfy(true);
            Organizetion.getDepartment().then(res => {
                setProduct(res.data);
            })
        }).catch(error => {
            setValues({
                txt_infoMassage: error.message,
                txt_CompanyName: "",
                txt_Department: "",
                txt_department_id: 0,
            });
            setLodingDelete(false);
            setValidated(true);
            setNotedfy(true);
        })
    }
    };
    const cancle = () => {
        setLodingDelete(false);
        setValues({
            txt_CompanyName: "",
            txt_Department: "",
            txt_department_id: 0,
        })
    }
    const editdepartment = (department) => {
        setValues({
            txt_department_id:department.departmentId,
            txt_CompanyName: department.companyName,
            txt_Department:department.departmentName

        })
    };

    const CompanyNameChangeHandler = (e) => {
        setValues({ ...values, txt_CompanyName: e.target.value })
    };
    const DepartmentChangeHandler = (e) => {
        setValues({ ...values, txt_Department: e.target.value })
    };

    const isDisabled = () => {
        if (values.txt_department_id === 0) {
            return true
        } else {
            return false
        }
    };
    const submit = () => {
        if (values.txt_department_id > 0) {
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
            <div style={{ marginTop: "3rem" }} />
            <Form noValidate validated={validated} style={{ fontFamily: "serif", overflowX: "hidden" }}>
                <Row>
                    <Col xs={11} style={{ margin: "auto" }} className=" font-serif">
                        <Form.Text style={{ fontSize: "20px", color: "black" }}>Department</Form.Text>
                        <Card style={{ borderTop: "4px solid rgb(175, 174, 129)", borderLeft: "3px solid rgb(128, 127, 96)" }}>
                            <center className="m-3">
                                <Row>
                                    <Form.Group as={Col} md="4" controlId="validationFormik101" className="position-relative">
                                        <Form.Label>CompanyName*</Form.Label>
                                        <Form.Control size="sm" required type="text" placeholder="CompanyName"
                                            value={values.txt_CompanyName} maxLength="50" style={{ borderColor: "black" }}
                                            onChange={CompanyNameChangeHandler} autoComplete="off" />
                                        <Form.Control.Feedback type="invalid" tooltip>
                                            Please Enter a CompanyName.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group as={Col} md="4" controlId="validationFormik101" className="position-relative">
                                        <Form.Label>Department*</Form.Label>
                                        <Form.Control size="sm" required type="text" placeholder="Department"
                                            value={values.txt_Department} maxLength="50" style={{ borderColor: "black" }}
                                            onChange={DepartmentChangeHandler} autoComplete="off" />
                                        <Form.Control.Feedback type="invalid" tooltip>
                                            Please Enter a Department.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                            </center>
                            <Row xs={5} className="mx-4">

                            </Row>
                            <Snackbar
                                anchordepartment={{ vertical: 'top', horizontal: 'center', }}
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
                            <Button onClick={addDepartment} disabled={submit()+loading} className=" p-1" type="submit">
                            {loading ? 'Processing...' : 'submit'}
                            </Button>
                            <Button className=" p-1" onClick={updateDepartmnet} disabled={isDisabled()+LodingUd} >{LodingUd ? 'Processing...' : 'update'}</Button>
                            <Button className=" p-1" onClick={cancle}>Reset</Button>
                            <Button className=" p-1" disabled={isDisabled()+LodingDelete} onClick={deleteDepartment}>{LodingDelete ? 'Processing...' : 'delete'}</Button>
                        </ButtonToolbar >
                        <Card style={{ height: "20rem", borderTop: "4px solid rgb(175, 174, 129)", borderLeft: "3px solid rgb(128, 127, 96)" }}>
                            <Col className="m-1">
                                <TableContainer className={classes.container}>
                                    <Table stickyHeader aria-label="sticky table" size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Sl.no</TableCell>
                                                <TableCell >CompanyName</TableCell>
                                                <TableCell >DepartmentName</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                product.map(
                                                    (department) => (
                                                        <TableRow hover key={department.departmentId} onClick={() => editdepartment(department)}>
                                                            <TableCell >{department.sl_No}</TableCell>
                                                            <TableCell>{department.companyName}</TableCell>
                                                            <TableCell>{department.departmentName}</TableCell>
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

export default Department;