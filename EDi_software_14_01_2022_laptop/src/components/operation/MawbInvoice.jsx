import React, { useState, useEffect } from 'react';
import {
  InputLabel, Input, TextField, Typography, Toolbar,
  makeStyles, Table, TableBody, TableCell, TableHead, TableRow, TableContainer,
  FormControl, Select, Divider, LinearProgress, Backdrop, Snackbar, IconButton
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Sidebar from '../menus/Sidebar'
import { Form, Card, Row, Button, ButtonGroup, CardGroup } from "react-bootstrap";
import OperationSrvces from '../../sevices/operationServices/OperationSrvces';
import PlaceServices from '../../sevices/masterServices/PlaceServices';
import ShipmentServices from '../../sevices/masterServices/ShipmentServices';
import { getUserId, getDate } from '../Utils/Common';
import ReactExport from "react-data-export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

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
    maxWidth: 140,
  },
  formSelect: {
    marginTop: theme.spacing(-2),
    marginLeft: theme.spacing(3),
    minWidth: 150,
    maxWidth: 250,
  },
  container: {
    maxHeight: 520,
  },
  table:{
backgroundColor:"gray"
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
    minWidth: "15%",
    maxWidth: "30%"
  },
  CardForm: {

  },
  code: {
    marginLeft: theme.spacing(1),
    height: "4vh",
    minWidth: 20,
    maxWidth: 54,
  },
  cardGroup: {

  },
}));
const multiDataSet = [
  {
    columns: [
      { title: "HAWB NO", width: { wch: 30 }, style: { font: { bold: false } } },
      { title: "NO OF PCs", width: { wch: 30 }, style: { font: { bold: false } } },
      { title: "WEIGHT", width: { wch: 30 }, style: { font: { bold: false } } },
      { title: "SHIPPER ADDRESS", width: { wch: 30 }, style: { font: { bold: false } } },
      { title: "CONSIGNEE ADDRESS", width: { wch: 30 }, style: { font: { bold: false } } },
      { title: "CONSIGNEE PINCODE", width: { wch: 30 }, style: { font: { bold: false } } },
      { title: "DESCRIPTION OF GOODS", width: { wch: 30 }, style: { alignment: { wrapText: true } } },
      { title: "INVOICE VALUE", width: { wch: 30 }, style: { font: { bold: false } } },
      { title: "GSTIN TYPE(Aadhaar Number,PAN Number,Passport Number,Voter id)", width: { wch: 40 }, style: { alignment: { wrapText: true } } },
      { title: "GSTIN NO", width: { wpx: 100 }, style: { font: { bold: false } } }
    ],
    data: [
      [
        { value: "", style: { numFmt: "@" } },
        { value: "", style: { numFmt: "@" } },
        { value: "", style: { numFmt: "0" } },
        { value: "" },
        { value: "" },
        { value: "", style: { numFmt: "@" } },
        { value: "" },
        { value: "", style: { numFmt: "@" } },
        { value: "" },
        { value: "", style: { numFmt: "@" } },
      ]
    ]
  }
];
const SampleDatset = [
  {
    columns: [
      { title: "HAWB NO", width: { wch: 30 }, style: { font: { bold: false } } },
      { title: "NO OF PCs", width: { wch: 30 }, style: { font: { bold: false } } },
      { title: "WEIGHT", width: { wch: 30 }, style: { font: { bold: false } } },
      { title: "SHIPPER ADDRESS", width: { wch: 30 }, style: { font: { bold: false } } },
      { title: "CONSIGNEE ADDRESS", width: { wch: 30 }, style: { font: { bold: false } } },
      { title: "CONSIGNEE PINCODE", width: { wch: 30 }, style: { font: { bold: false } } },
      { title: "DESCRIPTION OF GOODS", width: { wch: 30 }, style: { alignment: { wrapText: true } } },
      { title: "INVOICE VALUE", width: { wch: 30 }, style: { font: { bold: false } } },
      { title: "GSTIN TYPE(Aadhaar Number,PAN Number,Passport Number,Voter id)", width: { wch: 40 }, style: { alignment: { wrapText: true } } },
      { title: "GSTIN NO", width: { wpx: 100 }, style: { font: { bold: false } } }
    ],
    data: [
      [
        { value: "12345", style: { numFmt: "@" } },
        { value: "1", style: { numFmt: "@" } },
        { value: 10, style: { numFmt: "0" } },
        { value: "x" },
        { value: "x" },
        { value: "600043", style: { numFmt: "@" } },
        { value: "dates-20,badam-10,notes,dreash", style: { alignment: { wrapText: true } } },
        { value: "1233", style: { numFmt: "@" } },
        { value: "Aadhaar Number" },
        { value: "12435", style: { numFmt: "@" } },
      ]
    ]
  }
];
function MawbInvoice(props) {
  const classes = useStyles();
  const [notefy, setNotedfy] = useState(false);
  const [validated, setValidated] = useState(false);
  const [drpOrigin, setDrpOrgin] = useState([]);
  const [drpcountry, setDrpcountry] = useState([]);
  const [drpTrnsitType, setDrpTrnsitType] = useState([]);
  const [drpShipmentAir, setDrpAir] = useState([]);
  const [drpOrganizetion, setDrpOrg] = useState([]);
  const [drpDestinetion, setDestinetion] = useState([]);
  const [TblMAWBNO, setTblMAWBNO] = useState([]);
  const [valide, setValide] = useState(false)
  const [open, setOpen] = useState(false);
  const [currentFile, setCurrentFile] = useState(undefined);
  const [message, setMessage] = useState("");
  const [showUploadfile, setUploadFile] = useState(false)
  const [excelUpload, setExcelUpload] = useState(false);
  const [drpInvoice, setDrpInvoice] = useState([]);
  const [loding ,setLoding] =useState(false);
  const [LodingUd, setLodingU_D] = useState(false);
  const [LodingDelete ,setLodingDelete] = useState(false);
  const [values, setValues] = useState({
    drp_countryId: "",
    drp_filtrBYorginID: "",
    drp_getAllOrigin: -1,
    drp_orginID: "",
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
    xl_file: null,
    xl_consimntNO: 0,
    txt_Infomsg: ""
  });
  //excel bulk upload services
  const selectFile = (event) => {
    let currentFile = event.target.files[0]
    setCurrentFile(currentFile);
    OperationSrvces.upload(values.xl_consimntNO, currentFile).then((response) => {
      setMessage(response.data.message);
      event.target.value = null;
      setCurrentFile(undefined);
    })
      .catch((error) => {
        setMessage(error.response.data.message);
        setCurrentFile(undefined);
        event.target.value = null;
      });
  };
  // get all dropdown values services
  const drpdata = async () => {
    //countryData
    PlaceServices.getCountry().then((res) => {
      setOpen(false);
      setDrpcountry(res.data);
    }).catch(() => {
      setOpen(true);
    })
    //ShipmentData
    ShipmentServices.getClearanceShipment().then(res => {
      setDrpAir(res.data);
    })
    //transitData
    ShipmentServices.getTransitType().then(res => {
      setDrpTrnsitType(res.data);
    })
    //clearnc organisetion
    PlaceServices.getClearncOrgs().then(res => {
      setDrpOrg(res.data);
    })
    //destinetion
    PlaceServices.getClearanceLocetion().then(res => {
      setDestinetion(res.data);
    })
  };
  useEffect(() => {
    drpdata();
  }, []);
  //Insert MAWB serveces and get MAWB services
  const MAWBsave = () => {
    setLoding(true)
    let MAWBinvoice = {
      consigmentNo: values.Shipmntcode + "-" + values.MawbNo, transitTypeId: values.drp_trnstId, transiteDate: values.bookingDate, wayBillNo: values.consigmentNo,
      clearanceOrgId: values.drp_OrgId, orginId: values.drp_orginID, destinationId: values.drp_ClrncLoc, exchangeRate: values.exchange, created: values.createdBy,
      expectedArrivalDate_time: values.arrivelDate + " " + values.time, totalCarton: values.ttlPcs, totalWight: values.Ttlwight, totalInvoice: values.totlInvc, shipmentCompanyId: values.drp_Air
      , filteByOrgin: values.drp_filtrBYorginID
    };
   if(!values.Shipmntcode ||!values.MawbNo || !values.drp_trnstId || values.bookingDate ||!values.drp_Air ||values.drp_Air===0
    ||!values.consigmentNo||!values.drp_OrgId ||  values.drp_OrgId ===0 ||!values.drp_ClrncLoc || values.drp_ClrncLoc===0||!values.ttlPcs ||!values.totlInvc
    ||!values.exchange || !values.createdBy ||!values.drp_orginID ||values.drp_orginID===0||!values.arrivelDate ||!values.time || !values.Ttlwight){
      setValues({
        txt_Infomsg: "", drp_countryId: "", drp_getAllOrigin: -1,
        consigment_id: 0, drp_Air: "", Shipmntcode: "", MawbNo: "", createdBy: getUserId(),
        consigmentNo: "", drp_trnstId: "", drp_orginID: 0, drp_OrgId: "", drp_ClrncLoc: "",
        exchange: "", bookingDate: getDate(), arrivelDate: getDate(), ttlPcs: "", totlInvc: "", Ttlwight: ""
      })
    setValide(true);
    setValidated(true);
     setLoding(false)
   }
   else{
    OperationSrvces.addMAWB(MAWBinvoice).then((res) => {
      if (res.data[0].Message === "Insert-SucessFully") {
        setLoding(false)
        setValues({
          txt_Infomsg: res.data[0].Message, drp_countryId: "", drp_getAllOrigin: -1,
          consigment_id: 0, drp_Air: "", Shipmntcode: "", MawbNo: "", createdBy: getUserId(),
          consigmentNo: "", drp_trnstId: "", drp_orginID: 0, drp_OrgId: "", drp_ClrncLoc: "",
          exchange: "", bookingDate: getDate(), arrivelDate: getDate(), ttlPcs: "", totlInvc: "", Ttlwight: ""
        });
        setNotedfy(true);
        setValide(false);
        setValidated(false);
        OperationSrvces.getMAWBNOdata(values.drp_OrgId, res.data[0].consigmentId).then((res) => {
          setTblMAWBNO(res.data)
        }).catch((error) => {
          setValues({
            txt_Infomsg:error.message, drp_countryId: "", drp_getAllOrigin: -1,
            consigment_id: 0, drp_Air: "", Shipmntcode: "", MawbNo: "", createdBy: getUserId(),
            consigmentNo: "", drp_trnstId: "", drp_orginID: 0, drp_OrgId: "", drp_ClrncLoc: "",
            exchange: "", bookingDate: getDate(), arrivelDate: getDate(), ttlPcs: "", totlInvc: "", Ttlwight: ""
          })
          setLoding(false)
          setValidated(true);
          setNotedfy(true);
          setValide(true);
        })
      }
      else {
        setLoding(false)
        setValues({
          txt_Infomsg: res.data[0].Message, drp_countryId: "", drp_getAllOrigin: -1,
          consigment_id: 0, drp_Air: "", Shipmntcode: "", MawbNo: "", createdBy: getUserId(),
          consigmentNo: "", drp_trnstId: "", drp_orginID: 0, drp_OrgId: "", drp_ClrncLoc: "",
          exchange: "", bookingDate: getDate(), arrivelDate: getDate(), ttlPcs: "", totlInvc: "", Ttlwight: ""
        });
        setNotedfy(true);
        setValide(false);
        setValidated(false);
      }
      OperationSrvces.getMAWBNOdata(values.drp_OrgId, res.data[0].consigmentId).then((res) => {
        setTblMAWBNO(res.data)
      })
    }).catch((error) => {
      setValues({
        txt_Infomsg: error.message, drp_countryId: "", drp_getAllOrigin: -1,
        consigment_id: 0, drp_Air: "", Shipmntcode: "", MawbNo: "", createdBy: getUserId(),
        consigmentNo: "", drp_trnstId: "", drp_orginID: 0, drp_OrgId: "", drp_ClrncLoc: "",
        exchange: "", bookingDate: getDate(), arrivelDate: getDate(), ttlPcs: "", totlInvc: "", Ttlwight: ""
      })
      setValidated(true);
      setNotedfy(true);
      setValide(true);
    })
  }
  };
  //UPDATE MAWB and Get MAWB Services
  const MAWB_update = () => {
    setLodingU_D(true)
    let updateInvoice = {
      consigmentNo: values.Shipmntcode + "-" + values.MawbNo, transitTypeId: values.drp_trnstId, transiteDate: values.bookingDate,
      wayBillNo: values.consigmentNo, clearanceOrgId: values.drp_OrgId, destinationId: values.drp_ClrncLoc,
      exchangeRate: values.exchange, created: values.createdBy, orginId: values.drp_orginID,
      expectedArrivalDate_time: values.arrivelDate + " " + values.time, totalCarton: values.ttlPcs,
      totalWight: values.Ttlwight, totalInvoice: values.totlInvc, shipmentCompanyId: values.drp_Air
    };
    setLodingU_D(true);
    if(!values.consigment_id || values.consigment_id === 0 || !values.Shipmntcode ||!values.MawbNo || !values.drp_trnstId || values.bookingDate ||!values.drp_Air ||values.drp_Air===0
      ||!values.consigmentNo||!values.drp_OrgId ||  values.drp_OrgId ===0 ||!values.drp_ClrncLoc || values.drp_ClrncLoc===0||!values.ttlPcs ||!values.totlInvc
      ||!values.exchange || !values.createdBy ||!values.drp_orginID ||values.drp_orginID===0||!values.arrivelDate ||!values.time || !values.Ttlwight){
      setValues({
        txt_Infomsg: "", drp_countryId: "", drp_getAllOrigin: -1,
        consigment_id: 0, drp_Air: "", Shipmntcode: "", MawbNo: "", createdBy: getUserId(),
        consigmentNo: "", drp_trnstId: "", drp_orginID: 0, drp_OrgId: "", drp_ClrncLoc: "",
        exchange: "", bookingDate: getDate(), arrivelDate: getDate(), ttlPcs: "", totlInvc: "", Ttlwight: ""
      })
      setLodingU_D(false)
      setNotedfy(true);
      setValide(true);
      setValidated(true);
    }
    else{
    OperationSrvces.updateMAWB(values.consigment_id, updateInvoice).then((res) => {
      setValues({
        txt_Infomsg: res.data.message, drp_countryId: "", drp_getAllOrigin: -1,
        consigment_id: 0, drp_Air: "", Shipmntcode: "", MawbNo: "", createdBy: getUserId(),
        consigmentNo: "", drp_trnstId: "", drp_orginID: 0, drp_OrgId: "", drp_ClrncLoc: "",
        exchange: "", bookingDate: getDate(), arrivelDate: getDate(), ttlPcs: "", totlInvc: "", Ttlwight: ""
      })
      setLodingU_D(false);
      setValidated(false);
      setNotedfy(true);
      let consigmentId = 0;
      OperationSrvces.getMAWBNOdata(values.drp_OrgId, consigmentId).then((res) => {
        setTblMAWBNO(res.data);
      }).catch(error => {
        setValues({ txt_Infomsg: "refresh page server slow" })
      })
    }).catch((error) => {
      setValues({
        txt_Infomsg: "", drp_countryId: "", drp_getAllOrigin: -1,
        consigment_id: 0, drp_Air: "", Shipmntcode: "", MawbNo: "", createdBy: getUserId(),
        consigmentNo: "", drp_trnstId: "", drp_orginID: 0, drp_OrgId: "", drp_ClrncLoc: "",
        exchange: "", bookingDate: getDate(), arrivelDate: getDate(), ttlPcs: "", totlInvc: "", Ttlwight: ""
      })
      setLodingU_D(false)
      setNotedfy(true);
      setValidated(true);
    })
  }
  };
  //delete MAWB and get MAWB services
  const MAWB_delete = () => {
    setLodingDelete(true);
    if(!values.consigment_id || values.consigment_id === 0){
      setValues({
        txt_Infomsg: "", drp_countryId: "", drp_getAllOrigin: -1,
        consigment_id: 0, drp_Air: "", Shipmntcode: "", MawbNo: "", createdBy: getUserId(),
        consigmentNo: "", drp_trnstId: "", drp_orginID: 0, drp_OrgId: "", drp_ClrncLoc: "",
        exchange: "", bookingDate: getDate(), arrivelDate: getDate(), ttlPcs: "", totlInvc: "", Ttlwight: ""
      })
      setLodingDelete(false)
      setNotedfy(true);
      setValide(true);
      setValidated(true);
    }
    else{
    OperationSrvces.deleteMAWB(values.consigment_id).then((res) => {
      setValues({ txt_Infomsg: res.data.message })
      setLodingDelete(false)
      setNotedfy(true)
      let consigmentId = 0;
      OperationSrvces.getMAWBNOdata(values.drp_OrgId, consigmentId).then((res) => {
        setTblMAWBNO(res.data);
        setValues({
          drp_countryId: "", drp_getAllOrigin: -1,
          consigment_id: 0, drp_Air: "", Shipmntcode: "", MawbNo: "", createdBy: getUserId(),
          consigmentNo: "", drp_trnstId: "", drp_orginID: 0, drp_OrgId: "", drp_ClrncLoc: "",
          exchange: "", bookingDate: getDate(), arrivelDate: getDate(), ttlPcs: "", totlInvc: "", Ttlwight: ""
        })
      }).catch((e) => {
        setValues({
          txt_Infomsg: e.message, drp_countryId: "", drp_getAllOrigin: -1,
          consigment_id: 0, drp_Air: "", Shipmntcode: "", MawbNo: "", createdBy: getUserId(),
          consigmentNo: "", drp_trnstId: "", drp_orginID: 0, drp_OrgId: "", drp_ClrncLoc: "",
          exchange: "", bookingDate: getDate(), arrivelDate: getDate(), ttlPcs: "", totlInvc: "", Ttlwight: ""
        });
        setNotedfy(true)
      })
    }).catch((e) => {
      setValues({
        txt_Infomsg: e.message, drp_countryId: "", drp_getAllOrigin: -1,
        consigment_id: 0, drp_Air: "", Shipmntcode: "", MawbNo: "", createdBy: getUserId(),
        consigmentNo: "", drp_trnstId: "", drp_orginID: 0, drp_OrgId: "", drp_ClrncLoc: "",
        exchange: "", bookingDate: getDate(), arrivelDate: getDate(), ttlPcs: "", totlInvc: "", Ttlwight: ""
      });
      setLodingDelete(false)
      setNotedfy(true)
    })
  }
  };
  // notificetion controller  
  const notefyClose = () => {
    setNotedfy(false);
  };
  //open upload manifest 
  const showUploadcard = () => {
    setOpen(true);
    setUploadFile(true);
  }
  //cancel upload function
  const cancel = () => {
    setMessage(" ")
    setUploadFile(false);
    setOpen(false);
  }
  //get filter by origin services
  const handleCountryIdChange = (event) => {
    setValues({ ...values, drp_countryId: event.target.value });
    console.log('changes countryId  =>' + JSON.stringify(event.target.value));
    if (event.target.value !== 0) {
      PlaceServices.getOrginCompany(event.target.value).then((res) => {
        setDrpOrgin(res.data);
      }).catch((error) => {
        setDrpOrgin([])
        console.log('catch block  =>' + JSON.stringify(error));
      })
    }
    else {
      setDrpOrgin([])
      console.log('else block  =>');
    }
  };
  //get MAWB_No services
  const HandleOriginChange = (event) => {
    setValues({ ...values, drp_filtrBYorginID: event.target.value })
    OperationSrvces.getMAWBNOdata(event.target.value, values.consigment_id).then((res) => {
      setTblMAWBNO(res.data);
    }).catch((error) => {
      setTblMAWBNO([]);
    })
  };
  //get shipment/airlines  companycode
  const getCompenyCode = (e) => {
    const filteredValue = drpShipmentAir.find((node) => node.shipmentCompenyId === e.target.value);
    setValues({ ...values, drp_Air: e.target.value, Shipmntcode: filteredValue.S_CompanyCode })
  };
  //To get to details parameterd and delete details then get invoice num
  const editMAWBNO = (MAWB) => {
    let Updat_Mawbno = MAWB.consigmentNo;
    const SplitMawbno = Updat_Mawbno.split("-")
    let arivel_dateANDtime = MAWB.expectedArrivalDate_time;
    const Splitarivel_date_time = arivel_dateANDtime.split(" ")
    console.log("datestr=> " + MAWB.transiteDate)
    setValues({
      consigment_id: MAWB.consigmentId,
      drp_Air: MAWB.shipmentCompanyId,
      Shipmntcode: SplitMawbno[0],
      MawbNo: SplitMawbno[1],
      consigmentNo: MAWB.wayBillNo,
      drp_trnstId: MAWB.transitTypeId,
      drp_orginID: MAWB.orginId,
      drp_OrgId: MAWB.clearanceOrgId,
      drp_ClrncLoc: MAWB.destinationId,
      createdBy: getUserId(),
      exchange: MAWB.exchangeRate,
      bookingDate: MAWB.transiteDate,
      arrivelDate: Splitarivel_date_time[0],
      time: Splitarivel_date_time[1],
      ttlPcs: MAWB.totalCarton,
      totlInvc: MAWB.totalInvoice,
      Ttlwight: MAWB.totalWight,
      drp_filtrBYorginID: MAWB.filteByOrgin,
      xl_consimntNO: MAWB.consigmentNo
    })
    OperationSrvces.getInvoiceNO(MAWB.consigmentNo).then((res) => {
      setDrpInvoice(res.data);
    })
  }
  //reset all parameters
  const reset = () => {
    setValues({
      drp_countryId: "",
      drp_getAllOrigin: -1,
      consigment_id: 0,
      drp_Air: "",
      Shipmntcode: "",
      MawbNo: "",
      consigmentNo: "",
      drp_trnstId: "",
      drp_orginID: "",
      drp_OrgId: "",
      drp_ClrncLoc: "",
      exchange: "",
      bookingDate: getDate(),
      arrivelDate: getDate(),
      time: "12:00",
      ttlPcs: "",
      totlInvc: "",
      Ttlwight: "",
      drp_filtrBYorginID: "",
      xl_consimntNO: 0
    });
    setDrpOrgin([])
    setTblMAWBNO([]);
    setDrpInvoice([]);
    setNotedfy(false);
    setValide(false);
    setValidated(false);
  }
  //isDisbale on consigment id never pass
  const isDisable = () => {
    if (values.consigment_id === 0) {
      return true
    } else {
      return false
    }
  };
  //isDisable on consigment_id pass
  const submit = () => {
    if (values.consigment_id === 0) {
      return false
    } else {
      return true
    }
  };
  //excel upload velidetion handling coigmnt.no passs to allow to upload file
  const excelUploadFile = () => {
    if (values.xl_consimntNO === 0 ||!values.xl_consimntNO) {
      setMessage("MAWB.No -Required")
      setExcelUpload(false);
    }
    else {
      setExcelUpload(true);
    }
  }

  //Change handler methods 
  const changeMawbHandler = (event) => {
    setValues({ ...values, MawbNo: event.target.value.replace(/[^0-9+-]/ig, '') });
  }
  const changeConsigmentHandler = (event) => {
    setValues({ ...values, consigmentNo: event.target.value.replace(/[^0-9+-]/ig, '') });
  }
  const changeExchangeHandler = (event) => {
    setValues({ ...values, exchange: event.target.value.replace(/[^0-9.]/ig, '') });
  }
  const HandleTimePickChange = (event) => {
    setValues({ ...values, time: event.target.value });
  }
  const changeShipmentCodeHandler = (event) => {
    setValues({ ...values, Shipmntcode: event.target.value.replace(/[^0-9]/ig, '') });
  }

  return (
    <div>
      <div>
        <Sidebar />
      </div>
      <div>
        <body className="responsive box-content border-4">
          <div className="navbarss">
            <Toolbar>
              <FormControl required className={classes.formSelect}>
                <InputLabel color="primarry" focused>Country</InputLabel>
                <Select error={valide} className={classes.formOption}
                  value={values.drp_countryId}
                  onChange={handleCountryIdChange} autoComplete="off">
                  <option value={values.drp_getAllOrigin}>All</option>
                  {
                    drpcountry.map((countrys) =>
                      <option key={countrys.countryId} value={countrys.countryId}>
                        {countrys.countryName}
                      </option>
                    )}
                </Select>
              </FormControl>
              <FormControl required className={classes.formSelect}>
                <InputLabel color="primarry" focused>Filter by Origin</InputLabel>
                <Select error={valide} className={classes.formOption}
                  value={values.drp_filtrBYorginID}
                  onChange={HandleOriginChange} autoComplete="off">
                  {
                    drpOrigin.map((orgin) =>
                      <option key={orgin.orginId}
                        value={orgin.orginId} autoComplete="off">
                        {orgin.orgineCompanyName}
                      </option>
                    )
                  }
                </Select>
              </FormControl>
              <Typography className={classes.title} >
                MAWB-Invoice Entry
              </Typography>
              <Typography className={classes.title} >
                Invoice
              </Typography>
            </Toolbar>
          </div>
          <CardGroup>
            {/*1st table */}
            <Card border="dark" className={classes.card}>
              <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table" size="small" >
                  <TableHead className={classes.table}>
                    <TableRow>
                      <TableCell>Sl.No</TableCell>
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
            {/*input values */}
            <Card border="dark" className={classes.CardForm}>
              <Card.Body>
                <Form noValidate validated={validated}>
                  <Row className="form-inline">
                    <FormControl required className={classes.formControl}  >
                      <InputLabel color="primarry" focused >Airlines</InputLabel>
                      <Select required error={valide}
                        value={values.drp_Air}
                        onChange={getCompenyCode} autoComplete="off">
                        {drpShipmentAir.map((Airlins, index) =>
                          <option key={index} data-index={index}
                            value={Airlins.shipmentCompenyId}>
                            {Airlins.shipmentCompenyName}
                          </option>
                        )}
                      </Select>
                    </FormControl>
                    <FormControl required className={classes.formControlTWO} >
                      <Row>
                        <Form.Label style={{ color: "blue", fontWeight: "50" }}>Mawb.No</Form.Label>
                        <Form.Control maxLength="3" value={values.Shipmntcode} readOnly onChange={changeShipmentCodeHandler} className={classes.code} />
                        <Form.Control maxLength="27" value={values.MawbNo} onChange={changeMawbHandler} className={classes.formMAwb} />
                      </Row>
                    </FormControl>
                  </Row>
                  <Row className="form-inline">
                    <FormControl required className={classes.formControl}>
                      <InputLabel color="primarry" focused>Consigment.No</InputLabel>
                      <Input maxLength="27" error={valide} value={values.consigmentNo} onChange={changeConsigmentHandler} />
                    </FormControl>
                    <FormControl required className={classes.formControlTWO}>
                      <InputLabel color="primarry" focused>Transit.Type</InputLabel>
                      <Select required error={valide}
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
                  <Row className="form-inline">
                    <FormControl required className={classes.formControl}>
                      <InputLabel color="primarry" focused>Orgin Cargo Compeny</InputLabel>
                      <Select error={valide}
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
                    <FormControl required className={classes.formControlTWO}>
                      <InputLabel color="primarry" focused>Clearance Organizetion</InputLabel>
                      <Select error={valide}
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
                  <Row className="form-inline">
                    <FormControl required className={classes.formControl}>
                      <InputLabel color="primarry" focused
                      >Distinetion/Clearance Loc</InputLabel>
                      <Select error={valide}
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
                    <FormControl required className={classes.formControlTWO}>
                      <Row>
                        <Form.Label style={{ color: "blue", fontWeight: "50" }}>Exchange.Rate</Form.Label>

                        <Form.Control defaultValue="INR" readOnly className={classes.code} />
                        <Form.Control maxLength="10" value={values.exchange} onChange={changeExchangeHandler} className={classes.formMAwb} />
                      </Row>
                    </FormControl>
                  </Row>
                  <Row className="form-inline">
                    <FormControl className={classes.formControl}>
                      <TextField error={valide}
                        color="primarry" focused
                        id="date"
                        label="MAWB Booking Dt"
                        type="date"
                        onChange={(e) => setValues({ ...values, bookingDate: e.target.value })}
                        value={values.bookingDate}
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </FormControl>
                    <FormControl className={classes.formControlTWO}>
                      <TextField error={valide}
                        color="primarry" focused
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
                  </Row>
                  <Row className="form-inline">
                    <FormControl required className={classes.formControl}>
                      <TextField error={valide}
                        color="primarry" focused
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
                    <FormControl className={classes.formControlTWO}>
                      <InputLabel color="primarry" focused>Total Invoice</InputLabel>
                      <Input maxLength="7" error={valide} value={values.totlInvc} onChange={(e) => setValues({ ...values, totlInvc: e.target.value.replace(/[^0-9.]/ig, '') })} />
                    </FormControl>
                  </Row>
                  <Row className="form-inline">
                    <FormControl required className={classes.formControl}>
                      <InputLabel color="primarry" focused>Total Pcs</InputLabel>
                      <Input maxLength="7" error={valide} value={values.ttlPcs} onChange={(e) => setValues({ ...values, ttlPcs: e.target.value })} />
                    </FormControl>
                    <FormControl required className={classes.formControlTWO}>
                      <InputLabel color="primarry" focused>Total Wight</InputLabel>
                      <Input maxLength="12" error={valide} value={values.Ttlwight} onChange={(e) => setValues({ ...values, Ttlwight: e.target.value.replace(/[^0-9.]/ig, '') })} />
                    </FormControl>
                  </Row>
                  <Backdrop className={classes.backdrop} open={open} >
                    {showUploadfile ? <div>
                      <Card className="text-center" border="primary"
                        bg={'Dark'}
                        text={'light'}>
                        <Card.Header>Upload ManiFest</Card.Header>
                        <Card.Body>
                          <label onClick={excelUploadFile} className="btn btn-default" >
                            Upload
                            {excelUpload ? <input type="file" onChange={selectFile} hidden /> : null}
                          </label>
                          {currentFile && (
                            <LinearProgress color="secondary" />
                          )}
                          <div className="alert alert-success" role="alert">
                            {message}
                          </div>
                          <Divider />
                          <Card.Text className="text-center">
                            Click Download Template Button To Download<br />
                            Manifest Template Excel Format<br />
                            Click Download Sample Manifest Button to Download<br />
                            Sample Manifest Excel Format
                          </Card.Text>
                          <Divider />
                          <ExcelFile filename="Sample Manifest" element={<Button className="p-1">Download sample Manifist</Button>}>
                            <ExcelSheet dataSet={SampleDatset} name="Organization" />
                          </ExcelFile>
                          <ExcelFile filename="Manifest" element={<Button className="p-1">Download templete</Button>}>
                            <ExcelSheet dataSet={multiDataSet} name="Organization" />
                          </ExcelFile>
                          <Button variant="primary" className="p-1" onClick={cancel}>cancel</Button>
                        </Card.Body>
                      </Card>
                    </div> : null}
                  </Backdrop>
                  <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}
                    open={notefy} autoHideDuration={6000} message={values.txt_Infomsg}
                    action={
                      <IconButton size="small" aria-label="close" color="inherit" onClick={notefyClose}>
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    } />
                  <ButtonGroup bsPrefix>
                    <Button className="btn btn-info p-1" onClick={showUploadcard}>Upload Manifist</Button>
                    <Button className="btn btn-info p-1" disabled={submit() + loding} onClick={MAWBsave}>{loding ? 'Loading...' : 'submit'}</Button>
                    <Button className="btn btn-info p-1" onClick={reset}>Rest</Button>
                    <Button className="btn btn-info p-1" disabled={isDisable()+LodingUd} onClick={MAWB_update}>{LodingUd ? 'Loading...' : 'update'}</Button>
                    <Button className="btn btn-danger p-1" disabled={isDisable()+LodingDelete} onClick={MAWB_delete}>{LodingDelete ? 'Loading...' : 'delete'}</Button>
                  </ButtonGroup>
                </Form>
              </Card.Body>
            </Card>
            {/*2nd Table */}
            <Card border="dark" className={classes.card}>
              <TableContainer className={classes.container}>
                <Table stickyHeader size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Sl.No</TableCell>
                      <TableCell align="left">Invoice.No</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody style={{ overflowY: "scroll" }}>
                    {drpInvoice.map((invoices) => (
                      <TableRow hover key={invoices.invoiceId}>
                        <TableCell align="left">{invoices.sl_no}</TableCell>
                        <TableCell align="left">{invoices.invoice_No}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </CardGroup>
        </body>
      </div>
    </div>
  )
}

export default MawbInvoice;

