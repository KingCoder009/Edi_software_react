import React, { useState } from 'react';
import { FormControlLabel, Radio, RadioGroup, FormControl, InputLabel, Input, makeStyles } from '@material-ui/core';
import { Card, Form, Button, Row, Col, ButtonGroup, Container } from 'react-bootstrap';
import Sidebar from '../menus/Sidebar';
import OperationSrvces from '../../sevices/operationServices/OperationSrvces';
import { AiFillCloseSquare } from 'react-icons/ai';
import ReportsServices from '../../sevices/ReportsServices';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        height: "7vh",
        minWidth: 200,
        maxWidth: 200,
    },
}))
// const url = '/src/ExportFiles/';

function EDI_DOCUMENTS() {
    const classes = useStyles();
    const [RedioValue, setValue] = useState('a');
    const [valide, setValide] = useState(false)
    const [hidePrams, setHideParams] = useState(true)
    const [open, setOpen] = useState(false);
    const [FirstAirport, setHideFirstAIRport] = useState(false)
    const [messages, setMessage] = useState(" ");
    const [validated, setValidated] = useState(false);
    const [values, setValues] = useState({
        redio_Txt_Mawb_no: '',
        redio_Txt_Igm_no: '',
        txt_Airlines_name: "",
        txt_Flight_Number: "",
        txt_Airport_arrival: "",
        txt_Airport_shipment: "",
        txt_Date_arrivel: "",
        txt_Time_arrival: "",
        txt_First_port_of_Arrivel: ""
    });
    const [hideECM_NONDOCS, steHideECM_NONDOCS] = useState(false);
    const [hideCBE_XII, setHideCBE_XII] = useState(false);
    const [hideCBE_XIII, setHideCBE_XIII] = useState(false);

    const xml_dwnlod = value => () => {
        if (RedioValue === 'a') {
            if (values.redio_Txt_Mawb_no) {
                console.log("Mawb " + JSON.stringify(values.redio_Txt_Mawb_no))
                setMessage(" ")
                setHideParams(false)
                setOpen(true);

                if (value === 'NoNDocs') {
                    steHideECM_NONDOCS(true)
                    setHideCBE_XII(false)
                    setHideCBE_XIII(false)
                    setHideFirstAIRport(false)
                }
                else if (value === "cbeXII") {
                    steHideECM_NONDOCS(false)
                    setHideCBE_XII(true)
                    setHideCBE_XIII(false)
                    setHideFirstAIRport(true)
                }
                else if (value === 'cbeXIII') {
                    steHideECM_NONDOCS(false)
                    setHideCBE_XII(false)
                    setHideCBE_XIII(true)
                    setHideFirstAIRport(true)
                }
            }
            else {
                setOpen(false);
                setValidated(true)
                setValide(true)
                setHideParams(true)
                setMessage("Enter a MAWB.No")
            }
        }
        else if (RedioValue === 'b') {
            OperationSrvces.getIGMdetailsSelected(values.redio_Txt_Igm_no).then(res => {
                const igm = res.data;
                igm.map(IGMDetails =>
                    setValues({
                        redio_Txt_Igm_no: IGMDetails.igm_no,
                        txt_Airlines_name: IGMDetails.airlinesName,
                        txt_Flight_Number: IGMDetails.flightNo,
                        txt_Airport_arrival:IGMDetails.airPortofArrivel,
                        txt_Airport_shipment: IGMDetails.airPortofShipment,
                        txt_Date_arrivel: IGMDetails.dateOfArivel,
                        txt_Time_arrival: IGMDetails.timeofArrivel,
                        txt_First_port_of_Arrivel: IGMDetails.firstPortOfArrivel,
                        redio_Txt_Mawb_no:'-1'
                    })
                );
            })
            if (values.redio_Txt_Igm_no) {
                setMessage(" ")
                setOpen(true);
                setHideParams(false)

                if (value === 'NoNDocs') {
                    steHideECM_NONDOCS(true)
                    setHideCBE_XII(false)
                    setHideCBE_XIII(false)
                    setHideFirstAIRport(false)
                }
                else if (value === "cbeXII") {
                    steHideECM_NONDOCS(false)
                    setHideCBE_XII(true)
                    setHideCBE_XIII(false)
                    setHideFirstAIRport(true)
                }
                else if (value === 'cbeXIII') {
                    steHideECM_NONDOCS(false)
                    setHideCBE_XII(false)
                    setHideCBE_XIII(true)
                    setHideFirstAIRport(true)
                }
            }
            else {
                setOpen(false);
                setValidated(true)
                setValide(true)
                setHideParams(true)
                setMessage("Enter a IGM.No");
            }
        }
        else {
            setValidated(true)
        }
    }

    const xml_ECMNONDOCS = () => {
        let xmlExport = {
            airLinesName: values.txt_Airlines_name, flightNumber: values.txt_Flight_Number,
            airPortOfArrival: values.txt_Airport_arrival, airPortOfShipment: values.txt_Airport_shipment,
            dateOfArrival: values.txt_Date_arrivel, timeOfArrival: values.txt_Time_arrival
        };
        console.log("ecm before " + JSON.stringify(xmlExport));
        ReportsServices.getECM_NonDocs_XMLFiles(values.redio_Txt_Mawb_no, values.redio_Txt_Igm_no, xmlExport).then((res) => {
            console.log("ecm_NONDOCS " + JSON.stringify(res.data));
            // console.log("response MESSAGE "+(xmlpath+res.data[0].XmlDocs));
            if (res.data.messageCode === "0000") {
                const xml_fileName = res.data.message;
                window.open(process.env.PUBLIC_URL + 'ExportFiles/' + xml_fileName, "_blank");
            }
            else {
                setMessage(res.data.message)
            }
        }).catch((error) => {
            setMessage(error.message);
        })
    }
    const CBE_XII_XML = () => {
        let xmlExport = {
            airLinesName: values.txt_Airlines_name, flightNumber: values.txt_Flight_Number,
            airPortOfArrival: values.txt_Airport_arrival, airPortOfShipment: values.txt_Airport_shipment,
            dateOfArrival: values.txt_Date_arrivel, timeOfArrival: values.txt_Time_arrival,
            firstPortofArrival: values.txt_First_port_of_Arrivel
        };
        console.log("CBEXII before " + JSON.stringify(xmlExport));
        ReportsServices.getCBEXII_XMLFiles(values.redio_Txt_Mawb_no, values.redio_Txt_Igm_no, xmlExport).then((res) => {
            console.log("CBEXII " + JSON.stringify(res.data));
            // console.log("response MESSAGE "+(xmlpath+res.data[0].XmlDocs));
            if (res.data.messageCode === "0000") {
                const xml_fileName = res.data.message;
                window.open(process.env.PUBLIC_URL + 'ExportFiles/' + xml_fileName, "_blank");
            }
            else {
                setMessage(res.data.message)
            }
        }).catch((error) => {
            setMessage("error " + error);
        })
    }
    const CBE_XIII_XML = () => {
        let xmlExport = {
            airLinesName: values.txt_Airlines_name, flightNumber: values.txt_Flight_Number,
            airPortOfArrival: values.txt_Airport_arrival, airPortOfShipment: values.txt_Airport_shipment,
            dateOfArrival: values.txt_Date_arrivel, timeOfArrival: values.txt_Time_arrival,
            firstPortofArrival: values.txt_First_port_of_Arrivel
        };
        console.log("CBEXIII before " + JSON.stringify(xmlExport));
        ReportsServices.getCBEXIII_XMLFiles(values.redio_Txt_Mawb_no, values.redio_Txt_Igm_no, xmlExport).then((res) => {
            console.log("CBEXIII " + JSON.stringify(res.data));
            // console.log("response MESSAGE "+(xmlpath+res.data[0].XmlDocs));
            if (res.data.messageCode === "0000") {
                const xml_fileName = res.data.message;
                window.open(process.env.PUBLIC_URL + 'ExportFiles/' + xml_fileName, "_blank");
            }
            else {
                setMessage(res.data.message)
            }
        }).catch((error) => {
            setMessage("error " + error);
        })
    }
    const ChangeDOCSnumHandle = (e) => {
        if (RedioValue === 'a') {
            setValues({ ...values, redio_Txt_Mawb_no: e.target.value });
        }
        else if (RedioValue === 'b') {
            setValues({ ...values, redio_Txt_Igm_no: e.target.value });
        }
    }
    const ChangeAirNameHandle = (e) => {
        setValues({ ...values, txt_Airlines_name: e.target.value });
    }
    const ChangeDateArivelHandle = (e) => {
        setValues({ ...values, txt_Date_arrivel: e.target.value });
    }
    const ChangeFlightNumberHandle = (e) => {
        setValues({ ...values, txt_Flight_Number: e.target.value });
    }
    const ChangeTimeArrivelHandle = (e) => {
        setValues({ ...values, txt_Time_arrival: e.target.value });
    }
    const ChangeAirPortArivelHandle = (e) => {
        setValues({ ...values, txt_Airport_arrival: e.target.value });
    }
    const ChangeAirShipmentHandle = (e) => {
        setValues({ ...values, txt_Airport_shipment: e.target.value });
    }
    const ChangeFirstAirArrivelHandle = (e) => {
        setValues({ ...values, txt_First_port_of_Arrivel: e.target.value });
    }
    const handleChange = (event) => {
        setValue(event.target.value);
    }

    const InputLabels = () => {
        if (RedioValue === 'a') {
            return "MAWB.NO"
        }
        else {
            return "IGM.NO"
        }
    }
    const closeCard = () => {
        setHideParams(true)
        setOpen(false);
        setValues({
            txt_Airlines_name: "",
            txt_Flight_Number: "",
            txt_Airport_arrival: "",
            txt_Airport_shipment: "",
            txt_Date_arrivel: "",
            txt_Time_arrival: "",
            txt_First_port_of_Arrivel: ""
        })
    }
    const ValuesField = () => {
        if (RedioValue === 'a') {
            return values.redio_Txt_Mawb_no
        }
        else if (RedioValue === 'b') {
            return values.redio_Txt_Igm_no
        }
    }

    return (
        <div>
            <div>
                <Sidebar />
            </div>
            <div style={{ marginTop: '5rem' }} />
            <Container>
                {hidePrams ?
                    <Card style={{ height: "70vh", textAlign: "center" }}>
                        <Card.Body>
                            <Form noValidate validated={validated} >
                                <h2 className="text-center">EDI DOCUMENTS DOWNLOAD</h2>
                                <RadioGroup className="items-center form-inline" value={RedioValue} onChange={handleChange}>
                                    <Row>
                                        <FormControlLabel value="a" control={<Radio />} label="MAWB.NO" />
                                        <FormControlLabel value="b" control={<Radio />} label="IGM.No" />
                                    </Row>
                                </RadioGroup>
                                <FormControl required className={classes.formControl}>
                                    <InputLabel>{InputLabels()}</InputLabel>
                                    <Input error={valide} value={ValuesField()} onChange={ChangeDOCSnumHandle} autoComplete="off" />
                                </FormControl>
                                <Form.Control.Feedback type="invalid" tooltip>
                                    Please enter the {InputLabels()}
                                </Form.Control.Feedback>
                                <Container >
                                    <div className="ButtonCard">
                                        <ButtonGroup bsPrefix>
                                            <Button className="p-1 w-40 " disabled>ECM DOCS</Button>
                                            <Button className="p-1 w-40 " onClick={xml_dwnlod('cbeXII')}>
                                                CBE-XII
                                            </Button>
                                        </ButtonGroup>
                                        <ButtonGroup bsPrefix>
                                            <Button onClick={xml_dwnlod('NoNDocs')} className="p-1 w-40 ">ECM NON DOCS</Button>
                                            <Button className="p-1 w-40 " onClick={xml_dwnlod('cbeXIII')}>
                                                CBE-XIII</Button>
                                        </ButtonGroup>
                                        <ButtonGroup bsPrefix>
                                            <Button className="p-1 w-40 ">TIFF IMAGE</Button>
                                            <Button className="p-1 w-40 " disabled>CBE-XIV</Button>
                                        </ButtonGroup>
                                        <ButtonGroup bsPrefix>
                                            <Button className="p-1 w-35 ">TIFF IMAGE INVOICE CIF</Button>
                                        </ButtonGroup>
                                        <div>{messages}</div>
                                    </div>
                                </Container>
                            </Form>
                        </Card.Body>
                    </Card> : null
                }
                {open ? <Card style={{ width: "50rem", height: "28rem", marginLeft: "19%" }} className="justify-items-center">
                    <Card.Header ><AiFillCloseSquare size="20" onClick={closeCard} /></Card.Header>
                    <Form className="my-5">
                        <Row className="m-2">
                            <Col xs={5} className="form-inline mx-5">
                                {/************************************ */}
                                <Form.Label>Airlins_Name</Form.Label>
                                <Form.Control value={values.txt_Airlines_name} onChange={ChangeAirNameHandle} />
                                <Form.Control.Feedback type="invalid" tooltip>
                                    Please enter a Airlines_Name.
                                </Form.Control.Feedback>
                            </Col>
                            <Col xs={5} className="form-inline">
                                {/************************************ */}
                                <Form.Label>Date of Arrivel</Form.Label>
                                <Form.Control value={values.txt_Date_arrivel} onChange={ChangeDateArivelHandle} />
                                <Form.Control.Feedback type="invalid" tooltip>
                                    Please enter a Flight Number.
                                </Form.Control.Feedback>
                            </Col>
                        </Row>
                        <Row className="m-2">
                            <Col xs={5} className="form-inline mx-5">
                                {/************************************ */}
                                <Form.Label>Flight Numbe</Form.Label>
                                <Form.Control value={values.txt_Flight_Number} onChange={ChangeFlightNumberHandle} />
                                <Form.Control.Feedback type="invalid" tooltip>
                                    Please enter a Airlines_Name.
                                </Form.Control.Feedback>
                            </Col>
                            <Col xs={5} className="form-inline">
                                {/************************************ */}
                                <Form.Label>Time of Arrivel</Form.Label>
                                <Form.Control value={values.txt_Time_arrival} onChange={ChangeTimeArrivelHandle} />
                                <Form.Control.Feedback type="invalid" tooltip>
                                    Please enter a Flight Number.
                                </Form.Control.Feedback>
                            </Col>
                        </Row>
                        <Row className="m-2">
                            <Col xs={5} className="form-inline mx-5">
                                {/************************************ */}
                                <Form.Label>Airport of Arivel</Form.Label>
                                <Form.Control value={values.txt_Airport_arrival} onChange={ChangeAirPortArivelHandle} />
                                <Form.Control.Feedback type="invalid" tooltip>
                                    Please enter a Airport of Arivel.
                                </Form.Control.Feedback>
                                {/************************************ */}
                                <Form.Label>Airport of Shipment</Form.Label>
                                <Form.Control value={values.txt_Airport_shipment} onChange={ChangeAirShipmentHandle} />
                                <Form.Control.Feedback type="invalid" tooltip>
                                    Please enter a Airport of Shipment.
                                </Form.Control.Feedback>
                            </Col>
                            {FirstAirport ? <Col xs={5}>
                                {/************************************ */}
                                <Form.Label>First Airport of Arivel</Form.Label>
                                <Form.Control value={values.txt_First_port_of_Arrivel} onChange={ChangeFirstAirArrivelHandle} />
                                <Form.Control.Feedback type="invalid" tooltip>
                                    Please enter a Airport of Shipment.
                                </Form.Control.Feedback>
                            </Col> : null}
                        </Row>
                        {messages}
                        {hideECM_NONDOCS ? <Button size="sm" style={{ marginLeft: "40px" }} onClick={xml_ECMNONDOCS}>
                            ECM Export
                        </Button> : null}
                        {hideCBE_XII ? <Button size="sm" style={{ marginLeft: "40px" }} onClick={CBE_XII_XML}>
                            XII Export
                        </Button> : null}
                        {hideCBE_XIII ? <Button size="sm" style={{ marginLeft: "40px" }} onClick={CBE_XIII_XML}>
                            XIII Export
                        </Button> : null}
                    </Form>
                </Card> : null}

            </Container>
        </div>
    );
}

export default EDI_DOCUMENTS;