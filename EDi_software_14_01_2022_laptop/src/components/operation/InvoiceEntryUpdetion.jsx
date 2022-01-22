import React, { useState, useEffect } from 'react';
import {
    InputLabel, Typography, Toolbar,
    makeStyles, Table, TableBody, TableCell, TableHead, TableRow, TableContainer,
    FormControl, Select, Backdrop, Snackbar, IconButton
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { AiFillCloseSquare } from 'react-icons/ai';
import Sidebar from '../menus/Sidebar'
import { Form, Card, Row, Button, ButtonGroup, CardGroup } from "react-bootstrap";
import OperationSrvces from '../../sevices/operationServices/OperationSrvces';
import PlaceServices from '../../sevices/masterServices/PlaceServices';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer - 1,
        color: '#fff',
    },
    CardDrop: {
        zIndex: theme.zIndex.drawer - 1,
        color: 'black',
    },
    formControl: {
        margin: theme.spacing(1),
        height: "7vh",
        minWidth: 150,
        maxWidth: 200,
    },
    formMAwb: {
        height: "4vh",
        minWidth: 130,
        maxWidth: 150,
    },
    formSelect: {
        marginTop: theme.spacing(-3),
        marginLeft: theme.spacing(3),
        padding: theme.spacing(-3),
        minWidth: 150,
        maxWidth: 250,
    },
    container: {
        maxHeight: 520,
    },
    invoiceEntryContainer: {
        margin: theme.spacing(1),
        color: "black",
        width: "100%",
        height: 300,
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
        width: "77%"
    },
    CardForm: {
        minWidth: "38%",
    },
    code: {
        marginLeft: theme.spacing(1),
        height: "4vh",
        width: "54px",
    },
}));
function InvoiceEntryUpdetion(props) {
    const classes = useStyles();
    const [notefy, setNotedfy] = useState(false);
    const [validated, setValidated] = useState(false);
    const [drpOrigin, setDrpOrgin] = useState([]);
    const [TblMAWBNO, setTblMAWBNO] = useState([]);
    const [valide, setValide] = useState(false)
    const [openList, setListOpen] = useState(false);
    const [drpInvoice, setDrpInvoice] = useState([]);
    const [tblPkglist, setPkgList] = useState([])
    // const [selected, setSelected] = useState([])
    // const [inEditMode, setInEditMode] = useState(true);
    // const [wightValue, setwightValue] = useState(null);
    const [loading, setLoading] = useState(false);
    const [LodingUd, setLodingU_D] = useState(false);
    const [MawbValues, setMAWBValue] = useState({
        ip_Mawb: ""
    });
    const [values, setValues] = useState({
        txt_invoiceId: 0,
        txt_invoice_No: "",
        txt_totl_ctn: "",
        txt_invoice_value: "",
        txt_totl_wight: "",
        txt_Sender_name: "",
        txt_reciver_name: "",
        txt_sender_mobile: "",
        txt_reciver_mobile: "",
        txt_sender_addresh: "",
        txt_reciver_addresh: "",
        drp_filtrBYorginID: "",
        txt_Infomsg: ""
    });
    const [pkgInputFields, setTblPkgInField] = useState({
        txt_itemId: "",
        txt_itemName: "",
        tbl_itemValue:"",
        tbl_quantity:"",
        txt_invoiceValue: "",
        txt_quantity: "",
        txt_totalValue: "",
        tbl_totalValueAndQty:""
    })
    //get all dropdown values services
    const drpdata = async () => {
        let all = -1;
        PlaceServices.getOrginCompany(all).then((res) => {
            setDrpOrgin(res.data);
        }).catch(error => {
            setValues({ txt_Infomsg: error.message });
            setNotedfy(true)
        })
    };
    useEffect(() => {
        drpdata();
    }, []);
    //Insert MAWB serveces and get MAWB services
    const invoicUpdate = () => {
        setLodingU_D(true)
        let InvoiceDetails = {
            no_pcs: values.txt_totl_ctn, invoiceValue: values.txt_invoice_value, totalWight: values.txt_totl_wight, senderName: values.txt_Sender_name, receiverName: values.txt_reciver_name
            , senderMobil: values.txt_sender_mobile, receiverMobile: values.txt_reciver_mobile, senderAddress: values.txt_sender_addresh, receiverAddress: values.txt_reciver_addresh
        };
        if (!values.txt_invoiceId || values.txt_invoiceId === 0 || !values.txt_totl_ctn || !values.txt_invoice_value || !values.txt_totl_wight || !values.txt_Sender_name || !values.txt_reciver_name || !values.txt_sender_addresh || !values.txt_reciver_addresh) {
            setValues({
                txt_invoice_No: "",
                txt_totl_ctn: "",
                txt_invoice_value: "",
                txt_totl_wight: "",
                txt_Sender_name: "",
                txt_reciver_name: "",
                txt_sender_mobile: "",
                txt_reciver_mobile: "",
                txt_sender_addresh: "",
                txt_reciver_addresh: "",
                txt_Infomsg: ""
            });
            setLodingU_D(false)
            setNotedfy(false);
            setValide(true);
            setValidated(true);
        }
        else {
            OperationSrvces.UpdateInvoice(values.txt_invoiceId, InvoiceDetails).then((res) => {
                setValues({
                    txt_invoice_No: "",
                    txt_totl_ctn: "",
                    txt_invoice_value: "",
                    txt_totl_wight: "",
                    txt_Sender_name: "",
                    txt_reciver_name: "",
                    txt_sender_mobile: "",
                    txt_reciver_mobile: "",
                    txt_sender_addresh: "",
                    txt_reciver_addresh: "",
                    txt_Infomsg: res.data.message
                });
                setLodingU_D(false)
                setNotedfy(true);
                setValide(false);
                setValidated(false);
                OperationSrvces.getInvoiceNO(MawbValues.ip_Mawb).then((res) => {
                    setDrpInvoice(res.data);
                });
            }).catch((error) => {
                setValues({
                    txt_invoice_No: "",
                    txt_totl_ctn: "",
                    txt_invoice_value: "",
                    txt_totl_wight: "",
                    txt_Sender_name: "",
                    txt_reciver_name: "",
                    txt_sender_mobile: "",
                    txt_reciver_mobile: "",
                    txt_sender_addresh: "",
                    txt_reciver_addresh: "",
                    txt_Infomsg: error.message
                })
                setLodingU_D(false)
                setValidated(true);
                setNotedfy(true);
                setValide(true);
            })
        }
    };
    //updatePkgList
    const updatePkgList = () => {
        setLodingU_D(true);
        var totalItemValue = [];var totalItemId =[];var totalQuantity =[];
       const totolPkgList = tblPkglist.map((PkgList=>PkgList));
       console.log("LoopBefore "+JSON.stringify(totolPkgList));
     
        for(let i = 0 ; i < totolPkgList.length;i++){
            
            totalItemId = totalItemId.concat(totolPkgList[i].itemId); //5,10
            totalItemValue = totalItemValue.concat(totolPkgList[i].itemValue); //5,10
            totalQuantity = totalQuantity.concat(totolPkgList[i].quantity); //5,10
        }
        let invoicPackageList = { itemIdString: totalItemId.toString(), itemValueString: totalItemValue.toString(), quantityString: totalQuantity.toString()}
        console.log("totalpkglisDetails "+JSON.stringify(invoicPackageList));
        console.log("totalpkglisDetails "+JSON.stringify(values.txt_invoiceId));
        OperationSrvces.updatePackageList(values.txt_invoiceId, invoicPackageList).then(res => {
            setLodingU_D(false)
            let invoicTotlValues = 0;
            setValues({...values, txt_Infomsg: res.data.message });
            setNotedfy(true);
            OperationSrvces.getPackagList(values.txt_invoiceId).then(res => {
                const result = res.data;
                console.log("pkgListdata "+JSON.stringify(result));
                const ttlvlue = result.map((n) => n.totalValue);
                for (let i = 0; i < ttlvlue.length; i++) {
                    invoicTotlValues += (ttlvlue[i]);
                }
                setNotedfy(false);
                setTblPkgInField({...pkgInputFields,txt_totalValue: invoicTotlValues});
                setPkgList(res.data);
            })
           
        }).catch(error=>{
            setLodingU_D(false)
            setValues({...values, txt_Infomsg: error.message });
            setNotedfy(true);
        })
    };

    // notificetion controller  
    const notefyClose = () => {
        setNotedfy(false);
    };
  

    //open upload manifest 
    const ShowPackingList = () => {
        setLoading(true)
        if (!MawbValues.ip_Mawb) {
            setValues({ txt_Infomsg: "plese Select a MawbNo" })
            setLoading(false)
            setNotedfy(true)
        }
        else if (!values.txt_invoiceId || values.txt_invoiceId === 0) {
            setValues({...values,txt_Infomsg: "plese Select a Invoice.No" })
            setLoading(false)
            setNotedfy(true);
        }
        else {
            let invoicTotlValues = 0;
            setNotedfy(false);
            OperationSrvces.getPackagList(values.txt_invoiceId).then(res => {
                setLoading(false)
                const result = res.data;
                console.log("pkgListdata "+JSON.stringify(result));
                const ttlvlue = result.map((n) => n.totalValue);
                for (let i = 0; i < ttlvlue.length; i++) {
                    invoicTotlValues += (ttlvlue[i]);
                }
                setTblPkgInField({...pkgInputFields,txt_totalValue: invoicTotlValues});
                setPkgList(res.data);
                setListOpen(true);
            }).catch(error =>{
                setValues({...values, txt_Infomsg: "plese Select a Invoice.No" })
                setLoading(false)
                setNotedfy(true);
            })
        }
       
    }
    //closecard
    const closeCard = () => {
        setListOpen(false);
        setNotedfy(false);
    }
    // const editWight =()=>{ }
    //get MAWB_No services
    const HandleOriginChange = (event) => {
        setValues({ ...values, drp_filtrBYorginID: event.target.value })
        let cnsigmnt = 0;
        OperationSrvces.getMAWBNOdata(event.target.value, cnsigmnt).then((res) => {
            setTblMAWBNO(res.data);
        }).catch((error) => {
            setTblMAWBNO([]);
        })
    };
    //To get to details parameterd and delete details then get invoice num
    const editMAWBNO = (MAWB) => {
        setMAWBValue({ ip_Mawb: MAWB.consigmentNo })
        OperationSrvces.getInvoiceNO(MAWB.consigmentNo).then((res) => {
            setDrpInvoice(res.data);
        });
    };
    //To get to details parameterd and delete details then get invoice num
    const editInvoice = (invoices) => {
        setValues({
            txt_invoiceId: invoices.invoiceId,
            txt_invoice_No: invoices.invoice_No,
            txt_totl_ctn: invoices.no_pcs,
            txt_invoice_value: invoices.invoiceValue,
            txt_totl_wight: invoices.totalWight,
            txt_Sender_name: invoices.senderName,
            txt_reciver_name: invoices.receiverName,
            txt_sender_mobile: invoices.senderMobil,
            txt_reciver_mobile: invoices.receiverMobile,
            txt_sender_addresh: invoices.senderAddress,
            txt_reciver_addresh: invoices.receiverAddress,
        })
    };

    const changeInviceHandler = (event) => {
        setValues({ ...values, txt_invoice_No: event.target.value });
    }
    const changeTtlCtnHandler = (event) => {
        setValues({ ...values, txt_totl_ctn: event.target.value });
    }
    const ChangeInvoiceValueHandle = (event) => {
        setValues({ ...values, txt_invoice_value: event.target.value });
    }
    const ChangeTotlWgtHandle = (event) => {
        setValues({ ...values, txt_totl_wight: event.target.value });
    }
    const ChangeSenderNameHandle = (event) => {
        setValues({ ...values, txt_Sender_name: event.target.value });
    }
    const ChangeReciverNameHandle = (event) => {
        setValues({ ...values, txt_reciver_name: event.target.value });
    }
    const ChangeSenderMobileHandle = (event) => {
        setValues({ ...values, txt_sender_mobile: event.target.value });
    }
    const ChangeReciverMobileHandle = (event) => {
        setValues({ ...values, txt_reciver_mobile: event.target.value });
    }
    const AddreshSenderAddreshHandler = (event) => {
        setValues({ ...values, txt_sender_addresh: event.target.value });
    }
    const ChangeReciverAddreshHandler = (event) => {
        setValues({ ...values, txt_reciver_addresh: event.target.value });
    }
    const ChangeInvoiceHandle = (event) => {
        setValues({ ...values, txt_invoice_No: event.target.value });
    }
    const ChangeConsigmntHandelr = (event) => {
        setMAWBValue({ ip_Mawb: event.target.value });
    }
    
    // const HandleChanger = (event) => {
    //     setTblPkgInField({...pkgInputFields,txt_invoiceValue:event.target.value})
    // }

    //reset all parameters
    const reset = () => {
        setValues({
            txt_invoiceId: 0,
            txt_invoice_No: "",
            txt_totl_ctn: "",
            txt_invoice_value: "",
            txt_totl_wight: "",
            txt_Sender_name: "",
            txt_reciver_name: "",
            txt_sender_mobile: "",
            txt_reciver_mobile: "",
            txt_sender_addresh: "",
            txt_reciver_addresh: "",
            drp_filtrBYorginID: "",
        });
        setNotedfy(false);
        setValide(false);
        setValidated(false);
    }
    // const WightChangeHandler = (event) => {
    //     setwightValue(event.target.value)
    //     const SelectedWight=[];
    //        const editedeWight = SelectedWight.concat(event.target.value);
    //         console.log("===-1 " + editedeWight)
    // }
    const ChangeTblItemValueHandler = (event) => {
        console.log("id & pkgkitem - "+JSON.stringify(event.target.value));
        console.log("index name- "+JSON.stringify(event.target.name));
        //add logic 
        var Temp_tblPkglist = tblPkglist;
        var index = event.target.name;
        
        Temp_tblPkglist[index].itemValue=event.target.value;
        var tempvalue =Temp_tblPkglist[index]; 
        //Multiple ItemValue and Qty
        Temp_tblPkglist[index].totalValue = Temp_tblPkglist[index].quantity*Temp_tblPkglist[index].itemValue;
        
      //Addition All Qty*ItemValue
      var invoicTotlValues = 0;
      const ttlvlue = Temp_tblPkglist.map((n) => n.totalValue);
      for (let i = 0; i < ttlvlue.length; i++) {
          invoicTotlValues += (ttlvlue[i]);
      }
         setTblPkgInField({...pkgInputFields,tbl_itemValue:tempvalue,
            txt_totalValue:invoicTotlValues})
    };
    const ChangeTblQuantityHandler = (event) => {
        console.log("id & pkgkitem - "+JSON.stringify(event.target.value));
        console.log("index name- "+JSON.stringify(event.target.name));
        //add logic 
        var Temp_tblPkglist = tblPkglist;
        var index = event.target.name;

        Temp_tblPkglist[index].quantity=event.target.value; 
        var tempvalue =Temp_tblPkglist[index];
         //Multiple ItemValue and Qty
         Temp_tblPkglist[index].totalValue = Temp_tblPkglist[index].quantity*Temp_tblPkglist[index].itemValue;
        
         //Addition All Qty*ItemValue
         var invoicTotlValues = 0;
         const ttlvlue = Temp_tblPkglist.map((n) => n.totalValue);
         for (let i = 0; i < ttlvlue.length; i++) {
             invoicTotlValues += (ttlvlue[i]);
         }
         setTblPkgInField({...pkgInputFields,tbl_quantity:tempvalue,
            txt_totalValue:invoicTotlValues})
    };

    return (
        <div>
            <div>
                <Sidebar />
            </div>
            <div>
                <body className="">
                    <div className="navbarss">
                        <Toolbar>
                            <FormControl required className={classes.formSelect}>
                                <InputLabel >Filter by Origin</InputLabel>
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
                        {/*input values */}
                        <Card border="dark" className={classes.CardForm}>
                            <Card.Body>
                                <Form noValidate validated={validated}>
                                    <Row xs={2}>
                                        <Form.Group md="1">
                                            <Form.Label>InvoiceNumber</Form.Label>
                                            <Form.Control size="sm" readOnly value={values.txt_invoice_No} onChange={changeInviceHandler} />

                                        </Form.Group>
                                        {/*  */}
                                        <Form.Group md="1">
                                            <Form.Label>TotalCtn</Form.Label>
                                            <Form.Control size="sm" required value={values.txt_totl_ctn} onChange={changeTtlCtnHandler} />

                                        </Form.Group>
                                    </Row>
                                    {/*  */}
                                    <Row xs={2}>
                                        <Form.Group md="1">
                                            <Form.Label>InvoiceValue</Form.Label>
                                            <Form.Control size="sm" required value={values.txt_invoice_value} onChange={ChangeInvoiceValueHandle} />

                                        </Form.Group>
                                        <Form.Group md="1">
                                            <Form.Label>TotalWgt</Form.Label>
                                            <Form.Control size="sm" required value={values.txt_totl_wight} onChange={ChangeTotlWgtHandle} />

                                        </Form.Group>
                                    </Row>
                                    {/*  */}
                                    <Row xs={2}>
                                        <Form.Group md="1">
                                            <Form.Label>Sender Name</Form.Label>
                                            <Form.Control size="sm" required value={values.txt_Sender_name} onChange={ChangeSenderNameHandle} />
                                        </Form.Group>
                                        <Form.Group md="1">
                                            <Form.Label>Receiver Name</Form.Label>
                                            <Form.Control size="sm" required value={values.txt_reciver_name} onChange={ChangeReciverNameHandle} />
                                        </Form.Group>
                                    </Row>
                                    {/*  */}
                                    <Row xs={2}>
                                        <Form.Group md="1">
                                            <Form.Label>Sender Mobile</Form.Label>
                                            <Form.Control size="sm" required value={values.txt_sender_mobile} onChange={ChangeSenderMobileHandle} />

                                        </Form.Group>
                                        <Form.Group md="1">
                                            <Form.Label>Reciver Mobile</Form.Label>
                                            <Form.Control size="sm" required value={values.txt_reciver_mobile} onChange={ChangeReciverMobileHandle} />

                                        </Form.Group>
                                    </Row>
                                    {/*  */}
                                    <Row xs={2}>
                                        <Form.Group md="2">
                                            <Form.Label >Sender Addresh</Form.Label>
                                            <Form.Control as="textarea" value={values.txt_sender_addresh}
                                                onChange={AddreshSenderAddreshHandler} rows={2} placeholder="Addresh" />
                                        </Form.Group>
                                        <Form.Group md="2" >
                                            <Form.Label >Reciver Addresh</Form.Label>
                                            <Form.Control as="textarea" value={values.txt_reciver_addresh}
                                                onChange={ChangeReciverAddreshHandler} rows={2} placeholder="Addresh" />
                                        </Form.Group>
                                    </Row>

                                    <Backdrop className={classes.CardDrop} open={openList} >
                                        <Card border="primary"
                                            bg={'Dark'}>
                                            <Card.Header ><h5 className="form-inline justify-between">Package List<AiFillCloseSquare size="20" onClick={closeCard} /></h5></Card.Header>
                                            <Card.Body>
                                                <Row xs={4}>
                                                    <Form.Group md="2">
                                                        <Form.Label style={{ color: "black" }}>Invoice.No</Form.Label>
                                                        <Form.Control size="sm" readOnly value={values.txt_invoice_No} onChange={ChangeInvoiceHandle} />
                                                    </Form.Group>
                                                    <Form.Group md="4" >
                                                        <Form.Label style={{ color: "black" }}>Consigment.No</Form.Label>
                                                        <Form.Control size="sm" readOnly value={MawbValues.ip_Mawb} onChange={ChangeConsigmntHandelr} />
                                                    </Form.Group>
                                                </Row>
                                                <TableContainer className={classes.invoiceEntryContainer}>
                                                    <Table stickyHeader aria-label="sticky table" size="small">
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell>Sl.no</TableCell>
                                                                <TableCell >Item Name</TableCell>
                                                                <TableCell >Item Value</TableCell>
                                                                <TableCell >Quantity</TableCell>
                                                                <TableCell >Qty*ItemValue</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {
                                                                tblPkglist.map((pkglis,i) => {
                                                                    return (
                                                                        <TableRow hover key={pkglis.itemId}>
                                                                            <TableCell >{pkglis.sl_no}</TableCell>
                                                                            <TableCell>{pkglis.item}</TableCell>
                                                                            <TableCell >
                                                                                    <input size="sm" name={i} value={pkglis.itemValue} onChange={ChangeTblItemValueHandler} />
                                                                            </TableCell>
                                                                                <TableCell>
                                                                                <input size="sm" name={i} value={pkglis.quantity} onChange={ChangeTblQuantityHandler}  />
                                                                                </TableCell>
                                                                            <TableCell>{pkglis.totalValue}</TableCell>
                                                                        </TableRow>
                                                                    )
                                                                })}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                                <Row xs={6} >
                                                    <Form.Group md="6" className="form-inline">
                                                        <Form.Label style={{ color: "black" }}>InvoiceValue</Form.Label>
                                                        <Form.Control size="sm" readOnly value={values.txt_invoice_value}  />
                                                    </Form.Group>
                                                    <Form.Group md="1" className="form-inline mx-3" >
                                                        <Form.Label style={{ color: "black" }}>InvoiceWight</Form.Label>
                                                        <Form.Control size="sm" readOnly value={values.txt_totl_wight}  />
                                                    </Form.Group >
                                                   
                                                        <Button className="btn btn-info p-1" onClick={updatePkgList} disabled={LodingUd}>{LodingUd ? 'Loading...' : 'update'}</Button>
                                                    
                                                    <Form.Group md="1" className="form-inline">
                                                        <Form.Label style={{ color: "black" }}>TotalInvoiceValue</Form.Label>
                                                        <Form.Control size="sm" readOnly value={pkgInputFields.txt_totalValue}/>
                                                    </Form.Group>
                                                </Row>
                                            </Card.Body>
                                        </Card>
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
                                        <Button className="p-1" onClick={ShowPackingList} disabled={LodingUd}>{loading ? 'Loading...' : 'Packing List'}</Button>
                                        <Button className="btn btn-info p-1" onClick={invoicUpdate} disabled={LodingUd}>{LodingUd ? 'Loading...' : 'update'}</Button>
                                        <Button className="btn btn-info p-1" onClick={reset}>Rest</Button>
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
                                            <TableCell align="left">Sl.no</TableCell>
                                            <TableCell align="left">Invoice.No</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody style={{ overflowY: "scroll" }} >
                                        {drpInvoice.map((invoices) => (
                                            <TableRow hover key={invoices.invoiceId} onClick={() => editInvoice(invoices)}>
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

export default InvoiceEntryUpdetion;