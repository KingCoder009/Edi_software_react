import React from 'react';
import {
    InputLabel, Input, TextField, Typography, Toolbar,
    makeStyles, Table, TableBody, TableCell, TableHead, TableRow, TableContainer,
    FormControl, Select, Backdrop, CircularProgress, Snackbar, IconButton
} from '@material-ui/core';
import ShipmentServices from '../../sevices/masterServices/ShipmentServices'
import OperationSrvces from '../../sevices/operationServices/OperationSrvces';
import { Card, CardGroup, Form, Row } from 'react-bootstrap';
import Sidebar from '../menus/Sidebar';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer - 1,
      color: '#fff',
    },
    formControl: {
      marginLeft: theme.spacing(1),
      margin: theme.spacing(1),
      height: "7vh",
      minWidth: 180,
      maxWidth: 200,
    },
    formControlTWO: {
      marginLeft: theme.spacing(3),
      margin: theme.spacing(1),
      height: "7vh",
      minWidth: 150,
      maxWidth: 180,
    },
    formMAwb: {
      height: "4vh",
      minWidth: 130,
      maxWidth: 150,
    },
    formSelect: {
      marginTop: theme.spacing(-3),
      marginLeft: theme.spacing(3),
      minWidth: 150,
      maxWidth: 250,
    },
    container: {
      maxHeight: 520,
    },
    formOption: {
      fontSize: "13px",
      padding: -5
    },
    title: {
      flexGrow: 1,
      marginTop: theme.spacing(-2),
      textAlign: "center",
    },
    card: {
      minWidth: "25%",
      maxWidth: "30%"
    },
    CardForm: {
      width: "100vh",
    },
    code: {
      marginLeft: theme.spacing(1),
      height: "4vh",
      minWidth: 20,
      maxWidth: 50,
    },
    cardGroup: {
      width: "99.9%",
    },
  }));
function MAWBtracking(props) {
    const classes =useStyles();
    const [notefy, setNotedfy] = useState(false);
    const [errormsg ,setErrorMsg] = useState(false);
    const [drpShipment_cmpny, setShipmentCompeny] = useState([]);
    const [open, setOpen] = useState(true);
    const [TblMAWBNO, setTblMABNO] = useState([]);
    const [values, setValues] = useState({
        drp_Air: "",
        consigment_id: 0,
        MawbNo: "",
        Shipmntcode: "",
        createdBy: getUserId(),
        orginId: 0,
        consigmentNo: "",
        drp_trnstId: "",
        drp_OrgId: "",
        OrgId: 0,
        drp_ClrncLoc: "",
        exchange: "",
        time: "07:30",
        totlInvc: "",
        Ttlwight: "",
        arrivelDate: getDate(),
        bookingDate: getDate(),
        ttlPcs: "",
        orginCountry: 0,
        txt_ceth:"",
        txt_Infomsg: ""
    });
    const DrpData =()=>{
        ShipmentServices.getClearanceShipment().then(res=>{
            setShipmentCompeny(res.data);
            setOpen(false);
            setErrorMsg(false);
            setNotedfy(false)
        }).catch(error =>{
            setValues({txt_Infomsg:error.message});
            setErrorMsg(true);
            setOpen(true);
        })
    };
    useEffect(()=>{
        DrpData();
    },[]);
    const getCompenyCode = (e) => {
        const filteredValue = drpShipment_cmpny.find((node) => node.shipmentCompenyId === e.target.value);
        setValues({ ...values, drp_Air: e.target.value, Shipmntcode: filteredValue.S_CompanyCode })
        OperationSrvces.addMAWB(filteredValue.S_CompanyCode).then(res=>{
            setTblMABNO(res.data);
        })
    };

  //server not response to pushu to login page
  const gohome = () => {
    removeUserSession();
    props.history.push('/');
  }
  //Change handler methods = {
  const changeMawbHandler = (event) => {
    setValues({ ...values, MawbNo: event.target.value.replace(/[^0-9+-]/ig, '') });
  }
  const changeConsigmentHandler = (event) => {
    setValues({ ...values, consigmentNo: event.target.value.replace(/[^0-9+-]/ig, '')});
  }
  const changeExchangeHandler = (event) => {
    setValues({ ...values, exchange: event.target.value.replace(/[^0-9.]/ig, '') });
  }
  const HandleTimePickChange = (event) => {
    setValues({ ...values, time: event.target.value });
  }
  const changeShipmentCodeHandler = (event) => {
    setValues({ ...values, Shipmntcode: event.target.value.replace(/[^0-9]/ig, '')});
  }
  const changeCethHandler = (event) => {
    setValues({ ...values, txt_ceth: event.target.value.replace(/[^0-9]/ig, '')});
  }

    return (
        <div>
            <div>
                <Sidebar />
                <div className="navbarss">
                    <Toolbar>
                        <Typography className={classes.title} >
                            MAWB NO
                        </Typography>
                        <Typography className={classes.title} >
                            MAWB-Tracking
                        </Typography>
                    </Toolbar>
                    <CardGroup>
                        {/* MAWB Table */}
                        <Card>
                            <TableContainer className={classes.container}>
                                <Table stickyHeader aria-label="sticky table" size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Sl.no</TableCell>
                                            <TableCell >MAWB.No</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            TblMAWBNO.map((MAWB) => (
                                                <TableRow hover key={MAWB.consigmentId} onClick={() => editMAWBNO(MAWB)}>
                                                    <TableCell >{MAWB.sl_no}</TableCell>
                                                    <TableCell>{MAWB.consigmentNo}</TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Card>
                        <Card>
                            <Form noValidate >
                                <Card>
                                    <Row>
                                        <Form.Group>
                                            <Form.Label>Shipment Company</Form.Label>
                                            <Form.Select required value={values.drp_Air}
                                                onChange={getCompenyCode} autoComplete="off">
                                                {drpShipment_cmpny.map((Airlins, index) =>
                                                    <option key={index} data-index={index}
                                                        value={Airlins.shipmentCompenyId}>
                                                        {Airlins.shipmentCompenyName}
                                                    </option>
                                                )}
                                            </Form.Select>
                                        </Form.Group>
                                    </Row>
                                </Card>
                                {/*  */}
                                <Row>
                                    <FormControl required className={classes.formControlTWO}>
                                        <Row>
                                            <Form.Label>Mawb.No</Form.Label>
                                            <Form.Control maxLength="3" value={values.Shipmntcode} readOnly onChange={changeShipmentCodeHandler} className={classes.code} />
                                            <Form.Control maxLength="27" value={values.MawbNo} onChange={changeMawbHandler} className={classes.formMAwb} />
                                        </Row>
                                    </FormControl>
                                    {/*  */}
                                    <FormControl required className={classes.formControl}>
                                        <InputLabel>Consigment.No</InputLabel>
                                        <Input maxLength="27"  value={values.consigmentNo} onChange={changeConsigmentHandler} />
                                    </FormControl>
                                    {/*  */}
                                    <FormControl required className={classes.formControlTWO}>
                                        <InputLabel>Transit.Type</InputLabel>
                                        <Select required 
                                            value={values.drp_trnstId}
                                            onChange={(e) => setValues({ ...values, drp_trnstId: e.target.value })} autoComplete="off">
                                            {
                                                drpTrnsitType.map((type) =>
                                                    <option key={type.tranitTypeId}
                                                        value={type.tranitTypeId}>
                                                        {type.transitTypeName}
                                                    </option>
                                                )
                                            }
                                        </Select>
                                    </FormControl>
                                </Row>
                                {/*  */}
                                <Row>
                                    <FormControl required className={classes.formControl}>
                                        <InputLabel>Orgin Cargo Compeny</InputLabel>
                                        <Select 
                                            value={values.drp_orginID}
                                            onChange={(e) => setValues({ ...values, drp_orginID: e.target.value })} autoComplete="off">
                                            {
                                                drpOrigin.map((orgin) =>
                                                    <option key={orgin.orginId} x
                                                        value={orgin.orginId} autoComplete="off">
                                                        {orgin.orgineCompanyName}
                                                    </option>
                                                )
                                            }
                                        </Select>
                                    </FormControl>
                                    {/*  */}
                                    <FormControl required className={classes.formControl}>
                                        <InputLabel>Distinetion/Clearance Loc</InputLabel>
                                        <Select 
                                            value={values.drp_ClrncLoc}
                                            onChange={(e) => setValues({ ...values, drp_ClrncLoc: e.target.value })} autoComplete="off">
                                            {
                                                drpDestinetion.map((locetion) =>
                                                    <option key={locetion.customPointId}
                                                        value={locetion.customPointId}>
                                                        {locetion.customPointName}
                                                    </option>
                                                )}</Select>
                                    </FormControl>
                                    <FormControl className={classes.formControl}>
                                        <TextField 
                                            id="date"
                                            label="Transite Type"
                                            type="date"
                                            onChange={(e) => setValues({ ...values, bookingDate: e.target.value })}
                                            value={values.bookingDate}
                                            className={classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </FormControl>
                                </Row>
                                {/*  */}
                                <Row>
                                    <FormControl required className={classes.formControlTWO}>
                                        <Row>
                                            <Form.Label>Exchange.Rate</Form.Label>
                                            <Form.Control defaultValue="INR" readOnly className={classes.code} />
                                            <Form.Control maxLength="10" value={values.exchange} onChange={changeExchangeHandler} className={classes.formMAwb} />
                                        </Row>
                                    </FormControl>
                                    <FormControl required className={classes.formControlTWO}>
                                        <InputLabel>CETCH No</InputLabel>
                                        <Input value={values.txt_ceth} onChange={changeCethHandler}  />
                                    </FormControl>
                                    {/*  */}
                                    <FormControl required className={classes.formControlTWO}>
                                        <InputLabel>Clearance Organizetion</InputLabel>
                                        <Select 
                                            value={values.drp_OrgId}
                                            onChange={(e) => setValues({ ...values, drp_OrgId: e.target.value })} autoComplete="off">
                                            {
                                                drpOrganizetion.map((orgs) =>
                                                    <option key={orgs.organizetionId}
                                                        value={orgs.organizetionId}>
                                                        {orgs.organizetionName}
                                                    </option>
                                                )
                                            }
                                        </Select>
                                    </FormControl>
                                </Row>
                                {/*  */}
                                <Row>
                                    <FormControl className={classes.formControlTWO}>
                                        <InputLabel>Total Invoice</InputLabel>
                                        <Input maxLength="7"  value={values.totlInvc} onChange={(e) => setValues({ ...values, totlInvc: e.target.value.replace(/[^0-9.]/ig, '') })} />
                                    </FormControl>
                                    {/*  */}
                                    <FormControl required className={classes.formControl}>
                                        <InputLabel>Total Pcs</InputLabel>
                                        <Input maxLength="7"  value={values.ttlPcs} onChange={(e) => setValues({ ...values, ttlPcs: e.target.value })} />
                                    </FormControl>
                                    {/*  */}
                                    <FormControl required className={classes.formControlTWO}>
                                        <InputLabel>Total Wight</InputLabel>
                                        <Input maxLength="12"  value={values.Ttlwight} onChange={(e) => setValues({ ...values, Ttlwight: e.target.value.replace(/[^0-9.]/ig, '') })} />
                                    </FormControl>
                                </Row>
                                <Row>
                                    <FormControl className={classes.formControlTWO}>
                                        <TextField 
                                            id="date"
                                            label="Expect Arrivel Date"
                                            type="date"
                                            value={values.arrivelDate}
                                            onChange={(e) => setValues({ ...values, arrivelDate: e.target.value })}
                                            className={classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </FormControl>
                                    {/*  */}
                                    <FormControl required className={classes.formControl}>
                                        <TextField 
                                            id="time"
                                            label="Expect Arrivel Time"
                                            type="time"
                                            value={values.time}
                                            onChange={HandleTimePickChange}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            inputProps={{
                                                step: 300, // 5 min
                                            }}
                                        />
                                    </FormControl>
                                </Row><Backdrop className={classes.backdrop} open={open} >
                     <CircularProgress color="inherit" /> 
                    {errormsg ? <h2>
                        <p>
                      {values.txt_Infomsg}
                      </p>
                      <button className="btn btn-light" onClick={gohome}>Go Back</button>
                    </h2> : null}
                  </Backdrop>
                  <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}
                    open={notefy} autoHideDuration={6000} message={values.txt_Infomsg}
                    action={
                      <IconButton size="small" aria-label="close" color="inherit" onClick={notefyClose}>
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    } />

                            </Form>
                        </Card>
                    </CardGroup>
                </div>

            </div>
        </div>
    );
}

export default MAWBtracking;