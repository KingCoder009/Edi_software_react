import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button, Card, ButtonToolbar, InputGroup } from "react-bootstrap";
import {
    // Backdrop,  CircularProgress,
    makeStyles, IconButton, Snackbar,
    Table, TableBody, TableCell, TableHead, TableRow, TableContainer, FormControl, TextField
} from '@material-ui/core';
import Organizetion from '../../sevices/masterServices/Organizetion';
import Sidebar from '../menus/Sidebar';
import CloseIcon from '@material-ui/icons/Close';
import {
    //  removeUserSession,
              getDate} from '../Utils/Common';
import PlaceServices from '../../sevices/masterServices/PlaceServices';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: "black",
        color: '#fff',
    },
    container: {
        margin: theme.spacing(1),
        width: "96%",
        height: 290,
    },
}));

function Employee(props) {
    const classes = useStyles();
    const [notefy, setNotedfy] = useState(false);
    // const [open, setOpen] = useState(true);
    // const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [LodingUd, setLodingU_D] = useState(false);
    const [LodingDelete ,setLodingDelete] = useState(false);
    const [validated, setValidated] = useState(false);
    const [product, setProduct] = useState([])
    const [drpCountry, setDrpCountry] = useState([])
    const [drpOrganizetion, setDrpOrgs] = useState([])
    const [drpWorkLocation, setWRKlction] = useState([])
    const [drpDesination, setDsgNation] = useState([])
    const [drpDepartmnt, setDeprtmnt] = useState([])
    const [drpLctionTyp, setLctionType] = useState([])
    const [valide, setValide] = useState(false)
    const [values, setValues] = useState({
        txt_EmployeeName: "",
        txt_Gender: "Male",
        txt_DateOfBitrh:  "1994-01-01",
        txt_DateOfJoin: getDate(),
        txt_Address: "",
        txt_MobileNumber: "",
        txt_EmailId: "",
        drp_DesignationId: "",
        drp_DesinationSelectedId: "",
        drp_DepartmentId: "",
        drp_DepartmentSelectedId: "",
        txt_UserName: "",
        txt_Password: "",
        drp_OrganizationId: "",
        drp_OrganizationSelectedId: "",
        drp_CountryId: "",
        drp_CountrySelectedId: "",
        drp_Location_type: "",
        drp_selectedType: "",
        drp_WorkLocationId: "",
        drp_WorkLocationSelectedId: "",
        tbl_user_id: 0,
        txt_infoMassage: ""
    });
    const getAllData = async () => {
        //get drp country
        PlaceServices.getCountry().then(res => {
            setDrpCountry(res.data)
        })

        //drp company
        Organizetion.getcompany().then(res => {
            setDrpOrgs(res.data)
        })
        //drp designation
        Organizetion.getDesignetion().then(res => {
            setDsgNation(res.data)
        })
        //drp departmnt
        Organizetion.getDepartment().then(res => {
            setDeprtmnt(res.data)
        })
        //drp location typ
        Organizetion.getPointType().then(res => {
            setLctionType(res.data)
        })
        //get Employee
        Organizetion.getEmployee().then(res => {
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

    const addEmployee = (e) => {
        e.preventDefault();
        setLoading(true);
        let EmployeeDetails = {
            EmployeeName: values.txt_EmployeeName, Gender: values.txt_Gender, DateOfBitrh: values.txt_DateOfBitrh, DateOfJoin: values.txt_DateOfJoin,
            Address: values.txt_Address, MobileNumber: values.txt_MobileNumber, EmailId: values.txt_EmailId, DesignationId: values.drp_DesignationId,
            DepartmentId: values.drp_DepartmentId, UserName: values.txt_UserName, Password: values.txt_Password, OrganizationId: values.drp_OrganizationId,
            WorkLocationId: values.drp_WorkLocationId
        };
        if (!values.txt_EmployeeName || !values.drp_CountryId || !values.drp_OrganizationId || !values.drp_WorkLocationId || !values.drp_DesignationId || !values.drp_DepartmentId || !values.txt_Gender ||!values.txt_DateOfBitrh || !values.txt_DateOfJoin) {
            setValues({
                txt_EmployeeName: "",
                txt_Gender: "Male",
                txt_DateOfBitrh: "",
                txt_DateOfJoin: "",
                txt_Address: "",
                txt_MobileNumber: "",
                txt_EmailId: "",
                drp_DesignationId: "",
                drp_DesinationSelectedId: "",
                drp_DepartmentId: "",
                drp_DepartmentSelectedId: "",
                txt_UserName: "",
                txt_Password: "",
                drp_OrganizationId: "",
                drp_OrganizationSelectedId: "",
                drp_CountryId: "",
                drp_CountrySelectedId: "",
                drp_Location_type: "",
                drp_selectedType: "",
                drp_WorkLocationId: "",
                drp_WorkLocationSelectedId: "",
                tbl_user_id: 0
            });
            setLoading(false);
            setValidated(true);
            setNotedfy(true);
            setValide(true)
            
        }
        else {
            Organizetion.addEmploye(EmployeeDetails).then((res) => {
                setValues({
                    txt_infoMassage: res.data.message,
                    txt_EmployeeName: "",
                    txt_Gender: "Male",
                    txt_DateOfBitrh: "",
                    txt_DateOfJoin: "",
                    txt_Address: "",
                    txt_MobileNumber: "",
                    txt_EmailId: "",
                    drp_DesignationId: "",
                    drp_DesinationSelectedId: "",
                    drp_DepartmentId: "",
                    drp_DepartmentSelectedId: "",
                    txt_UserName: "",
                    txt_Password: "",
                    drp_OrganizationId: "",
                    drp_OrganizationSelectedId: "",
                    drp_CountryId: "",
                    drp_CountrySelectedId: "",
                    drp_Location_type: "",
                    drp_selectedType: "",
                    drp_WorkLocationId: "",
                    drp_WorkLocationSelectedId: "",
                    tbl_user_id: 0,
                });
                setLoading(false);
                setValidated(false);
                setNotedfy(true);
                Organizetion.getEmployee().then(res => {
                    setProduct(res.data);
                });

            }).catch(error => {
                if (!values.txt_EmployeeName || !values.drp_CountryId || !values.drp_OrganizationId || !values.drp_WorkLocationId || !values.drp_DesignationId || !values.drp_DepartmentId || !values.txt_Gender) {
                    setValues({
                        txt_EmployeeName: "",
                        txt_Gender: "Male",
                        txt_DateOfBitrh: "",
                        txt_DateOfJoin: "",
                        txt_Address: "",
                        txt_MobileNumber: "",
                        txt_EmailId: "",
                        drp_DesignationId: "",
                        drp_DesinationSelectedId: "",
                        drp_DepartmentId: "",
                        drp_DepartmentSelectedId: "",
                        txt_UserName: "",
                        txt_Password: "",
                        drp_OrganizationId: "",
                        drp_OrganizationSelectedId: "",
                        drp_CountryId: "",
                        drp_CountrySelectedId: "",
                        drp_Location_type: "",
                        drp_selectedType: "",
                        drp_WorkLocationId: "",
                        drp_WorkLocationSelectedId: "",
                        tbl_user_id: 0,
                    })
                    setLoading(false);
                    setValidated(true);
                    setNotedfy(false)
                    if(!values.txt_DateOfBitrh || !values.txt_DateOfJoin){
                        setValide(true)
                    }
                }
                else {
                    setValues({
                        txt_infoMassage: error.message,
                        txt_EmployeeName: "",
                        txt_Gender: "Male",
                        txt_DateOfBitrh: "",
                        txt_DateOfJoin: "",
                        txt_Address: "",
                        txt_MobileNumber: "",
                        txt_EmailId: "",
                        drp_DesignationId: "",
                        drp_DesinationSelectedId: "",
                        drp_DepartmentId: "",
                        drp_DepartmentSelectedId: "",
                        txt_UserName: "",
                        txt_Password: "",
                        drp_OrganizationId: "",
                        drp_OrganizationSelectedId: "",
                        drp_CountryId: "",
                        drp_CountrySelectedId: "",
                        drp_Location_type: "",
                        drp_selectedType: "",
                        drp_WorkLocationId: "",
                        drp_WorkLocationSelectedId: "",
                        tbl_user_id: 0
                    });
                    setLoading(false);
                    setValidated(true);
                    setNotedfy(true)
                }
            })
        }
    };
    const updateEmployee = (e) => {
        e.preventDefault();
        setLodingU_D(true);
        let EmployeeDetails = {
            EmployeeName: values.txt_EmployeeName, Gender: values.txt_Gender, DateOfBitrh: values.txt_DateOfBitrh, DateOfJoin: values.txt_DateOfJoin,
            Address: values.txt_Address, MobileNumber: values.txt_MobileNumber, EmailId: values.txt_EmailId, DesignationId: values.drp_DesignationId,
            DepartmentId: values.drp_DepartmentId, UserName: values.txt_UserName, Password: values.txt_Password, OrganizationId: values.drp_OrganizationId,
            WorkLocationId: values.drp_WorkLocationId
        };
        if (!values.txt_DateOfBitrh || !values.txt_DateOfJoin||!values.txt_EmployeeName || !values.drp_CountryId || !values.drp_OrganizationId || !values.drp_WorkLocationId || !values.drp_DesignationId || !values.drp_DepartmentId || !values.txt_Gender || values.tbl_user_id === 0) {
            setValues({
                txt_EmployeeName: "",
                txt_Gender: "Male",
                txt_DateOfBitrh: "",
                txt_DateOfJoin: "",
                txt_Address: "",
                txt_MobileNumber: "",
                txt_EmailId: "",
                drp_DesignationId: "",
                drp_DesinationSelectedId: "",
                drp_DepartmentId: "",
                drp_DepartmentSelectedId: "",
                txt_UserName: "",
                txt_Password: "",
                drp_OrganizationId: "",
                drp_OrganizationSelectedId: "",
                drp_CountryId: "",
                drp_CountrySelectedId: "",
                drp_Location_type: "",
                drp_selectedType: "",
                drp_WorkLocationId: "",
                drp_WorkLocationSelectedId: "",
                tbl_user_id: 0
            });
            setLodingU_D(false);
            setValidated(true);
            setNotedfy(true)
                setValide(true)
        }
        else {
            console.log("Employee " + values.tbl_user_id)
            console.log("EmployeeDetails " + JSON.stringify(EmployeeDetails))
            Organizetion.updateEmployee(values.tbl_user_id, EmployeeDetails).then((res) => {
                setValues({
                    txt_infoMassage: res.data.message,
                    txt_EmployeeName: "",
                    txt_Gender: "Male",
                    txt_DateOfBitrh: "",
                    txt_DateOfJoin: "",
                    txt_Address: "",
                    txt_MobileNumber: "",
                    txt_EmailId: "",
                    drp_DesignationId: "",
                    drp_DesinationSelectedId: "",
                    drp_DepartmentId: "",
                    drp_DepartmentSelectedId: "",
                    txt_UserName: "",
                    txt_Password: "",
                    drp_OrganizationId: "",
                    drp_OrganizationSelectedId: "",
                    drp_CountryId: "",
                    drp_CountrySelectedId: "",
                    drp_Location_type: "",
                    drp_selectedType: "",
                    drp_WorkLocationId: "",
                    drp_WorkLocationSelectedId: "",
                    tbl_user_id: 0
                });
                setLodingU_D(false);
                setValidated(false);
                setNotedfy(true);
                Organizetion.getEmployee().then(res => {
                    setProduct(res.data);
                })
            }).catch(error => {
                if (!values.txt_EmployeeName ||!values.txt_DateOfBitrh || !values.txt_DateOfJoin || !values.drp_CountryId || !values.drp_OrganizationId || !values.drp_WorkLocationId || !values.drp_DesignationId || !values.drp_DepartmentId || !values.txt_Gender) {
                    setValues({
                        txt_EmployeeName: "",
                        txt_Gender: "Male",
                        txt_DateOfBitrh: "",
                        txt_DateOfJoin: "",
                        txt_Address: "",
                        txt_MobileNumber: "",
                        txt_EmailId: "",
                        drp_DesignationId: "",
                        drp_DesinationSelectedId: "",
                        drp_DepartmentId: "",
                        drp_DepartmentSelectedId: "",
                        txt_UserName: "",
                        txt_Password: "",
                        drp_OrganizationId: "",
                        drp_OrganizationSelectedId: "",
                        drp_CountryId: "",
                        drp_CountrySelectedId: "",
                        drp_Location_type: "",
                        drp_selectedType: "",
                        drp_WorkLocationId: "",
                        drp_WorkLocationSelectedId: "",
                        tbl_user_id: 0,
                    });
                    setLodingU_D(false);
                    setValidated(true);
                    setNotedfy(false);
                    setValide(true)
                }
                else {
                    setValues({
                        txt_infoMassage: error.message,
                        txt_EmployeeName: "",
                        txt_Gender: "Male",
                        txt_DateOfBitrh: "",
                        txt_DateOfJoin: "",
                        txt_Address: "",
                        txt_MobileNumber: "",
                        txt_EmailId: "",
                        drp_DesignationId: "",
                        drp_DesinationSelectedId: "",
                        drp_DepartmentId: "",
                        drp_DepartmentSelectedId: "",
                        txt_UserName: "",
                        txt_Password: "",
                        drp_OrganizationId: "",
                        drp_OrganizationSelectedId: "",
                        drp_CountryId: "",
                        drp_CountrySelectedId: "",
                        drp_Location_type: "",
                        drp_selectedType: "",
                        drp_WorkLocationId: "",
                        drp_WorkLocationSelectedId: "",
                        tbl_user_id: 0
                    });
                    setLodingU_D(false);
                    setValidated(true);
                    setNotedfy(true)
                }
            })
        }
    };
    const deleteEmployee = (e) => {
        e.preventDefault();
        setLodingDelete(true);
        if(values.tbl_user_id === 0){
            setValues({txt_infoMassage:"Employee Not selected"});
            setNotedfy(true)
            setLodingDelete(false);
        }
        Organizetion.deleteEmployee(values.tbl_user_id).then((res) => {
            setValues({
                txt_infoMassage: res.data.message,
                txt_EmployeeName: "",
                txt_Gender: "Male",
                txt_DateOfBitrh: "",
                txt_DateOfJoin: "",
                txt_Address: "",
                txt_MobileNumber: "",
                txt_EmailId: "",
                drp_DesignationId: "",
                drp_DesinationSelectedId: "",
                drp_DepartmentId: "",
                drp_DepartmentSelectedId: "",
                txt_UserName: "",
                txt_Password: "",
                drp_OrganizationId: "",
                drp_OrganizationSelectedId: "",
                drp_CountryId: "",
                drp_CountrySelectedId: "",
                drp_Location_type: "",
                drp_selectedType: "",
                drp_WorkLocationId: "",
                drp_WorkLocationSelectedId: "",
                tbl_user_id: 0
            });
            setLodingDelete(false);
            setValidated(false);
            setNotedfy(true);
            Organizetion.getEmployee().then(res => {
                setProduct(res.data);
            })
        }).catch(error => {
            setValues({
                txt_infoMassage: error.message,
                txt_EmployeeName: "",
                txt_Gender: "Male",
                txt_DateOfBitrh: "",
                txt_DateOfJoin: "",
                txt_Address: "",
                txt_MobileNumber: "",
                txt_EmailId: "",
                drp_DesignationId: "",
                drp_DesinationSelectedId: "",
                drp_DepartmentId: "",
                drp_DepartmentSelectedId: "",
                txt_UserName: "",
                txt_Password: "",
                drp_OrganizationId: "",
                drp_OrganizationSelectedId: "",
                drp_CountryId: "",
                drp_CountrySelectedId: "",
                drp_Location_type: "",
                drp_selectedType: "",
                drp_WorkLocationId: "",
                drp_WorkLocationSelectedId: "",
                tbl_user_id: 0
            });
            setLodingDelete(false);
            setValidated(false);
            setNotedfy(true);
        })
    };
    const cancle = () => {
        setValues({
            txt_EmployeeName: "",
            txt_Gender: "Male",
            txt_DateOfBitrh: "",
            txt_DateOfJoin: "",
            txt_Address: "",
            txt_MobileNumber: "",
            txt_EmailId: "",
            drp_DesignationId: "",
            drp_DesinationSelectedId: "",
            drp_DepartmentId: "",
            drp_DepartmentSelectedId: "",
            txt_UserName: "",
            txt_Password: "",
            drp_OrganizationId: "",
            drp_OrganizationSelectedId: "",
            drp_CountryId: "",
            drp_CountrySelectedId: "",
            drp_Location_type: "",
            drp_selectedType: "",
            drp_WorkLocationId: "",
            drp_WorkLocationSelectedId: "",
            tbl_user_id: 0
        })
        setValidated(false);
        setNotedfy(false);
    }
    const editEmployee = (Employee) => {
        setValues({
            txt_EmployeeName: Employee.employeeName,
            txt_Gender: Employee.gender,
            txt_DateOfBitrh: Employee.dateOfBitrh,
            txt_DateOfJoin: Employee.dateOfJoin,
            txt_Address: Employee.address,
            txt_MobileNumber: Employee.mobileNumber,
            txt_EmailId: Employee.emailId,
            drp_DesignationId: Employee.designationId,
            drp_DepartmentId: Employee.departmentId,
            txt_UserName: Employee.userName,
            txt_Password: Employee.password,
            drp_OrganizationId: Employee.organizationId,
            drp_CountryId: Employee.countryId,
            drp_Location_type: Employee.pointId,
            drp_WorkLocationId: Employee.workLocationId,
            tbl_user_id: Employee.userId

        })
    };

    const EmployeeNameChangeHandler = (e) => {
        setValues({ ...values, txt_EmployeeName: e.target.value })
    };
    const EmailChangeHandler = (e) => {
        setValues({ ...values, txt_EmailId: e.target.value })
    };
    const CountryChangehandle = (e) => {
        setValues({ ...values, drp_CountryId: e.target.value })
        console.log("loction typ = " + values.drp_Location_type);
        console.log("loction typ = " + e.target.value);
        Organizetion.getWorkLocation(values.drp_Location_type, e.target.value).then(res => {
            setWRKlction(res.data)
        })
    };
    const OrganizChangeHandler = (e) => {
        setValues({ ...values, drp_OrganizationId: e.target.value })
    };
    const AddreshChangeHandler = (e) => {
        setValues({ ...values, txt_Address: e.target.value })
    };
    const WrkLocationChangehandle = (e) => {
        setValues({ ...values, drp_WorkLocationId: e.target.value })
    };
    const UserNameChangeHandler = (e) => {
        setValues({ ...values, txt_UserName: e.target.value })
    };
    const DesignationChangehandle = (e) => {
        setValues({ ...values, drp_DesignationId: e.target.value })
    };
    const DOBChangeHandler = (e) => {
        setValues({ ...values, txt_DateOfBitrh: e.target.value })
    };
    const DepartmentChangehandle = (e) => {
        setValues({ ...values, drp_DepartmentId: e.target.value })
    };
    const LocationTypChangehandle = (e) => {
        setValues({ ...values, drp_Location_type: e.target.value })
    };
    const DOjChangeHandler = (e) => {
        setValues({ ...values, txt_DateOfJoin: e.target.value })
    };
    const PasswordChangeHandler = (e) => {
        setValues({ ...values, txt_Password: e.target.value })
    };
    const GenderChangeHandler = (event) => {
        setValues({...values,txt_Gender:event.target.value});
    }
    const isDisabled = () => {
        if (values.tbl_user_id === 0) {
            return true
        } else {
            return false
        }
    };
    const submit = () => {
        if (values.tbl_user_id > 0) {
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
    let gender =["Male","Female"];
    return (
        <div>
            <Sidebar />
            <div style={{ marginTop: "4rem" }} />
            <Form noValidate validated={validated} style={{ fontFamily: "serif", overflowX: "hidden" }}>
                <Row>
                    <Col xs={11} style={{ margin: "auto" }} className=" font-serif">
                        <Form.Text style={{ fontSize: "20px", color: "black" }}>Employe</Form.Text>
                        <Card style={{ borderTop: "4px solid rgb(175, 174, 129)", borderLeft: "3px solid rgb(128, 127, 96)" }}>
                            <Row xs={5}>
                                <Form.Group  md="3" className="m-2  mx-5">
                                    <Form.Label >Employee Name*</Form.Label>
                                    <InputGroup >
                                        <Form.Control
                                            type="text" required placeholder="EmployeeName"
                                            value={values.txt_EmployeeName} onChange={EmployeeNameChangeHandler} />
                                        <Form.Control.Feedback type="invalid" tooltip>
                                            Enter a Employee Name
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                                {/*  */}
                                <Form.Group  md="3" className="m-2  mx-5">
                                <Form.Label >CountryName*</Form.Label>
                                <Form.Select required size="sm" value={values.drp_CountryId}
                                    onChange={CountryChangehandle}
                                    style={{ borderColor: "black" }}
                                    autoComplete="off" >
                                    <option value={values.drp_CountrySelectedId} selected disabled={true}>---- SELECT ----</option>
                                    {
                                        drpCountry.map((countrys) =>
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
                                <Form.Group  md="3" className="m-2 mx-5">
                                    <Form.Label >EmailId</Form.Label>
                                    <InputGroup >
                                        <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                        <Form.Control
                                            type="email" placeholder="exambel@gmail.com" aria-describedby="inputGroupPrepend"
                                            value={values.txt_EmailId} onChange={EmailChangeHandler} />
                                    </InputGroup>
                                </Form.Group>
                            </Row>
                            {/*  */}
                            <Row xs={5}>
                            <Form.Group  md="3" className="m-2  mx-5">
                                <Form.Label >Organizetion*</Form.Label>
                                <Form.Select required size="sm" value={values.drp_OrganizationId}
                                    onChange={OrganizChangeHandler}
                                    style={{ borderColor: "black" }}
                                    autoComplete="off" >
                                    <option value={values.drp_OrganizationSelectedId} selected disabled={true}>---- SELECT ----</option>
                                    {
                                        drpOrganizetion.map((orgs) =>
                                            <option key={orgs.organizetionId}
                                                value={orgs.organizetionId}>
                                                {orgs.organizetionName}
                                            </option>
                                        )
                                    }
                                </Form.Select>
                                <Form.Control.Feedback type="invalid" tooltip>
                                    Please Select a Organizetion.
                                </Form.Control.Feedback>
                                </Form.Group>
                                {/*  */}
                                <Form.Group  md="3" className="m-2  mx-5">
                                <Form.Label >WorkLocation*</Form.Label>
                                <Form.Select required size="sm" value={values.drp_WorkLocationId}
                                    onChange={WrkLocationChangehandle}
                                    style={{ borderColor: "black" }}
                                    autoComplete="off" >
                                    <option value={values.drp_WorkLocationSelectedId} selected disabled={true}>---- SELECT ----</option>
                                    {
                                        drpWorkLocation.map((wrklction) =>
                                            <option key={wrklction.workLocationId}
                                                value={wrklction.workLocationId}>
                                                {wrklction.workLocationName}
                                            </option>
                                        )
                                    }
                                </Form.Select>
                                <Form.Control.Feedback type="invalid" tooltip>
                                    Please Select a WorkLocation.
                                </Form.Control.Feedback>
                                </Form.Group>
                                {/*  */}
                                
                                <Form.Group  md="3" className="m-2  mx-5">
                                    <Form.Label >Mobile Number</Form.Label>
                                    <InputGroup >
                                        <Form.Control
                                            type="text" placeholder="Mobile number"
                                            value={values.txt_MobileNumber} onChange={EmailChangeHandler} />
                                    </InputGroup>
                                </Form.Group>
                            </Row>
                            {/*  */}
                            <Row xs={5}>
                            <Form.Group  md="3" className="m-2  mx-5">
                            <Form.Label >Designation*</Form.Label>
                                <Form.Select required size="sm" value={values.drp_DesignationId}
                                    onChange={DesignationChangehandle}
                                    style={{ borderColor: "black" }}
                                    autoComplete="off" >
                                    <option value={values.drp_DesinationSelectedId} selected disabled={true}>---- SELECT ----</option>
                                    {
                                        drpDesination.map((disgnation) =>
                                            <option key={disgnation.designationId}
                                                value={disgnation.designationId}>
                                                {disgnation.designationName}
                                            </option>
                                        )
                                    }
                                </Form.Select>
                                <Form.Control.Feedback type="invalid" tooltip>
                                    Please Select a Designation.
                                </Form.Control.Feedback>
                                </Form.Group>
                                {/*  */}
                                <Form.Group as={Col} className="mb-3 m-2 mx-5">
                                    <Form.Label as="legend" row sm={2}>
                                        Gender*:
                                    </Form.Label>
                                    {gender.map(result=>(
                                        <Form.Check inline label={result} value={result} checked={values.txt_Gender===result} type="radio" name="rediovalues" onChange={GenderChangeHandler} />
                                    ))}
                                </Form.Group>
                                {/*  */}
                                <Form.Group  md="3"  className="m-2  mx-5">
                                <Form.Label >Addresh</Form.Label>
                                        <Form.Control as="textarea" value={values.txt_Address}
                                            onChange={AddreshChangeHandler} rows={2} placeholder="Addresh" />
                                    </Form.Group>
                            </Row>
                            <Row xs={5}>
                            <Form.Group  md="3" className="m-2  mx-5">
                            <Form.Label >Department*</Form.Label>
                                <Form.Select required size="sm" value={values.drp_DepartmentId}
                                    onChange={DepartmentChangehandle}
                                    style={{ borderColor: "black" }}
                                    autoComplete="off" >
                                    <option value={values.drp_DepartmentSelectedId} selected disabled={true}>---- SELECT ----</option>
                                    {
                                        drpDepartmnt.map((dprtmnt) =>
                                            <option key={dprtmnt.departmentId}
                                                value={dprtmnt.departmentId}>
                                                {dprtmnt.departmentName}
                                            </option>
                                        )
                                    }
                                </Form.Select>
                                <Form.Control.Feedback type="invalid" tooltip>
                                    Please Select a Department.
                                </Form.Control.Feedback>
                                </Form.Group>
                                {/*  */}
                                 <Form.Group  md="3" className="m-2  mx-5" style={{width:"10px"}}>
                            <FormControl >
                      <TextField error={valide}
                        id="date"
                        label="Date of Birth"
                        type="date"
                        value={values.txt_DateOfBitrh}
                        onChange={DOBChangeHandler}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </FormControl>
                    </Form.Group>
                    {/*  */}
                            <Form.Group  md="3" className="m-2  mx-5">
                                    <Form.Label >User Name*</Form.Label>
                                    <InputGroup >
                                        <Form.Control
                                            type="text" placeholder="UserName"
                                            value={values.txt_UserName} onChange={UserNameChangeHandler} />
                                        <Form.Control.Feedback type="invalid" tooltip>
                                            Enter a User Name
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Row>
                            <Row xs={5}>
                            <Form.Group  md="3" className="m-2  mx-5">
                            <Form.Label >LocationType*</Form.Label>
                                <Form.Select required size="sm" value={values.drp_Location_type}
                                    onChange={LocationTypChangehandle}
                                    style={{ borderColor: "black" }}
                                    autoComplete="off" >
                                    <option value={values.drp_selectedType} selected disabled={true}>---- SELECT ----</option>
                                    {
                                        drpLctionTyp.map((lctionTyp) =>
                                            <option key={lctionTyp.pointId}
                                                value={lctionTyp.pointId}>
                                                {lctionTyp.pointName}
                                            </option>
                                        )
                                    }
                                </Form.Select>
                                <Form.Control.Feedback type="invalid" tooltip>
                                    Please Select a Location Type.
                                </Form.Control.Feedback>
                                </Form.Group>
                                {/*  */}
                                <Form.Group  md="4" className="m-2  mx-5" style={{width:"10px"}}>
                            <FormControl >
                      <TextField error={valide}
                        id="date"
                        label="Date of joining"
                        type="date"
                        value={values.txt_DateOfJoin}
                        onChange={DOjChangeHandler}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </FormControl>
                    </Form.Group>
                    {/*  */}
                            <Form.Group  md="3" className="m-2  mx-5">
                                    <Form.Label >Password*</Form.Label>
                                    <InputGroup >
                                        <Form.Control
                                            type="password" placeholder="Password"
                                            value={values.txt_Password} onChange={PasswordChangeHandler} />
                                        <Form.Control.Feedback type="invalid" tooltip>
                                            Enter a User Name
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Row>
                            <Snackbar
                                anchorEmployee={{ vertical: 'top', horizontal: 'center', }}
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
                            <Button onClick={addEmployee} disabled={submit()+loading} className=" p-1" type="submit">
                            {loading ? 'Processing...' : 'submit'}
                            </Button>
                            <Button className=" p-1" onClick={updateEmployee} disabled={isDisabled()+LodingUd} >{LodingUd ? 'Processing...' : 'update'}</Button>
                            <Button className=" p-1" onClick={cancle}>Reset</Button>
                            <Button className=" p-1" disabled={isDisabled()+LodingDelete} onClick={deleteEmployee}>{LodingDelete ? 'Processing...' : 'delete'}</Button>
                        </ButtonToolbar >
                        <Card style={{ height: "20rem", borderTop: "4px solid rgb(175, 174, 129)", borderLeft: "3px solid rgb(128, 127, 96)" }}>
                            <Col className="m-1">
                                <TableContainer className={classes.container}>
                                    <Table stickyHeader aria-label="table" size="small" >
                                        <TableHead >
                                            <TableRow>
                                                <TableCell >Sl.no</TableCell>
                                                <TableCell>EmployeeName</TableCell>
                                                <TableCell >OrganizetionName</TableCell>
                                                <TableCell  >DesignationName</TableCell>
                                                <TableCell >DepartmentName</TableCell>
                                                <TableCell >PointName</TableCell>
                                                <TableCell >CountryName</TableCell>
                                                <TableCell >WorkLocationName</TableCell>
                                                <TableCell >Gender</TableCell>
                                                <TableCell >DateOfBirth</TableCell>
                                                <TableCell >DateOfJoining</TableCell>
                                                <TableCell >EmailId</TableCell>
                                                <TableCell >MobileNo</TableCell>
                                                <TableCell >Addresh</TableCell>
                                                <TableCell >UserName</TableCell>
                                                <TableCell >PSWD</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                product.map(
                                                    (Employee) => (
                                                        <TableRow hover key={Employee.employeeId} onClick={() => editEmployee(Employee)}>
                                                            <TableCell >{Employee.slNo}</TableCell>
                                                            <TableCell>{Employee.employeeName}</TableCell>
                                                            <TableCell>{Employee.organizationName}</TableCell>
                                                            <TableCell >{Employee.designationName}</TableCell>
                                                            <TableCell>{Employee.departmentName}</TableCell>
                                                            <TableCell >{Employee.pointName}</TableCell>
                                                            <TableCell>{Employee.countryName}</TableCell>
                                                            <TableCell>{Employee.workLocationName}</TableCell>
                                                            <TableCell>{Employee.gender}</TableCell>
                                                            <TableCell>{Employee.dateOfBitrh}</TableCell>
                                                            <TableCell>{Employee.dateOfJoin}</TableCell>
                                                            <TableCell >{Employee.emailId}</TableCell>
                                                            <TableCell>{Employee.mobileNumber}</TableCell>
                                                            <TableCell>{Employee.address}</TableCell>
                                                            <TableCell>{Employee.userName}</TableCell>
                                                            <TableCell>{Employee.password}</TableCell>
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

export default Employee;

/*


*/