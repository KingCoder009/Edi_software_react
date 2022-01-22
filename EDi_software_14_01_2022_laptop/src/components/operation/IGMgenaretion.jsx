import React, { useState, useEffect } from 'react';
import {
  InputLabel, TextField, Typography, Toolbar, Divider,
  makeStyles, Table, TableBody, TableCell, TableHead, TableRow, TableContainer,
  FormControl, Select, Snackbar, IconButton, TablePagination, Checkbox
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Sidebar from '../menus/Sidebar'
import { Form, Card, Row, Button, ButtonGroup, CardGroup } from "react-bootstrap";
import { AiFillCloseSquare } from 'react-icons/ai';
import OperationSrvces from '../../sevices/operationServices/OperationSrvces';
import PlaceServices from '../../sevices/masterServices/PlaceServices';


const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer - 1,
    backgroundColor: "pink",
    color: '#fff',
  },
  formControl: {
    margin: theme.spacing(0),
    height: "7vh",
    minWidth: "10vh",
    maxWidth: "50vh",
  },
  textField: {
    margin: theme.spacing(0),
    height: "7vh",
    minWidth: "40vh",
    maxWidth: "70vh",
  },
  formMAwb: {
    height: "4vh",
    minWidth: 130,
    maxWidth: 150,
  },
  formSelect: {
    marginTop: theme.spacing(-2),
    marginLeft: theme.spacing(4),
    padding: theme.spacing(-3),
    minWidth: 150,
    maxWidth: 250,
  },
  container: {
    margin: theme.spacing(1),
    minWidth:"50%",
    maxWidth: "95%",
    height: "85vh",
  },
  INVOICEcontainer: {
    margin: theme.spacing(1),
    minWidth:"40%",
    maxWidth: "95%",
    height: "85vh",
  },
  ViweINVOICEcontainer: {
    margin: theme.spacing(1),
    minWidth:"40%",
    maxWidth: "95%",
    height: "78vh",
  },
  igmtable: {
    margin: theme.spacing(1),
    width: "100%",
    maxHeight: 220,
  },
  viweIGM: {
    margin: theme.spacing(1),
    width: "90%",
    minHeight:220,
    maxHeight: 250,
  },
  ViewIGMtblCard: {
    zIndex: theme.zIndex.drawer - 1,
    marginTop: theme.spacing(-8),
    marginLeft: theme.spacing(-2),
    width: "104%",
    minHeight:"50vh",
    maxHeight: "100vh",
  },
  ViweINVOICEcard: {
    zIndex: theme.zIndex.drawer - 1,
  },
  formOption: {
    fontSize: "13px",
    padding: -5
  },
  title: {
    flexGrow: 1,
    marginLeft: theme.spacing(9),
    textAlign: "left",
  },
  card: {
    minWidth: "10vh",
    maxWidth:"40vh"
  },
  CardForm: {
    minWidth: "60vh",
    maxWidth:"110vh"
  },
  cardGroup: {
    width: "100%",
  },
}));

function IGMgenaretion(props) {
  const classes = useStyles();
  const [selected, setSelected] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [notefy, setNotedfy] = useState(false);
  const [validated, setValidated] = useState(false);
  const [drpOrigin, setDrpOrgin] = useState([]);
  const [drpcountry, setDrpcountry] = useState([]);
  const [TblMAWBNO, setTblMAWBNO] = useState([]);
  const [tblIGM, setTBLigm] = useState([]);
  const [valide, setValide] = useState(false);
  const [tblInvoice, setInvoice] = useState([]);
  const [ showViweIGM ,setShowViweIgm] = useState(false);
  const [hideIgm , setHideIGm] = useState(true);
  const [ViewTblIGM, setViewTblIGM] = useState([]);
  const [ViweTblInvoice, setViweTblInvoice] = useState([]);
  const [MAWBno, setMAWB_No] = useState({
               MAWBNO:""
              });
  const [InvoceId, setInvoiceValue] = useState({
    InvoiceId:""
  });
  const [values, setValues] = useState({
    drp_countryId: "",
    drp_filtrBYorginID: "",
    drp_getAllOrigin: -1,
    drp_orginID: "",
    txt_igm_id: 0,
    txt_igm_No: "",
    txt_Airlines_name: "",
    txt_Flight_Number: "",
    txt_Airport_arrival: "",
    txt_Airport_shipment: "",
    txt_Date_arrivel: " ",
    txt_Time_arrival: "",
    txt_First_port_of_Arrivel: "",
    txt_Infomsg: "",
  });

  // get all dropdown values services
  const getAlldata = async () => {
    //countryData
    PlaceServices.getCountry().then((res) => {
      setDrpcountry(res.data);
    }).catch(() => {

    })
    //get igm
    OperationSrvces.getIGMNo().then((res) => {
      setTBLigm(res.data);
    }).catch(() => {
     
    })
  };
  useEffect(() => {
    getAlldata();
  }, []);

  const LoadInvoice =() =>{
    console.log("mawb "+MAWBno.MAWBNO)
    if(!MAWBno.MAWBNO){
      setValues({txt_Infomsg:"Select a MAWB.No"})
      setNotedfy(true);
    }
    else{
    OperationSrvces.loadInvoice(MAWBno.MAWBNO).then((res)=>{
      setInvoice(res.data);
    })
  }
  }
  const viewIgmDetails =() =>{
    setShowViweIgm(true);
    setHideIGm(false);
    OperationSrvces.getIGMNo().then((res)=>{
      setViewTblIGM(res.data);
    })
  };
  
  const closeCard =() =>{
    setShowViweIgm(false);
    setHideIGm(true);
  };
  const AssignIgm =() =>{
    var invicId = InvoceId.InvoiceId;
    var Invic_id = invicId.toString();
    let Assign_igm = {invoiceId_And_MAWB_No: Invic_id+","+MAWBno.MAWBNO ,igm_no:values.txt_igm_No};
    console.log("invoicId "+JSON.stringify(Invic_id));
    console.log("invoicId "+Invic_id);
    if(!InvoceId.InvoiceId){
      setValues({  drp_countryId: "",
      drp_filtrBYorginID: "",
      drp_getAllOrigin: -1,
      drp_orginID: "",
      txt_igm_id: 0,
      txt_igm_No: "",
      txt_Airlines_name: "",
      txt_Flight_Number: "",
      txt_Airport_arrival: "",
      txt_Airport_shipment: "",
      txt_Date_arrivel: "",
      txt_Time_arrival: "",
      txt_First_port_of_Arrivel: "",
      txt_Infomsg:"Select a Invoice.No"})
      setNotedfy(true);
      setValidated(true);
    }
    else if(!values.txt_igm_No){
      setValues({  drp_countryId: "",
      drp_filtrBYorginID: "",
      drp_getAllOrigin: -1,
      drp_orginID: "",
      txt_igm_id: 0,
      txt_igm_No: "",
      txt_Airlines_name: "",
      txt_Flight_Number: "",
      txt_Airport_arrival: "",
      txt_Airport_shipment: "",
      txt_Date_arrivel: "",
      txt_Time_arrival: "",
      txt_First_port_of_Arrivel: "",
      txt_Infomsg:"Select a IGM.No"})
      setNotedfy(true);
      setValidated(true);
    }
    else if(!MAWBno.MAWBNO){
      setValues({  drp_countryId: "",
      drp_filtrBYorginID: "",
      drp_getAllOrigin: -1,
      drp_orginID: "",
      txt_igm_id: 0,
      txt_igm_No: "",
      txt_Airlines_name: "",
      txt_Flight_Number: "",
      txt_Airport_arrival: "",
      txt_Airport_shipment: "",
      txt_Date_arrivel: "",
      txt_Time_arrival: "",
      txt_First_port_of_Arrivel: "",
      txt_Infomsg:"Select a MAWB.No"})
      setNotedfy(true);
      setValidated(true);
    }
    else{
    OperationSrvces.assignInvoiceBasedIgm(Assign_igm).then((res)=>{
      // setValues({txt_Infomsg:res.data.message})
      // setNotedfy(true)
      OperationSrvces.loadInvoice(MAWBno.MAWBNO).then((res)=>{
        setInvoice(res.data);
      })
    }).catch(error=>{
      setValues({  drp_countryId: "",
      drp_filtrBYorginID: "",
      drp_getAllOrigin: -1,
      drp_orginID: "",
      txt_igm_id: 0,
      txt_igm_No: "",
      txt_Airlines_name: "",
      txt_Flight_Number: "",
      txt_Airport_arrival: "",
      txt_Airport_shipment: "",
      txt_Date_arrivel: "",
      txt_Time_arrival: "",
      txt_First_port_of_Arrivel: "",
      txt_Infomsg:error.message})
      setNotedfy(true);
      setValidated(true);
    })
  }
  };
  const remove_igm =() =>{
    var invicId = InvoceId.InvoiceId;
    var Invic_id = invicId.toString();
    console.log("igm = "+values.txt_igm_id)
    console.log("Invoice = "+Invic_id)
    if(values.txt_igm_id===0 || !values.txt_igm_id){
      setValues({txt_Infomsg:"Select a IGM.No"})
      setViweTblInvoice([])
      setNotedfy(true);
    }
    else if(!InvoceId.InvoiceId){
      setValues({txt_Infomsg:"Select a Invoice.No"})
      setNotedfy(true);
    }
    else{
      OperationSrvces.removeIgm(Invic_id,values.txt_igm_id).then(res=>{
       OperationSrvces.getInvoiceBasedIgm(values.txt_igm_id).then(res =>{
         setViweTblInvoice(res.data);
         setNotedfy(false);
       }).catch(error=>{
         setValues({txt_Infomsg:error.message})
         setNotedfy(true);
       })
      })
     }
  };
  //Insert MAWB serveces and get MAWB services
  const IGMSave = () => {
    var arivelDate = String(values.txt_Date_arrivel)
    let IGMGenaretyion = {
      igm_no: values.txt_igm_No, airlinesName: values.txt_Airlines_name, flightNo: values.txt_Flight_Number,
      airPortofArrivel: values.txt_Airport_arrival, airPortofShipment: values.txt_Airport_shipment, dateOfArivel: arivelDate,
      timeofArrivel: values.txt_Time_arrival, firstPortOfArrivel: values.txt_First_port_of_Arrivel
    };
    if(!values.txt_igm_No && !values.txt_Airlines_name && !values.txt_Flight_Number && !values.txt_Airport_arrival && !values.txt_Airport_shipment && !values.txt_Date_arrivel && !values.txt_Time_arrival){
      setValues({
        drp_countryId: "",
        drp_filtrBYorginID: "",
        drp_getAllOrigin: -1,
        drp_orginID: "",
        txt_igm_id: 0,
        txt_igm_No: "",
        txt_Airlines_name: "",
        txt_Flight_Number: "",
        txt_Airport_arrival: "",
        txt_Airport_shipment: "",
        txt_Date_arrivel: "",
        txt_Time_arrival: "",
        txt_First_port_of_Arrivel: "",
      });
      setValidated(true);
      setNotedfy(false);
    }
    else{
    OperationSrvces.addIgmNO(IGMGenaretyion).then((res) => {
      setValues({
        drp_countryId: "",
        drp_filtrBYorginID: "",
        drp_getAllOrigin: -1,
        drp_orginID: "",
        txt_igm_id: 0,
        txt_igm_No: "",
        txt_Airlines_name: "",
        txt_Flight_Number: "",
        txt_Airport_arrival: "",
        txt_Airport_shipment: "",
        txt_Date_arrivel: "",
        txt_Time_arrival: "",
        txt_First_port_of_Arrivel: "",
        txt_Infomsg: res.data.message
      });
      setNotedfy(true);
      setValide(false);
      setValidated(false);
      OperationSrvces.getIGMNo().then((res) => {
        setTBLigm(res.data)
      })
    }).catch((error) => {
      if(!values.txt_igm_No && !values.txt_Airlines_name && !values.txt_Flight_Number && !values.txt_Airport_arrival && !values.txt_Airport_shipment && !values.txt_Date_arrivel && !values.txt_Time_arrival){
        setValues({
          drp_countryId: "",
          drp_filtrBYorginID: "",
          drp_getAllOrigin: -1,
          drp_orginID: "",
          txt_igm_id: 0,
          txt_igm_No: "",
          txt_Airlines_name: "",
          txt_Flight_Number: "",
          txt_Airport_arrival: "",
          txt_Airport_shipment: "",
          txt_Date_arrivel: "",
          txt_Time_arrival: "",
          txt_First_port_of_Arrivel: "",
        });
        setValidated(true);
        setNotedfy(false);
        
      }
      else{
      setValues({
        drp_countryId: "",
        drp_filtrBYorginID: "",
        drp_getAllOrigin: -1,
        drp_orginID: "",
        txt_igm_id: 0,
        txt_igm_No: "",
        txt_Airlines_name: "",
        txt_Flight_Number: "",
        txt_Airport_arrival: "",
        txt_Airport_shipment: "",
        txt_Date_arrivel: "",
        txt_Time_arrival: "",
        txt_First_port_of_Arrivel: "",
        txt_Infomsg: error.message
      });
      setValidated(true);
      setNotedfy(true);
      setValide(true);
    }
    })
  }
  };
  //UPDATE MAWB and Get MAWB Services
  const IGM_update = () => {
    var arivelDate = values.txt_Date_arrivel;
    var DateOfArrivel = arivelDate.toString();
    let updateInvoice = {
      igm_no: values.txt_igm_No, airlinesName: values.txt_Airlines_name, flightNo: values.txt_Flight_Number,
      airPortofArrivel: values.txt_Airport_arrival, airPortofShipment: values.txt_Airport_shipment, dateOfArivel:DateOfArrivel ,
      timeofArrivel: values.txt_Time_arrival, firstPortOfArrivel: values.txt_First_port_of_Arrivel
    };
    if(values.txt_igm_id === 0 && !values.txt_igm_No && !values.txt_Airlines_name && !values.txt_Flight_Number && !values.txt_Airport_arrival && !values.txt_Airport_shipment && !values.txt_Date_arrivel && !values.txt_Time_arrival){
      setValues({
        drp_countryId: "",
        drp_filtrBYorginID: "",
        drp_getAllOrigin: -1,
        drp_orginID: "",
        txt_igm_id: 0,
        txt_igm_No: "",
        txt_Airlines_name: "",
        txt_Flight_Number: "",
        txt_Airport_arrival: "",
        txt_Airport_shipment: "",
        txt_Date_arrivel: "",
        txt_Time_arrival: "",
        txt_First_port_of_Arrivel: "",
      });
      setValidated(true);
      setNotedfy(false);
    }
    else{
    OperationSrvces.updateIGM(values.txt_igm_id, updateInvoice).then((res) => {
      setValues({
        drp_countryId: "",
        drp_filtrBYorginID: "",
        drp_getAllOrigin: -1,
        drp_orginID: "",
        txt_igm_id: 0,
        txt_igm_No: "",
        txt_Airlines_name: "",
        txt_Flight_Number: "",
        txt_Airport_arrival: "",
        txt_Airport_shipment: "",
        txt_Date_arrivel: "",
        txt_Time_arrival: "",
        txt_First_port_of_Arrivel: "",
        txt_Infomsg: res.data.message
      });
      setValidated(false);
      setNotedfy(true);
      OperationSrvces.getIGMNo().then((res) => {
        setTBLigm(res.data);
      })
    }).catch((error) => {
      setValues({
        drp_countryId: "",
        drp_filtrBYorginID: "",
        drp_getAllOrigin: -1,
        drp_orginID: "",
        txt_igm_id: 0,
        txt_igm_No: "",
        txt_Airlines_name: "",
        txt_Flight_Number: "",
        txt_Airport_arrival: "",
        txt_Airport_shipment: "",
        txt_Date_arrivel: "",
        txt_Time_arrival: "",
        txt_First_port_of_Arrivel: "",
        txt_Infomsg: error.message
      })
      setNotedfy(true);
      setValidated(true);
    })
  }
  };
  //delete MAWB and get MAWB services
  const IGM_delete = () => {
    if(values.txt_igm_id === 0){
      setValues({
        drp_countryId: "",
        drp_filtrBYorginID: "",
        drp_getAllOrigin: -1,
        drp_orginID: "",
        txt_igm_id: 0,
        txt_igm_No: "",
        txt_Airlines_name: "",
        txt_Flight_Number: "",
        txt_Airport_arrival: "",
        txt_Airport_shipment: "",
        txt_Date_arrivel: "",
        txt_Time_arrival: "",
        txt_First_port_of_Arrivel: "",
        txt_Infomsg: "select a igm"
      })
      setNotedfy(true)
      setValidated(true);
    }
    else{
    OperationSrvces.deleteIGMno(values.txt_igm_id).then((res) => {
      setValues({
        drp_countryId: "",
        drp_filtrBYorginID: "",
        drp_getAllOrigin: -1,
        drp_orginID: "",
        txt_igm_id: 0,
        txt_igm_No: "",
        txt_Airlines_name: "",
        txt_Flight_Number: "",
        txt_Airport_arrival: "",
        txt_Airport_shipment: "",
        txt_Date_arrivel: "",
        txt_Time_arrival: "",
        txt_First_port_of_Arrivel: "",
        txt_Infomsg: res.data.message
      })
      setNotedfy(true)
      setValidated(false);
      OperationSrvces.getIGMNo().then((res) => {
        setTBLigm(res.data);
      })
    }).catch((e) => {
      if(values.txt_igm_id===0){
      setValues({
        drp_countryId: "",
        drp_filtrBYorginID: "",
        drp_getAllOrigin: -1,
        drp_orginID: "",
        txt_igm_id: 0,
        txt_igm_No: "",
        txt_Airlines_name: "",
        txt_Flight_Number: "",
        txt_Airport_arrival: "",
        txt_Airport_shipment: "",
        txt_Date_arrivel: "",
        txt_Time_arrival: "",
        txt_First_port_of_Arrivel: "",
        
      });
      setValidated(true);
      setNotedfy(false);
    }else{
      setValues({
        drp_countryId: "",
        drp_filtrBYorginID: "",
        drp_getAllOrigin: -1,
        drp_orginID: "",
        txt_igm_id: 0,
        txt_igm_No: "",
        txt_Airlines_name: "",
        txt_Flight_Number: "",
        txt_Airport_arrival: "",
        txt_Airport_shipment: "",
        txt_Date_arrivel: "",
        txt_Time_arrival: "",
        txt_First_port_of_Arrivel: "",
        txt_Infomsg: e.message
      });
      setValidated(true);
      setNotedfy(true);
    }
    })
  }
  };
  // notificetion controller  
  const notefyClose = () => {
    setNotedfy(false);
  };

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
    let consigmentId = 0;
    OperationSrvces.getMAWBNOdata(event.target.value, consigmentId).then((res) => {
      setTblMAWBNO(res.data);
    }).catch((error) => {
      setValues({ txt_Infomsg: error.message })
      setTblMAWBNO([]);
    })
  };
  //change time of arrivel
  const HandleTimePickChange = (event) => {
    setValues({ ...values, txt_Time_arrival: event.target.value });
  };
  const DateChangeHandler = (event) => {
    setValues({ ...values, txt_Date_arrivel: event.target.value });
  };
  const ChangeIGMHandle = (e) => {
    setValues({ ...values, txt_igm_No: e.target.value });
  }
  const ChangeAirNameHandle = (e) => {
    setValues({ ...values, txt_Airlines_name: e.target.value });
  }

  const ChangeFlightNumberHandle = (e) => {
    setValues({ ...values, txt_Flight_Number: e.target.value });
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // const SelectedAllChangeHandler = (event) => {
  //   setCheckAll(event.target.checked)

  //   const AllMAWB = TblMAWBNO.map((mawb) => mawb.consigmentNo);

  //   console.log("MAWB ALL " + JSON.stringify(AllMAWB))

  // }
  // const SelectedChangeHandler=(event) =>{
  //   setSelected(event.target.checked)
  //   console.log("selected check = "+JSON.stringify());
  // }
  //To get to details parameterd and delete details then get invoice num
  const editIGM = (igm) => {
    setValues({
      txt_igm_id: igm.igm_id,
      txt_igm_No: igm.igm_no,
      txt_Airlines_name: igm.airlinesName,
      txt_Airport_shipment: igm.airPortofShipment,
      txt_Flight_Number: igm.flightNo,
      txt_Airport_arrival: igm.airPortofArrivel,
      txt_Date_arrivel: igm.dateOfArivel,
      txt_Time_arrival: igm.timeofArrivel,
      txt_First_port_of_Arrivel: igm.firstPortOfArrivel,
    })
  }
  const getInvoiceBasedIgm = (igm) => {
    setValues({txt_igm_id:igm.igm_id})
 if(igm.igm_id===0){
   setValues({txt_Infomsg:"Select a igm"})
   setNotedfy(true);
 }else{
    OperationSrvces.getInvoiceBasedIgm(igm.igm_id).then(res =>{
      setViweTblInvoice(res.data);
      setNotedfy(false);
    }).catch(error=>{
      setValues({txt_Infomsg:error.message})
      setNotedfy(true);
    })
  }
    // setValues({
    //   txt_igm_id: igm,
    //   txt_igm_No: igm,
    //   txt_Airlines_name: igm,
    //   txt_Airport_shipment: igm,
    //   txt_Flight_Number: igm,
    //   txt_Airport_arrival: igm,
    //   txt_Date_arrivel: igm,
    //   txt_Time_arrival: igm,
    //   txt_First_port_of_Arrivel: igm,
    // })
  }
  //reset all parameters
  const reset = () => {
    setValues({
      drp_countryId: "",
      drp_filtrBYorginID: "",
      drp_getAllOrigin: -1,
      drp_orginID: "",
      txt_igm_id: 0,
      txt_igm_No: "",
      txt_Airlines_name: "",
      txt_Flight_Number: "",
      txt_Airport_arrival: "",
      txt_Airport_shipment: "",
      txt_Date_arrivel: "",
      txt_Time_arrival: "",
      txt_First_port_of_Arrivel: "",
      txt_Infomsg: ""
    });
    setMAWB_No({MAWBNO:""})
    setDrpOrgin([])
    setInvoice([]);
    setNotedfy(false);
    setValide(false);
    setValidated(false);
  }
  //isDisbale on igm id never pass 
  const isDisable = () => {
    if (values.txt_igm_id === 0 || !values.txt_igm_id) {
      return true
    } else {
      return false
    }
  };
  //is not Disable on igm id pass
  const submit = () => {
    if (values.txt_igm_id === 0 || !values.txt_igm_id) {
      return false
    } else {
      return true
    }
  };

  const AllMAWBHandle = (event) => {
    if (event.target.checked) {
      const ALLMawb = TblMAWBNO.map((n) => n.consigmentNo);
      setSelected(ALLMawb);
      console.log("eeb = "+ALLMawb);
      setMAWB_No({MAWBNO:ALLMawb})
      return;
    }
    setSelected([]);
  };

  const SlectedMAWBClick = (event, consigmentNo) => {
    const selectedIndex = selected.indexOf(consigmentNo);
    let SelectedMawb = [];

    if (selectedIndex === -1) {
      SelectedMawb = SelectedMawb.concat(selected, consigmentNo);
      console.log("===-1 " + SelectedMawb)
      setMAWB_No({MAWBNO:SelectedMawb})
    }
    else if (selectedIndex === 0) {
      SelectedMawb = SelectedMawb.concat(selected.slice(1));
      console.log(" " + SelectedMawb)
      setMAWB_No({MAWBNO:SelectedMawb})
    }
    else if (selectedIndex === selected.length - 1) {
      SelectedMawb = SelectedMawb.concat(selected.slice(0, -1));
      console.log("length-1 " + SelectedMawb)
      setMAWB_No({MAWBNO:SelectedMawb})
    }
    else if (selectedIndex > 0) {
      SelectedMawb = SelectedMawb.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1),);
      console.log(">0 " + SelectedMawb)
      setMAWB_No({MAWBNO:SelectedMawb})
    }

    setSelected(SelectedMawb);
  };
  const AllInvoiceHandle = (event) => {
    if (event.target.checked) {
      const ALLInvoice = tblInvoice.map((n) => n.invoiceid);
      setSelectedInvoice(ALLInvoice);
      console.log("eeb = "+ALLInvoice);
      setInvoiceValue({InvoiceId:ALLInvoice})
      return;
    }
    setSelectedInvoice([]);
  };
  const AllInvoiceBasedIgmHandle = (event) => {
    if (event.target.checked) {
      const ALLInvoice = ViweTblInvoice.map((n) => n.invoiceid);
      setSelectedInvoice(ALLInvoice);
      console.log("eeb = "+ALLInvoice);
      setInvoiceValue({InvoiceId:ALLInvoice})
      return;
    }
    setSelectedInvoice([]);
  };

  const SlectedInvoiClick = (event, invoiceid) => {
    const selectedIndex = selectedInvoice.indexOf(invoiceid);
    let SelectedInvc= [];

    if (selectedIndex === -1) {
      SelectedInvc = SelectedInvc.concat(selectedInvoice, invoiceid);
      console.log("===-1 " + SelectedInvc)
      setInvoiceValue({InvoiceId:SelectedInvc})
    }
    else if (selectedIndex === 0) {
      SelectedInvc = SelectedInvc.concat(selectedInvoice.slice(1));
      console.log(" " + SelectedInvc)
      setInvoiceValue({InvoiceId:SelectedInvc})
    }
    else if (selectedIndex === selectedInvoice.length - 1) {
      SelectedInvc = SelectedInvc.concat(selectedInvoice.slice(0, -1));
      console.log("length-1 " + SelectedInvc)
      setInvoiceValue({InvoiceId:SelectedInvc})
    }
    else if (selectedIndex > 0) {
      SelectedInvc = SelectedInvc.concat(selectedInvoice.slice(0, selectedIndex), selectedInvoice.slice(selectedIndex + 1),);
      console.log(">0 " + SelectedInvc)
      setInvoiceValue({InvoiceId:SelectedInvc})
    }

    setSelectedInvoice(SelectedInvc);
  };
  const isMAWBSelected = (consigmentNo) => selected.indexOf(consigmentNo) !== -1;
  const isInvoiceSelected = (invoiceid) => selectedInvoice.indexOf(invoiceid) !== -1;
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
                <InputLabel >Country</InputLabel>
                <Select error={valide} required className={classes.formOption}
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
                <InputLabel >Filter by Origin</InputLabel>
                <Select error={valide} required className={classes.formOption}
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
                IGM-GENERATION
              </Typography>
            </Toolbar>
          </div>
          <CardGroup className={classes.cardGroup}>
            {/*1st table */}
            <Card border="dark" className={classes.card}>
            {hideIgm ? <div> <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table" size="small">
                  <TableHead>
                    <TableRow>
                        <TableCell padding="checkbox">
                          <Checkbox
                            indeterminate={selected.length}
                            checked={selected.length}
                            onChange={AllMAWBHandle}
                            inputProps={{ 'aria-label': 'select all desserts' }}
                          />
                        </TableCell>
                      <TableCell>Sl.no</TableCell>
                      <TableCell >MAWB.No</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      TblMAWBNO.map((MAWB) => {
                        const checkSelcted = isMAWBSelected(MAWB.consigmentNo);
                        return(
                        <TableRow hover key={MAWB.consigmentId}
                          onClick={(event) => SlectedMAWBClick(event, MAWB.consigmentNo)}
                          role="checkbox"
                          aria-checked={checkSelcted}
                          tabIndex={-1}
                          selected={checkSelcted}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={checkSelcted}
                            />
                          </TableCell>
                          <TableCell >{MAWB.sl_no}</TableCell>
                          <TableCell>{MAWB.consigmentNo}</TableCell>
                        </TableRow>
                       ) })}
                  </TableBody>
                </Table>
              </TableContainer>
              </div> : null}
            </Card>
            {/* input values  */}
            <Card border="dark" className={classes.CardForm}>
              <Card.Body>
                <Form noValidate validated={validated} style={{marginTop:"-10px"}}>
                  <Row xs={2}>
                    <Form.Group md="1"  >
                      <Form.Label>IGM.NO*</Form.Label>
                      <Form.Control size="sm" required value={values.txt_igm_No} onChange={ChangeIGMHandle} />
                      <Form.Control.Feedback type="invalid" >
                        Please enter aIGM.NO
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group md="1">
                      <Form.Label>Airport of Shipment*</Form.Label>
                      <Form.Control size="sm" required value={values.txt_Airport_shipment} onChange={ChangeAirShipmentHandle} />
                      <Form.Control.Feedback type="invalid" >
                        Please enter a Airport of Shipment.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row xs={2}>
                    <Form.Group md="3"   >
                      {/************************************ */}
                      <Form.Label>Airlins Name*</Form.Label>
                      <Form.Control size="sm" required value={values.txt_Airlines_name} onChange={ChangeAirNameHandle} />
                      <Form.Control.Feedback type="invalid" >
                        Please enter a Airlines Name.
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group md="3"   >
                      {/************************************ */}
                      <FormControl required className={classes.formControl}>
                        <TextField error={valide}   
                          label="Date of Arrivel"
                          type="date"
                          required
                          value={values.txt_Date_arrivel}
                          onChange={DateChangeHandler}
                          className={classes.textField}
                          InputLabelProps={{ shrink: true, }}
                        />
                      </FormControl>
                    </Form.Group>
                  </Row>
                  <Row xs={2}>
                    <Form.Group md="3"  >
                      {/************************************ */}
                      <Form.Label>FlightNumber*</Form.Label>
                      <Form.Control size="sm" required value={values.txt_Flight_Number} onChange={ChangeFlightNumberHandle} />
                      <Form.Control.Feedback type="invalid" >
                        Please enter a FlightNumber.
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group md="3"  >
                      {/************************************ */}
                      <FormControl required className={classes.formControl}>
                        <TextField error={valide}
                          id="time"
                          label="TimeOfArrivel"
                          type="time"
                          required
                          value={values.txt_Time_arrival}
                          onChange={HandleTimePickChange}
                          className={classes.textField}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          inputProps={{
                            step: 300, // 5 min
                          }}
                        />
                      </FormControl>
                    </Form.Group>
                  </Row>
                  <Row xs={2}>
                    <Form.Group md="3" >
                      {/************************************ */}
                      <Form.Label>Airport of Arivel*</Form.Label>
                      <Form.Control size="sm" required value={values.txt_Airport_arrival} onChange={ChangeAirPortArivelHandle} />
                      <Form.Control.Feedback type="invalid" >
                        Please enter a Airport of Arivel.
                      </Form.Control.Feedback>
                      {/************************************ */}
                    </Form.Group>
                    <Form.Group md="3" >
                      <Form.Label>First Airport of Arivel</Form.Label>
                      <Form.Control size="sm" value={values.txt_First_port_of_Arrivel} onChange={ChangeFirstAirArrivelHandle} />
                      <Form.Control.Feedback type="invalid" >
                        Please enter a Airport of Shipment.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}
                    open={notefy} autoHideDuration={6000} message={values.txt_Infomsg}
                    action={
                      <IconButton size="small" aria-label="close" color="inherit" onClick={notefyClose}>
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    } />
                 {hideIgm ? <div><ButtonGroup bsPrefix>
                    <Button className=" p-1" onClick={LoadInvoice}>Load Invoice</Button>
                    <Button className=" p-1" disabled={submit()} onClick={IGMSave}>Save IGM</Button>
                    <Button className=" p-1" onClick={reset}>Rest ALL</Button>
                    <Button className=" p-1" disabled={isDisable()} onClick={IGM_update}>Update IGM</Button>
                    <Button className="btn btn-danger p-1" disabled={isDisable()} onClick={IGM_delete}>Delet IGM</Button>
                    <Button className="btn-denger p-1" onClick={AssignIgm}>Assign igm.no for invoive</Button>
                  {/* */}
                </ButtonGroup> </div> :null}
                </Form>
      {/************** IGM Table ******************/}
                
      {hideIgm ? <Card> <TableContainer className={classes.igmtable}>
                  <Table stickyHeader size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">Sl.no</TableCell>
                        <TableCell align="left">IGM.No</TableCell>
                        <TableCell align="left">Flight.No</TableCell>
                        <TableCell align="left">AirlinesName</TableCell>
                        <TableCell align="left">AirPortOfArrivel</TableCell>
                        <TableCell align="left">AirPortOfShipment</TableCell>
                        <TableCell align="left">DateOfArrivel</TableCell>
                        <TableCell align="left">TimeOfArrivel</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody >
                      {tblIGM.map((igm) =>(
                        <TableRow hover key={igm.igm_id} onClick={() => editIGM(igm)}>
                          <TableCell align="center">{igm.sl_No}</TableCell>
                          <TableCell align="center">{igm.igm_no}</TableCell>
                          <TableCell align="center">{igm.flightNo}</TableCell>
                          <TableCell align="center">{igm.airlinesName}</TableCell>
                          <TableCell align="center">{igm.airPortofArrivel}</TableCell>
                          <TableCell align="center">{igm.airPortofShipment}</TableCell>
                          <TableCell align="center">{igm.dateOfArivel}</TableCell>
                          <TableCell align="center">{igm.timeofArrivel}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Divider />
                <Card.Footer className="form-inline">
                <Button className="p-1"  onClick={viewIgmDetails}>view igm details</Button> 
                <TablePagination
                  rowsPerPageOptions={[10, 15]}
                  component="div"
                  count={tblIGM.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
                </Card.Footer>
                </Card> :null}
                  {showViweIGM ? <Card className={classes.ViewIGMtblCard}>
                  <Card.Header>
                  <AiFillCloseSquare size="20" onClick={closeCard} />
                  </Card.Header> 
                <TableContainer className={classes.viweIGM}>
                  <Table stickyHeader size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">Sl.no</TableCell>
                        <TableCell align="left">IGM.No</TableCell>
                        <TableCell align="left">Flight.No</TableCell>
                        <TableCell align="left">AirlinesName</TableCell>
                        <TableCell align="left">AirPortOfArrivel</TableCell>
                        <TableCell align="left">AirPortOfShipment</TableCell>
                        <TableCell align="left">DateOfArrivel</TableCell>
                        <TableCell align="left">TimeOfArrivel</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody >
                      {ViewTblIGM.map((igm) =>(
                        <TableRow hover key={igm.igm_id} onClick={() => getInvoiceBasedIgm(igm)}>
                          <TableCell align="center">{igm.sl_No}</TableCell>
                          <TableCell align="center">{igm.igm_no}</TableCell>
                          <TableCell align="center">{igm.flightNo}</TableCell>
                          <TableCell align="center">{igm.airlinesName}</TableCell>
                          <TableCell align="center">{igm.airPortofArrivel}</TableCell>
                          <TableCell align="center">{igm.airPortofShipment}</TableCell>
                          <TableCell align="center">{igm.dateOfArivel}</TableCell>
                          <TableCell align="center">{igm.timeofArrivel}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Divider />
                <div className="form-inline">
                <Button className="p-1"  onClick={remove_igm}>remove igm</Button> 
                <TablePagination
                  rowsPerPageOptions={[10, 15]}
                  component="div"
                  count={tblIGM.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
                </div>
                </Card> :null}
              </Card.Body>
            </Card>
            {/* Invoice Table  */}
            <Card border="dark" className={classes.card}>
            {hideIgm ? <div>
              <TableContainer className={classes.INVOICEcontainer}>
                <Table stickyHeader size="small">
                  <TableHead>
                    <TableRow>
                    <TableCell padding="checkbox">
                          <Checkbox
                            indeterminate={selectedInvoice.length}
                            checked={selectedInvoice.length}
                            onChange={AllInvoiceHandle}
                            inputProps={{ 'aria-label': 'select all desserts' }}
                          />
                        </TableCell>
                      <TableCell align="left">Sl.no</TableCell>
                      <TableCell align="left">Invoice.No</TableCell>
                      <TableCell align="left">IGM.No</TableCell>
                      <TableCell align="left">MAWB.No</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody style={{ overflowY: "scroll" }}>
                    {tblInvoice.map((invoices) =>  {
                         const SelctedInvoice = isInvoiceSelected(invoices.invoiceid);
                         return(
                      <TableRow hover key={invoices.invoiceid}
                      onClick={(event) => SlectedInvoiClick(event, invoices.invoiceid)}
                      role="checkbox"
                      aria-checked={SelctedInvoice}
                      tabIndex={-1}
                      selected={SelctedInvoice}
                      >
                         <TableCell padding="checkbox">
                            <Checkbox checked={SelctedInvoice}/>
                          </TableCell>
                        <TableCell align="left">{invoices.sl_No}</TableCell>
                        <TableCell align="left">{invoices.invoiceNumber}</TableCell>
                        <TableCell align="left">{invoices.igm_no}</TableCell>
                        <TableCell align="left">{invoices.mawbNo}</TableCell>
                      </TableRow>
                    )})}
                  </TableBody>
                </Table>
              </TableContainer>
              </div> :null}
            {showViweIGM ? <Card className={classes.ViweINVOICEcard}>
              <TableContainer className={classes.ViweINVOICEcontainer}>
                <Table stickyHeader size="small">
                  <TableHead>
                    <TableRow>
                    <TableCell padding="checkbox">
                          <Checkbox
                            indeterminate={selectedInvoice.length}
                            checked={selectedInvoice.length}
                            onChange={AllInvoiceBasedIgmHandle}
                            inputProps={{ 'aria-label': 'select all desserts' }}
                          />
                        </TableCell>
                      <TableCell align="left">Sl.no</TableCell>
                      <TableCell align="left">Invoice.No</TableCell>
                      <TableCell align="left">IGM.No</TableCell>
                      <TableCell align="left">MAWB.No</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody style={{ overflowY: "scroll" }}>
                    {ViweTblInvoice.map((invoices) =>  {
                         const SelctedInvoice = isInvoiceSelected(invoices.invoiceid);
                         return(
                      <TableRow hover key={invoices.invoiceid}
                      onClick={(event) => SlectedInvoiClick(event, invoices.invoiceid)}
                      role="checkbox"
                      aria-checked={SelctedInvoice}
                      tabIndex={-1}
                      selected={SelctedInvoice}
                      >
                         <TableCell padding="checkbox">
                            <Checkbox checked={SelctedInvoice}/>
                          </TableCell>
                        <TableCell align="left">{invoices.sl_No}</TableCell>
                        <TableCell align="left">{invoices.invoiceNumber}</TableCell>
                        <TableCell align="left">{invoices.igm_no}</TableCell>
                        <TableCell align="left">{invoices.mawbNo}</TableCell>
                      </TableRow>
                    )})}
                  </TableBody>
                </Table>
              </TableContainer>
              </Card> :null}
            </Card>
          </CardGroup>
        </body>
      </div>
    </div>
  );
}

export default IGMgenaretion;

/*
*/