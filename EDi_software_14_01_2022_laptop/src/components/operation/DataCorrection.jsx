import React, { useState } from 'react';
import {
    makeStyles, IconButton, Snackbar,
    Table, TableBody, TableCell, TableHead, TableRow, TableContainer
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { ButtonGroup, Button, Card, Form, Row, InputGroup } from 'react-bootstrap';
import Sidebar from '../menus/Sidebar';
import OperationSrvces from '../../sevices/operationServices/OperationSrvces';
import { AiFillCloseSquare } from 'react-icons/ai';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: "black",
        color: '#fff',
    },
    container: {
        margin: theme.spacing(1),
        width: "76%",
        height: 250,
        border: "1px solid black",
        boxSizing: "border-box "
    },
    card: {
        minWidth: "90%",
        maxWidth: "100%",

    },
    invoiceEntryContainer: {
        margin: theme.spacing(1),
        color: "black",
        width: "100%",
        height: 100,
    },
}));
function DataCorrection(props) {
    const classes = useStyles();
    const [notefy, setNotedfy] = useState(false);
    const [showWight, setShowWgt] = useState(true);
    const [showItmVlu, setShowItmVlu] = useState(false);
    const [showPkgList, setShowPkgList] = useState(false);
    const [openPking ,setOpenPking] = useState(false);
    const [showBanedList, setShowBanedList] = useState(false);
    const [product, setProduct] = useState([])
    const [tblPkglist, setPkgList] = useState([])
    const [summeryValues, setSummarryValues] = useState({
        txt_total_invoice: "",
        txt_total_items: "",
        txt_total_Wight: ""
    })
    const [values, setValues] = useState({
        consigmentNo: "",
        pkg_invoiceVlue:"",
        pkg_Wight:"",
        txt_invoiceId:"",
        txt_DataCrction: "Wight",
        txt_Range: "",
        txt_ttlWgt: "",
        txt_infoMassage: ""
    });
    const [pkgInputFields, setTblPkgInField] = useState({
        tbl_itemValue:"",
        tbl_quantity:"",
        txt_invoiceValue: "",
        txt_ttlWgt:"",
        txt_totalValue: "",
    })
    const filterMAWB = () => {
        if (!values.consigmentNo || values.consigmentNo === 0) {
            setValues({
                txt_infoMassage: "Enter a Consigment.No",
                consigmentNo: "",
                txt_DataCrction: "Wight",
                txt_Range: "",
                txt_ttlWgt: ""
            });
            setNotedfy(true)
        }
        else {
            OperationSrvces.getSUMMARY(values.consigmentNo).then(res => {
                const summary = res.data;           
                    setSummarryValues({
                       txt_total_invoice: summary.map(SummaryData => SummaryData.sm_totalInvoice),
                       txt_total_items:summary.map(SummaryData => SummaryData.sm_totalCarton) ,
                       txt_total_Wight: summary.map(SummaryData => SummaryData.sm_totalWight),
                    })
                
            })
            if (values.txt_DataCrction === "Wight") {
                setProduct([]);
                setShowWgt(true)
                setShowItmVlu(false)
                setShowPkgList(false)
                setShowBanedList(false)
                if (!values.txt_Range) {
                    setValues({
                       ...values, txt_infoMassage: "enter a Range",
                    });
                    setNotedfy(true);
                }
                else {
                    OperationSrvces.getDataCorrectionForWight(values.consigmentNo, values.txt_Range).then(res => {
                        setProduct(res.data);
                    });
                }
            }
            else if (values.txt_DataCrction === "ItemValue") {
                setProduct([]);
                setShowWgt(false)
                setShowItmVlu(true)
                setShowPkgList(false)
                setShowBanedList(false)
                let InvoiceItems = { consigmentNo: values.consigmentNo, invoice_No: "-1" };
                OperationSrvces.getDataCorrectionForItemValue(InvoiceItems).then(res => {
                    setProduct(res.data);
                });
            }
            else if (values.txt_DataCrction === "PkgList") {
                setProduct([]);
                setShowWgt(false)
                setShowItmVlu(false)
                setShowPkgList(true)
                setShowBanedList(false)
                let filterValue = -1;
                OperationSrvces.getDataCorrectionpkgList(values.consigmentNo, filterValue).then(res => {
                   setProduct(res.data);
                });
            }
            else if (values.txt_DataCrction === "BannedItem") {
                setProduct([]);
                setShowWgt(false)
                setShowItmVlu(false)
                setShowPkgList(false)
                setShowBanedList(true)
                let filterValue = -1;
                OperationSrvces.getDataCorrectionpkgList(values.consigmentNo, filterValue).then(res => {
                    setProduct(res.data);
                });
            }
            else {
                setProduct([]);
                setValues({...values,
                    txt_infoMassage: "please select a Any one redio",
                })
                setNotedfy(true)
            }
        }
    };
     //UpdateCorection
     const UpdateCorection =()=>{
         
        if (!values.consigmentNo || values.consigmentNo === 0) {
            setValues({
                txt_infoMassage: "Enter a Consigment.No",
                consigmentNo: "",
                txt_DataCrction: "Wight",
                txt_Range: "",
                txt_ttlWgt: ""
            });
            setNotedfy(true)
        }
        else {            
            
            if (values.txt_DataCrction === "Wight") {
                setProduct([]);
                setShowWgt(true)
                setShowItmVlu(false)
                setShowPkgList(false)
                setShowBanedList(false)
                if (!values.txt_Range) {
                    setValues({
                       ...values, txt_infoMassage: "enter a Range",
                    });
                    setNotedfy(true);
                }
                else {
                    // OperationSrvces.getDataCorrectionForWight(values.consigmentNo, values.txt_Range).then(res => {
                    //     setProduct(res.data);
                    // });
                }
            }
            else if (values.txt_DataCrction === "ItemValue") {
                setProduct([]);
                setShowWgt(false)
                setShowItmVlu(true)
                setShowPkgList(false)
                setShowBanedList(false)
                // let InvoiceItems = { consigmentNo: values.consigmentNo, invoice_No: "-1" };
                // OperationSrvces.getDataCorrectionForItemValue(InvoiceItems).then(res => {
                //     setProduct(res.data);
                // });
            }
            else if (values.txt_DataCrction === "PkgList") {
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
                     setValues({...values, txt_Infomsg: res.data.message });
                     setNotedfy(true);
                     let filterValue = -1;
                     OperationSrvces.getDataCorrectionpkgList(values.consigmentNo, filterValue).then(res => {
                        setProduct(res.data);
                        setShowWgt(false)
                    setShowItmVlu(false)
                    setShowPkgList(true)
                    setShowBanedList(false)
                    setOpenPking(false);
                     });  
                 }).catch(error=>{
                     setValues({...values, txt_Infomsg: error.message });
                     setNotedfy(true);
                 })
              
            }
            else if (values.txt_DataCrction === "BannedItem") {
                // let filterValue = -1;
                // OperationSrvces.getDataCorrectionpkgList(values.consigmentNo, filterValue).then(res => {
                //     setProduct(res.data);
                    
                // });
            }
            else {
                setProduct([]);
                setValues({...values,
                    txt_infoMassage: "please select a Any one redio",
                })
                setNotedfy(true)
            }
        }
    }
    //onDubleClickEvent
    const OpenPkgingList=(pkgList)=>{
        setValues({...values,txt_invoiceId:pkgList.invoiceId})
        if (!values.consigmentNo) {
            setValues({ txt_Infomsg: "plese Select a MawbNo" })
            setNotedfy(true)
        }
        else {
            let invoicTotlValues = 0;
            setNotedfy(false);
            setShowPkgList(false)
            setOpenPking(true);
            OperationSrvces.getPackagList(pkgList.invoiceId).then(res => {
                const result = res.data;
                console.log("pkgListdata "+JSON.stringify(result));
                const ttlvlue = result.map((n) => n.totalValue);
                for (let i = 0; i < ttlvlue.length; i++) {
                    invoicTotlValues += (ttlvlue[i]);
                }
                setTblPkgInField({...pkgInputFields,txt_totalValue: invoicTotlValues,
                    txt_invoiceValue:pkgList.invoiceValue,
                   txt_ttlWgt:pkgList.totalWight});
                setPkgList(res.data);
            })
        }
    }
     //closecard
     const closeCard = () => {
        setShowPkgList(true)
        setOpenPking(false);
        setNotedfy(false);
    }
   
    const ChangeConsigmentHandler = (event) => {
        setValues({ ...values, consigmentNo: event.target.value })
    };
    const ChangetttlInvoicehandler = (event) => {
        setSummarryValues({ ...summeryValues,txt_total_invoice: event.target.value })
    };
    const ChangettlItemstHandler = (event) => {
        setSummarryValues({...summeryValues, txt_total_items: event.target.value })
    };
    const ChangettlWightHandler = (event) => {
        setSummarryValues({...summeryValues, txt_total_Wight: event.target.value })
    };

    //Ochange Event Redio
    const ChangeDatacrctionRedioHandler = (event) => {
        setValues({ ...values, txt_DataCrction: event.target.value })
        if (event.target.value === "Wight") {
            setProduct([])
            setShowWgt(true)
            setShowItmVlu(false)
            setShowPkgList(false)
            setShowBanedList(false)
        }
        else if (event.target.value === "ItemValue") {
            setProduct([])
            setShowWgt(false)
            setShowItmVlu(true)
            setShowPkgList(false)
            setShowBanedList(false)
        }
        else if (event.target.value === "PkgList") {
            setProduct([])
            setShowWgt(false)
            setShowItmVlu(false)
            setShowPkgList(true)
            setShowBanedList(false)
        }
        else if (event.target.value === "BannedItem") {
            setProduct([])
            setShowWgt(false)
            setShowItmVlu(false)
            setShowPkgList(false)
            setShowBanedList(true)
        }
    };
   
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

    //reset
    const resteall = () => {
        setValues({
            consigmentNo: " ",
            txt_infoMassage: " ",
            txt_DataCrction: "Wight",
            txt_Range: " ",
            txt_ttlWgt: " "
        })
        setNotedfy(false)
        setProduct([]);
    }
    const ChangeRangeHandler = (event) => {
        setValues({ ...values, txt_Range: event.target.value })
    };
    const ChangeTtlwgtHandler = (event) => {
        setValues({ ...values, txt_ttlWgt: event.target.value })
    };
    // notificetion controller  
    const notefyClose = () => {
        setNotedfy(false);
    };


    let dataRadio = ["Wight", "ItemValue", "PkgList", "BannedItem"];
    return (
        <div>
            <div>
                <Sidebar />
            </div>
            <div>
                <body className="responsive box-content border-4" style={{ marginTop: "3rem" }}>
                    <Card className="form-inline">
                        <h1 className="text-center">Data Correction</h1>
                        <Row xs={2} className="form-inline">
                            <Form.Group ms="1" className="form-inline">
                                <Form.Label>MAWB.No</Form.Label>
                                <Form.Control size="sm" value={values.consigmentNo} onChange={ChangeConsigmentHandler} />
                            </Form.Group>
                            <Card className="form-inline" >
                            <p >SUMMARY</p>
                                <Row xs={4} className="m-1">
                                
                                    <Form.Group md="1" >
                                        <Form.Label>TotalInvoice</Form.Label>
                                        <Form.Control size="sm" style={{ width: "5rem" }} value={summeryValues.txt_total_invoice} onChange={ChangetttlInvoicehandler} />
                                    </Form.Group>
                                    <Form.Group md="1" className="mx-4">
                                        <Form.Label>TotalItems</Form.Label>
                                        <Form.Control size="sm" style={{ width: "5rem" }} value={summeryValues.txt_total_items} onChange={ChangettlItemstHandler} />
                                    </Form.Group>
                                    <Form.Group md="1" className=" mx-2">
                                        <Form.Label>TotalWight</Form.Label>
                                        <Form.Control size="sm" style={{ width: "5rem" }} value={summeryValues.txt_total_Wight} onChange={ChangettlWightHandler} />
                                    </Form.Group>
                                </Row>
                            </Card>
                        </Row>
                        <Row xs={1}>
                            <Form.Group as={Row} className="mb-3 m-2 mx-5">
                                {dataRadio.map(result => (
                                    <Form.Check inline label={result} value={result} checked={values.txt_DataCrction === result} type="radio" name="rediovalues" onChange={ChangeDatacrctionRedioHandler} />
                                ))}
                            </Form.Group>
                        </Row>
                        {showWight?  <Row xs={2} className="form-inline">
                         <div className="form-inline">
                                <Form.Label>Range</Form.Label>
                                <InputGroup size="sm">
                                    <Form.Control size="sm" values={values.txt_Range} onChange={ChangeRangeHandler} />
                                    <InputGroup.Text >Kg</InputGroup.Text>
                                </InputGroup >
                            </div>
                        <ButtonGroup bsPrefix className="mt-3">
                                <Button className="p-1" onClick={filterMAWB}>Filter</Button>
                                <Button className="p-1" onClick={resteall}>Clear</Button>
                            </ButtonGroup>
                        </Row> :null}
                        {!showWight?<ButtonGroup bsPrefix>
                                <Button className="p-1" onClick={filterMAWB}>Filter</Button>
                                <Button className="p-1" onClick={resteall}>Clear</Button>
                            </ButtonGroup> : null}
                        <Snackbar
                            anchorEmployee={{ vertical: 'top', horizontal: 'center', }}
                            open={notefy} autoHideDuration={100} message={values.txt_infoMassage}
                            action={
                                <IconButton size="small" aria-label="close" color="inherit" onClick={notefyClose}>
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            } />
                        {showWight ? <TableContainer className={classes.container}>
                            <Table stickyHeader aria-label="table" size="small" >
                                <TableHead >
                                    <TableRow>
                                        <TableCell >Sl.no</TableCell>
                                        <TableCell>Invoice.No</TableCell>
                                        <TableCell >Wight</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        product.map(
                                            (wights) => (
                                                <TableRow hover key={wights.invoiceId}>
                                                    <TableCell >{wights.sl_no}</TableCell>
                                                    <TableCell>{wights.no_pcs}</TableCell>
                                                    <TableCell>{wights.totalWight}</TableCell>
                                                </TableRow>
                                            ))}
                                </TableBody>
                            </Table>
                        </TableContainer> : null}
                        {showItmVlu ? <TableContainer className={classes.container}>
                            <Table stickyHeader aria-label="table" size="small" >
                                <TableHead >
                                    <TableRow>
                                        <TableCell >Sl.no</TableCell>
                                        <TableCell>ItemName</TableCell>
                                        <TableCell >ItemValue</TableCell>
                                        <TableCell >BannedItem</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        product.map(
                                            (ItemValue) => (
                                                <TableRow hover key={ItemValue.itemId}>
                                                    <TableCell >{ItemValue.sl_no}</TableCell>
                                                    <TableCell>{ItemValue.item}</TableCell>
                                                    <TableCell contentEditable={true}>{ItemValue.itemValue}</TableCell>
                                                    <TableCell contentEditable={true}>{ItemValue.bannedItem}</TableCell>
                                                </TableRow>
                                            ))}
                                </TableBody>
                            </Table>
                        </TableContainer> : null}
                        {showPkgList ? <TableContainer className={classes.container}>
                            <Table stickyHeader aria-label="table" size="small" >
                                <TableHead >
                                    <TableRow>
                                        <TableCell >Sl.no</TableCell>
                                        <TableCell>Invoice.No</TableCell>
                                        <TableCell >InvoiceValue</TableCell>
                                        <TableCell >Wight</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        product.map(
                                            (pkgList) => (
                                                <TableRow hover key={pkgList.invoiceId} onDoubleClick={()=>OpenPkgingList(pkgList)}>
                                                    <TableCell >{pkgList.sl_no}</TableCell>
                                                    <TableCell>{pkgList.invoice_No}</TableCell>
                                                    <TableCell >{pkgList.totalInvoiceValuePkgList}</TableCell>
                                                    <TableCell >{pkgList.totalWight}</TableCell>
                                                </TableRow>
                                            ))}
                                </TableBody>
                            </Table>
                        </TableContainer> : null}
                        {openPking?<Card border="primary" bg={'Dark'}>
                            <Card.Header ><h6 className="form-inline justify-between">Package List<AiFillCloseSquare size="20" onClick={closeCard} /></h6></Card.Header>
                            <Card.Body>
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
                    </Card.Body>
                    <Card.Footer>
                    <Row xs={6} >
                        <Form.Group md="6" className="form-inline">
                            <Form.Label style={{ color: "black" }}>InvoiceValueFromExcel</Form.Label>
                            <Form.Control size="sm" readOnly value={pkgInputFields.txt_invoiceValue}/>
                        </Form.Group>
                        <Form.Group md="1" className="form-inline mx-3" >
                            <Form.Label style={{ color: "black" }}>InvoiceWight</Form.Label>
                            <Form.Control size="sm" readOnly value={pkgInputFields.txt_ttlWgt}/>
                        </Form.Group >
                       
                        <Form.Group md="1" className="form-inline">
                            <Form.Label style={{ color: "black" }}>TotalInvoiceValue</Form.Label>
                            <Form.Control size="sm" readOnly value={pkgInputFields.txt_totalValue} />
                        </Form.Group>
                    </Row>
                    </Card.Footer>
                    </Card> :null}
                        {showBanedList ? <TableContainer className={classes.container}>
                            <Table stickyHeader aria-label="table" size="small" >
                                <TableHead >
                                    <TableRow>
                                        <TableCell >Sl.no</TableCell>
                                        <TableCell>Invoice.No</TableCell>
                                        <TableCell >BannedItem</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        product.map(
                                            (bndItem) => (
                                                <TableRow hover key={bndItem.itemId}>
                                                    <TableCell >{bndItem.sl_no}</TableCell>
                                                    <TableCell>{bndItem.invoice_No}</TableCell>
                                                    <TableCell>{bndItem.bannedItem}</TableCell>
                                                </TableRow>
                                            ))}
                                </TableBody>
                            </Table>
                        </TableContainer> : null}
                        <Button className="p-1" onClick={UpdateCorection}>Update</Button>
                        <Row className="form-inline">

                            {showWight ? <Form.Group md="1" className="form-inline mb-1">
                                <Form.Label>Total Invoice Weight:</Form.Label>
                                <Form.Control size="sm" value={values.txt_ttlWgt} onChange={ChangeTtlwgtHandler} />
                            </Form.Group> : null}
                        </Row>
                    </Card>
                </body>
            </div>
        </div>
    );
}

export default DataCorrection;