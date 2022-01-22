import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button } from "react-bootstrap";
import PlaceServices from '../../sevices/masterServices/PlaceServices'
import { Card } from 'react-bootstrap';
// import TableScrollbar from "react-table-scrollbar";
import Sidebar from '../menus/Sidebar';
import {
    // Backdrop,  CircularProgress, 
    makeStyles,IconButton, Snackbar,
    Table, TableBody, TableCell, TableHead, TableRow, TableContainer
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
// import { removeUserSession } from '../Utils/Common';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        marginTop:"77px",
        marginLeft:"10px",
        color: '#fff',
    },
    container: {
        margin: theme.spacing(1),
        width: "100%",
        maxHeight: 280,
    },
}));
function CountryComponent(props) {
    const classes = useStyles();
    // const [open, setOpen] = useState(true);
    const [notefy, setNotedfy] = useState(false);
    // const [serverror, setError] = useState(false);
    const [product, setProduct] = useState([]);
    const [validated, setValidated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [LodingUd, setLodingU_D] = useState(false);
    const [LodingDelete ,setLodingDelete] = useState(false);
    const [values, setValues] = useState({
        txt_countryId: 0,
        txt_countryName: '',
        txt_countryCode: '',
        txt_phoneCode: '',
        txt_errorDesc: '',
        txt_infoMassage: ''
    });
    const getCoutryDATAinTbl = async () => {
        PlaceServices.getCountry().then((res) => {
            setProduct(res.data);
            // setOpen(false)
            // setError(false)
        }).catch(e => {
            setValues({txt_infoMassage:e.message})
            // setOpen(true)
            // setError(true)
        })
    };
    useEffect(() => {
        getCoutryDATAinTbl();
    }, []);
    const changeStateNameHandler = (event) => {
        setValues({ ...values, txt_countryName: event.target.value.replace(/[^a-zA-Z ]/ig, '') });
    }
    const changeCountryCodeHandler = (event) => {
        setValues({ ...values, txt_countryCode: event.target.value.replace(/[^a-zA-Z ]/ig, '') });
    }
    const changePhoneCodeHandler = (event) => {
        setValues({ ...values, txt_phoneCode: event.target.value.replace(/[^0-9]/ig, '') });
    }
    const addCountry = (e) => {
        e.preventDefault();
        let Country = { countryName: values.txt_countryName, countryCode: values.txt_countryCode, phoneCode: values.txt_phoneCode };
        console.log('Login =>' + JSON.stringify(Country));
        setLoading(true);
        PlaceServices.addCountry(Country).then(res => {
            console.log('Code  =>' + JSON.stringify(res.data.messageCode));
            setNotedfy(true);
            setValues({
                txt_infoMassage: res.data.message,
                txt_countryId: 0,
                txt_countryName: '',
                txt_countryCode: '',
                txt_phoneCode: ''
            });
            PlaceServices.getCountry().then((res) => {
                setProduct(res.data);
                setLoading(false);
                setValidated(false);
            }).catch(error => {
                setValues({
                    txt_infoMassage: error.message,
                    txt_countryId: 0,
                    txt_countryName: '',
                    txt_countryCode: '',
                    txt_phoneCode: ''
                });
                setValidated(true);
                setLoading(false);
            })
        }).catch(error => {
            if (values.txt_countryName === '') {
                setValues({
                    txt_countryId: 0,
                    txt_countryName: '',
                    txt_countryCode: '',
                    txt_phoneCode: ''
                });
                setLoading(false);
                setNotedfy(false);
                setValidated(true)
            }
            else if (values.txt_countryCode === '') {
                setValues({
                    txt_countryId: 0,
                    txt_countryName: '',
                    txt_countryCode: '',
                    txt_phoneCode: ''
                });
                setLoading(false);
                setNotedfy(false);
                setValidated(true)
            }
            else if (values.txt_phoneCode === '') {
                setValues({
                    txt_countryId: 0,
                    txt_countryName: '',
                    txt_countryCode: '',
                    txt_phoneCode: ''
                });
                setLoading(false);
                setNotedfy(false);
                setValidated(true)
            }
            else {
                setValues({
                    txt_infoMassage: error.message,
                    txt_countryId: 0,
                    txt_countryName: '',
                    txt_countryCode: '',
                    txt_phoneCode: ''
                });
                setLoading(false);
                setNotedfy(true);
                setValidated(true);
            }
        });
    }
    const updateCountry = (e) => {
        e.preventDefault();
        let Country = { countryName: values.txt_countryName, countryCode: values.txt_countryCode, phoneCode: values.txt_phoneCode };
        setLodingU_D(true);
        PlaceServices.updateCountry(values.txt_countryId, Country).then(res => {
            setNotedfy(true);
            setValues({
                txt_infoMassage: res.data.message,
                txt_countryId: 0,
                txt_countryName: '',
                txt_countryCode: '',
                txt_phoneCode: ''
            });
            PlaceServices.getCountry().then((res) => {
                setProduct(res.data);
                setLodingU_D(false);
                setValidated(false);
            }).catch(error => {
                setValues({
                    txt_infoMassage: error.message,
                    txt_countryId: 0,
                    txt_countryName: '',
                    txt_countryCode: '',
                    txt_phoneCode: ''
                })
                setValidated(true);
                setNotedfy(true);
                setLodingU_D(false);
            });

        }).catch(error => {
            if (values.txt_countryName === '') {
                setValues({
                    txt_countryId: 0,
                    txt_countryName: '',
                    txt_countryCode: '',
                    txt_phoneCode: ''
                });
                setLodingU_D(false);
                setNotedfy(false);
                setValidated(true)
            }
            else if (values.txt_countryCode === '') {
                setValues({
                    txt_countryId: 0,
                    txt_countryName: '',
                    txt_countryCode: '',
                    txt_phoneCode: ''
                });
                setLodingU_D(false);
                setNotedfy(false);
                setValidated(true)
            }
            else if (values.txt_phoneCode === '') {
                setValues({
                    txt_countryId: 0,
                    txt_countryName: '',
                    txt_countryCode: '',
                    txt_phoneCode: ''
                });
                setLodingU_D(false);
                setNotedfy(false);
                setValidated(true)
            }
            else {
                setValues({
                    txt_infoMassage: error.message,
                    txt_countryId: 0,
                    txt_countryName: '',
                    txt_countryCode: '',
                    txt_phoneCode: ''
                });
                setLodingU_D(false);
                setNotedfy(true);
                setValidated(true);
            }
        });
    }
    const deleteCountry = (e) => {
        e.preventDefault();
        setLodingDelete(true);
        if(!values.txt_countryId || values.txt_countryId===0){
            setValues({
                txt_countryId: 0,
                txt_countryName: '',
                txt_countryCode: '',
                txt_phoneCode: ''
            });
            setLodingDelete(false);
            setNotedfy(false);
            setValidated(true)
        }
        else{
        PlaceServices.deleteCountry(values.txt_countryId).then(res => {
            setLodingDelete(false)
            setNotedfy(true);
            setValues({
                txt_infoMassage: res.data.message,
                txt_countryId: 0,
                txt_countryName: '',
                txt_countryCode: '',
                txt_phoneCode: ''
            });
            PlaceServices.getCountry().then((res) => {
                setProduct(res.data);
                setValidated(false);
            }).catch(error => {
                setValues({
                    txt_infoMassage: error.message,
                    txt_countryName: '',
                    txt_countryCode: '',
                    txt_phoneCode: ''
                });
                setNotedfy(true);
                setLodingDelete(false);

            });
        }).catch(error => {
            if (values.txt_countryName === '') {
                setValues({
                    txt_countryId: 0,
                    txt_countryName: '',
                    txt_countryCode: '',
                    txt_phoneCode: ''
                });
                setLodingDelete(false);
                setNotedfy(false);
                setValidated(true)
            }
            else if (values.txt_countryCode === '') {
                setValues({
                    txt_countryId: 0,
                    txt_countryName: '',
                    txt_countryCode: '',
                    txt_phoneCode: ''
                });
                setLodingDelete(false);
                setNotedfy(false);
                setValidated(true)
            }
            else if (values.txt_phoneCode === '') {
                setValues({
                    txt_countryId: 0,
                    txt_countryName: '',
                    txt_countryCode: '',
                    txt_phoneCode: ''
                });
                setLodingDelete(false);
                setNotedfy(false);
                setValidated(true)
            }
            else {
                setValues({
                    txt_infoMassage: error.message,
                    txt_countryId: 0,
                    txt_countryName: '',
                    txt_countryCode: '',
                    txt_phoneCode: ''
                });
                setLoading(false);
                setNotedfy(true);
                setValidated(true);
            }

        });
    }
    }
    const cancle = () => {
        setValues({
            txt_countryId: 0,
            txt_countryName: '',
            txt_countryCode: '',
            txt_phoneCode: ''
        });
        setLodingU_D(false);
        setLodingDelete(false)
        setLoading(false)
        setValidated(false);
    };
    const editCountry = (countrys) => {
        setValues({
            txt_countryId: countrys.countryId,
            txt_countryName: countrys.countryName,
            txt_countryCode: countrys.countryCode,
            txt_phoneCode: countrys.phoneCode
        });
    };
    const isDisabled = () => {
        if (values.txt_countryId === 0) {
            console.log("update/delete" + values.txt_countryId)
            return true
        } else {
            return false
        }
    };
    const submit = () => {
        if (values.txt_countryId > 0) {
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
            <div style={{ marginTop: '5rem' }} />
           <Form noValidate validated={validated} style={{ fontFamily: "serif", overflow: "hidden" }}>
                <Row >
                    <Col xs={11} style={{ margin: "auto" }} className=" font-serif">
                        <Form.Text style={{ fontWeight: "bolder", color: "black",  }}>Country Detailes</Form.Text>
                        <Card border="primary+info" style={{ height: '10rem',borderTop:"4px solid rgb(175, 174, 129)",borderLeft:"3px solid rgb(128, 127, 96)"}}>
                            <Row className="mx-5">
                                <Col xs={8}>
                                    <Form.Label style={{ marginTop: '1rem' }}>CountryName</Form.Label>
                                    <Form.Control required size="sm" type="text" placeholder="countryName"
                                        value={values.txt_countryName} maxLength="50"
                                        style={{ borderColor: "black" }} onChange={changeStateNameHandler} autoComplete="off" />
                                    <Form.Control.Feedback type="invalid" tooltip>
                                        Please fill the countryName.
                                    </Form.Control.Feedback>
                                </Col>
                                <Col xs={6}>
                                    <Form.Label>CountryCode</Form.Label>
                                    <Form.Control required type="text" placeholder="countryCode" size="sm"
                                        value={values.txt_countryCode} maxLength="10"
                                        style={{ borderColor: "black" }} onChange={changeCountryCodeHandler} autoComplete="off" />
                                    <Form.Control.Feedback type="invalid" tooltip>
                                        Please fill the countryCode.
                                    </Form.Control.Feedback>
                                </Col>
                                <Col xs={6}>
                                    <Form.Label>PhonCode</Form.Label>
                                    <Form.Control required type="text" placeholder="PhoneCode" size="sm"
                                        value={values.txt_phoneCode} maxLength="10"
                                        style={{ borderColor: "black" }} onChange={changePhoneCodeHandler} autoComplete="off" />
                                    <Form.Control.Feedback type="invalid" tooltip>
                                        Please fill the phoneCoded.
                                    </Form.Control.Feedback>
                                </Col>
                            </Row>
                        </Card>
                        <br />
                        <Snackbar
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}
                            open={notefy} autoHideDuration={1000} message={values.txt_infoMassage}
                            action={
                                <IconButton size="small" aria-label="close" color="inherit" onClick={notefyClose}>
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            } />
                        <Button onClick={addCountry} disabled={submit() + loading} className="btn btn-info p-1" type="submit">
                            {loading ? 'Processing...' : 'submit'}
                        </Button>
                        <Button onClick={updateCountry} className="btn btn-info p-1" disabled={isDisabled() + LodingUd}>{LodingUd ? 'Processing...' : 'update'}</Button>
                        <Button className="btn btn-info p-1" onClick={cancle}>Reset</Button>
                        <Button className="btn btn-danger p-1" disabled={isDisabled() + LodingDelete} onClick={deleteCountry}>{LodingDelete ? 'Processing...' : 'delete'}</Button>
                        {/* <Backdrop className={classes.backdrop} open={open} >
                            <CircularProgress color="inherit" />
                            {serverror ? <h2>
                                <p>
                                    {values.txt_infoMassage}
                                </p>
                                <button className="btn btn-light" onClick={gohome}>Go Back</button>
                            </h2> : null} */}
                        {/* </Backdrop> */}
                        <Card border="dark" style={{ borderTop:"4px solid rgb(175, 174, 129)",borderLeft:"3px solid rgb(128, 127, 96)",height:"45vh"}}>
                            <Col className="my-2">
                                <TableContainer className={classes.container}>
                                    <Table stickyHeader aria-label="sticky table" size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Sl.no</TableCell>
                                                <TableCell >CountryName</TableCell>
                                                <TableCell >CountryCode</TableCell>
                                                <TableCell >PhoneCode</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                product.map((countrys) => (
                                                    <TableRow hover key={countrys.countryId} onClick={() => editCountry(countrys)}>
                                                        <TableCell >{countrys.sl_No}</TableCell>
                                                        <TableCell>{countrys.countryName}</TableCell>
                                                        <TableCell>{countrys.countryCode}</TableCell>
                                                        <TableCell>{countrys.phoneCode}</TableCell>
                                                    </TableRow>
                                                ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Col>
                        </Card>
                        <div>.
                            </div>
                    </Col>
                </Row>
            </Form>
         
        </div>

    );

}

export default CountryComponent;
/**
  <TableScrollbar style={{ height: "5px" }}>
                                    <table className="table table-light border-dark table-hover table-bordered" >
                                        <thead>
                                            <tr>
                                                <th className="border-dark  p-2">Si.No</th>
                                                <th className="border-dark p-2">CountryName</th>
                                                <th className="border-dark p-2">CountryCode</th>
                                                <th className="border-dark p-2">PhoneCode</th>

                                            </tr>
                                        </thead>
                                        <tbody style={{ fontFamily: "serif" }}>
                                            {product.map(
                                                (countrys) =>
                                                    <tr key={countrys.countryId} onClick={() => editCountry(countrys)}>
                                                        <td className="border-dark p-2">{countrys.sl_No}</td>
                                                        <td className="border-dark p-2">{countrys.countryName}</td>
                                                        <td className="border-dark p-2">{countrys.countryCode}</td>
                                                        <td className="border-dark p-2">{countrys.phoneCode}</td>

                                                    </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </TableScrollbar>
 */