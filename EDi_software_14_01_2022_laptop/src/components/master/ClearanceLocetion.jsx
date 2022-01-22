import React, { useState, useEffect } from 'react';
import { ButtonToolbar, Row, Col, Form, Button, Card } from "react-bootstrap";
import {
    // Backdrop, CircularProgress, 
    IconButton, Snackbar, makeStyles,
    Table, TableBody, TableCell, TableHead, TableRow, TableContainer
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
// import { removeUserSession } from '../Utils/Common';
import PlaceServices from '../../sevices/masterServices/PlaceServices';
import Sidebar from '../menus/Sidebar';

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
function ClearanceLocetion(props) {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [LodingUd, setLodingU_D] = useState(false);
    const [LodingDelete ,setLodingDelete] = useState(false);
    const [values, setValues] = useState({
        txt_Clearnce_Id: 0,
        drp_countryId:"",
        drp_stateid: "",
        txt_selectedStateID:"",
        txt_selectedCountryID: "",
        txt_clearanceLocetionName: '',
        txt_clearanceLocetionCode: '',
        tbl_point_id:0,
        txt_infoMassage: ''
    });
    const [product, setProduct] = useState([]);
    const [drpcountry, setDrpcountry] = useState([]);
    const [drpState, SetDrpState] = useState([]);
    const [notefy, setNotedfy] = useState(false);
    // const [open, setOpen] = useState(true);
    // const [error, setError] = useState(false);

    const ClearanceData = async () => {
        PlaceServices.getClearanceLocetion().then((res) => {
            // setOpen(false)
            // setError(false)
            setProduct(res.data);
        }).catch(error =>{
            // setValues({txt_infoMassage:error})
            // setError(true)
            // setOpen(true)
        })
        PlaceServices.getCountry().then((res) => {
            setDrpcountry(res.data);
        })

    };

    useEffect(() => {
        ClearanceData();
    }, []);

    const isDisabled = () => {
        if (values.tbl_point_id !== 0) {
            return false
        } else {
            return true
        }
    };
    const submit = () => {
        if (values.tbl_point_id !== 0) {
            return true
        } else {
            return false
        }
    };
   
    const [validated, setValidated] = useState(false);
    const AddLocetion = (e) => {
        e.preventDefault();
        setLoading(true);
        let ClearanceLocetion = { countryId: values.drp_countryId, stateid: values.drp_stateid,
            customPointName:values.txt_clearanceLocetionName,customPointCode :values.txt_clearanceLocetionCode};
            if(!values.drp_countryId ||!values.drp_stateid || !values.txt_clearanceLocetionName || !values.txt_clearanceLocetionCode){
                setValues({
                    txt_infoMassage:"",
                    txt_Clearnce_Id: 0,
                    tbl_point_id:0,
                    drp_countryId: 0,
                    drp_stateid: 0,
                    txt_selectedCountryID: 0,
                    txt_selectedStateID:0,
                    drp_stateName: '',
                    drp_countryName: '',
                    txt_clearanceLocetionName: '',
                    txt_clearanceLocetionCode: ''
                });
                setLoading(false)
                setNotedfy(false);
                setValidated(true);
            }
            else{
        console.log('clrloc =>' + JSON.stringify(ClearanceLocetion));
        PlaceServices.addClearanceLocetion(ClearanceLocetion).then(res => {
            console.log('Clr Code  =>' + JSON.stringify(res.data.messageCode));
            setValues({ txt_infoMassage: res.data.message,
                txt_Clearnce_Id: 0,
                drp_countryId: "",
                tbl_point_id:0,
                drp_stateid: "",
                txt_selectedCountryID: "",
                txt_selectedStateID:"",
                txt_clearanceLocetionName: '',
                txt_clearanceLocetionCode: '' });
                setLoading(false);
                setValidated(false);
                setNotedfy(true);
            PlaceServices.getClearanceLocetion().then((res) => {
                setProduct(res.data);
            });
        }).catch(error => {
            // console.log("error => "+error);
            setValues({
                txt_infoMassage:error.message,
                txt_Clearnce_Id: 0,
                tbl_point_id:0,
                drp_countryId: 0,
                drp_stateid: 0,
                txt_selectedCountryID: 0,
                txt_selectedStateID:0,
                drp_stateName: '',
                drp_countryName: '',
                txt_clearanceLocetionName: '',
                txt_clearanceLocetionCode: ''
            });
            setLoading(false)
            setNotedfy(true);
            setValidated(true);
        });
    }
    }
    const updateLocetion = (e) => {
        e.preventDefault();
        setLodingU_D(true)
        let ClearanceLocetion = { countryId: values.drp_countryId, stateid: values.drp_stateid,
            customPointName:values.txt_clearanceLocetionName,customPointCode :values.txt_clearanceLocetionCode};
        console.log('ClearanceLocetion => ' + JSON.stringify(ClearanceLocetion));
        console.log('clr ID =>' + JSON.stringify(values.txt_Clearnce_Id));
        PlaceServices.updateClearanceLocetion(values.txt_Clearnce_Id, ClearanceLocetion).then(res => {
            setValues({
                txt_infoMassage:res.data.message,
                txt_Clearnce_Id: 0,
                tbl_point_id:0,
                drp_countryId: "",
                drp_stateid: "",
                txt_selectedCountryID: "",
                txt_selectedStateID:"",
                txt_clearanceLocetionName: '',
                txt_clearanceLocetionCode: ''
            });
            setLodingU_D(false)
            setValidated(false);
            setNotedfy(true)
            PlaceServices.getClearanceLocetion().then((res) => {
                setProduct(res.data);
            });
        }).catch(error => {
            setValues({
                txt_infoMassage:error.message,
                txt_Clearnce_Id: 0,
                tbl_point_id:0,
                drp_countryId: "",
                drp_stateid: "",
                txt_selectedCountryID: "",
                txt_selectedStateID:"",
                txt_clearanceLocetionName: '',
                txt_clearanceLocetionCode: ''
            });
            setLodingU_D(false)
            setNotedfy(true);
            setValidated(true);
        });
    }
    const deleteClearanceLocetion = (e) => {
        e.preventDefault();
        setLodingDelete(true)
        console.log("poit_id "+values.tbl_point_id);
        PlaceServices.deleteClearanceLocetion(values.tbl_point_id).then(res => {
            setValues({ txt_infoMassage: res.data.message,
                txt_Clearnce_Id: 0,
                tbl_point_id:0,
                drp_countryId: "",
                drp_stateid: "",
                txt_selectedCountryID: "",
                txt_selectedStateID:"",
                txt_clearanceLocetionName: '',
                txt_clearanceLocetionCode: ''});
                setLodingDelete(false)
                setNotedfy(true);
            setValidated(false);
            PlaceServices.getClearanceLocetion().then((res) => {
                setProduct(res.data);
            });
        }).catch(error => {
            setValues({ txt_infoMassage: error,
                txt_Clearnce_Id: 0,
                tbl_point_id:0,
                drp_countryId: "",
                drp_stateid: "",
                txt_selectedCountryID: "",
                txt_selectedStateID:"",
                txt_clearanceLocetionName: '',
                txt_clearanceLocetionCode: ''});
                setLodingDelete(false)
                setNotedfy(true);
            setValidated(true);
        });
    }
    const cancle = () => {
        setValues({
            txt_Clearnce_Id: 0,
            tbl_point_id:0,
            drp_countryId: "",
            drp_stateid: "",
            txt_selectedCountryID: "",
            txt_selectedStateID:"",
            txt_clearanceLocetionName: '',
            txt_clearanceLocetionCode: ''
        });
        setValidated(false);
    };
    const editLocetion = (Location) => {
        setValues({
            txt_Clearnce_Id: Location.customPointId,
            tbl_point_id:Location.pointId,
            drp_countryId: Location.countryId,
            drp_stateid: Location.stateid,
            txt_clearanceLocetionName: Location.customPointName,
            txt_clearanceLocetionCode: Location.customPointCode
        });
    };
   
    const notefyClose = () => {
        setNotedfy(false);
    };
    // const gohome = () => {
    //     removeUserSession();
    //     props.history.push('/');
    // }
    const CountryChangehandle = (event) => {
        setValues({ ...values, drp_countryId: event.target.value })
        PlaceServices.getClrLocState(event.target.value).then((res) => {
            SetDrpState(res.data);
        });
    };
    const changeClearanceLocetioneNameHandler = (event) => {
        setValues({ ...values, txt_clearanceLocetionName: event.target.value.replace(/[^a-zA-Z ]/ig, '') });
    };
    const changeClearanceLocetionCodeHandler = (event) => {
        setValues({ ...values, txt_clearanceLocetionCode: event.target.value.replace(/[^a-zA-Z]/ig, '') });
    };
    const StateChangeHandler =(event)=>{
        setValues({ ...values, drp_stateid: event.target.value });
    };
    return (
        <div>
            <div>
                <Sidebar />
            </div>
            <div style={{ marginTop: "4rem" }} />
            <Form noValidate validated={validated} style={{ fontFamily: "serif", overflowX: "hidden" }}>
                <Row>
                    <Col xs={11} style={{ margin: "auto" }} className=" font-serif">
                        <Form.Text style={{ fontSize: "20px", color: "black" }}>ClearanceLocetion Detailes</Form.Text>
                        <Card style={{ height: '10rem', borderTop: "4px solid rgb(175, 174, 129)", borderLeft: "3px solid rgb(128, 127, 96)" }}>
                            <Row className="mx-5">
                                <Col xs={3}>
                                    <Form.Label>CountryName</Form.Label>
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
                                        <Form.Control.Feedback type="invalid" tooltip>
                                            Please choose a countryName.
                                        </Form.Control.Feedback>
                                    </Form.Select>
                                </Col>
                                <Col xs={3}>
                                    <Form.Label>StateName</Form.Label>
                                    <Form.Select required size="sm"  value={values.drp_stateid}
                                        onChange={StateChangeHandler}
                                        style={{ borderColor: "black" }}
                                        autoComplete="off">
                                        <option value={values.txt_selectedStateID} selected disabled={true}>---- SELECT ----</option>
                                        {
                                            drpState.map((states) =>
                                                <option key={states.stateid}
                                                    value={states.stateid}>
                                                    {states.stateName}
                                                </option>
                                            )
                                        }
                                        <Form.Control.Feedback type="invalid" tooltip>
                                            Please choose a StateName.
                                        </Form.Control.Feedback>
                                    </Form.Select>
                                </Col>
                            </Row>
                            <Row className="mx-5">
                                <Col xs={6}>
                                    <Form.Label>ClearanceLocetionName</Form.Label>
                                    <Form.Control size="sm" required type="text" placeholder="ClearanceLocetionName"
                                        value={values.txt_clearanceLocetionName} maxLength="50" style={{ borderColor: "black" }}
                                        onChange={changeClearanceLocetioneNameHandler} autoComplete="off" />

                                    <Form.Control.Feedback type="invalid" tooltip>
                                        Please choose a ClearanceLocetionName.
                                    </Form.Control.Feedback>
                                </Col>
                                <Col xs={4}>
                                    <Form.Label>ClearanceLocetionCode</Form.Label>
                                    <Form.Control size="sm" required type="text" placeholder="ClearanceLocetionCode"
                                        value={values.txt_clearanceLocetionCode} maxLength="5" style={{ borderColor: "black" }}
                                        onChange={changeClearanceLocetionCodeHandler} autoComplete="off" />
                                    <Form.Control.Feedback type="invalid" tooltip>
                                        Please choose a ClearanceLocetionCode.
                                    </Form.Control.Feedback>
                                </Col>
                            </Row>
                            <Snackbar
                                anchorOrigin={{ vertical: 'top', horizontal: 'center', }}
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
                                <Button onClick={AddLocetion}  disabled={submit() + loading} className="btn btn-info p-1" type="submit">
                            {loading ? 'Processing...' : 'submit'}
                                </Button>
                                <Button onClick={updateLocetion} className="btn btn-info p-1" disabled={isDisabled() + LodingUd}>{LodingUd ? 'Processing...' : 'update'}</Button>
                                <Button className="btn btn-info p-1" onClick={cancle}>Reset</Button>
                                <Button className="btn btn-danger p-1" onClick={deleteClearanceLocetion} disabled={isDisabled() + LodingDelete}>{LodingDelete ? 'Processing...' : 'delete'}</Button>
                            </ButtonToolbar >
                        <Card style={{height:"20rem", borderTop: "4px solid rgb(175, 174, 129)", borderLeft: "3px solid rgb(128, 127, 96)" }}>
                            <Col className="m-1">
                                <TableContainer className={classes.container}>
                                    <Table stickyHeader aria-label="sticky table" size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Sl.no</TableCell>
                                                <TableCell >CountryName</TableCell>
                                                <TableCell >StateName</TableCell>
                                                <TableCell >ClearnceLocetion Name</TableCell>
                                                <TableCell >ClearnceLocetion Code</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                product.map(
                                                    (Location) => (
                                                        <TableRow hover key={Location.customPointId} onClick={() => editLocetion(Location)}>
                                                            <TableCell >{Location.sl_No}</TableCell>
                                                            <TableCell>{Location.countryName}</TableCell>
                                                            <TableCell>{Location.stateName}</TableCell>
                                                            <TableCell>{Location.customPointName}</TableCell>
                                                            <TableCell>{Location.customPointCode}</TableCell>
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
export default ClearanceLocetion;
/*      */