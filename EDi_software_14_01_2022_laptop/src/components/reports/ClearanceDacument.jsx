import { React, useState } from 'react'
import {
    Button, Card, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText
    , DialogTitle, FormControlLabel, FormGroup, makeStyles, Paper, TextField ,Radio,
    Table, TableBody, TableCell, TableContainer, TableHead,  TableRow,  withStyles, ButtonGroup
} from '@material-ui/core';
import {Row} from 'react-bootstrap'
import Draggable from 'react-draggable';
import Sidebar from '../menus/Sidebar'

function PaperComponent(props) {
    return (
        <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
}
const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
      width:700
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
  
const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    formControll: {
        margin: theme.spacing(3),
    },
    export: {
        margin: theme.spacing(1),
        marginLeft: theme.spacing(25)
    },
    tableContainer: {
        margin: theme.spacing(0),
        minHeight: 300,
        maxHeight: 300,
      },
      TextField:{
        marginLeft:theme.spacing(4),
        minWidth:160,
       maxWidth:160
      },
      ButtonGroup:{
        margin: theme.spacing(1),
        marginLeft: theme.spacing(20),
      },
}));
function ClearanceDacument() {
    const [Invoice ,setInvoice] = useState([]);
    const classes = useStyles();
    const [open, setOpen] = useState(true);
    const [open2, setOpen2] = useState(false);
    const [selctedValue, setSelectedValue] = useState('a')
    const [values, setValues] = useState({
        ip_mawb_no: '',
        ip_invoice_no: ''
    })

    const handleClose = () => {
        setOpen(false)
        window.location.replace('/home')
    };
    const handleClose2 = () => {
        setOpen2(false)
    };
    const handleOpen2 = () => {
        setInvoice([])
        setOpen2(true)
    };

    const Changehandler = (event) => {
        setSelectedValue(event.target.value)
    }

    const ChangeInputHandler = (event) => {
        setSelectedValue(event.target.value)
    }
    const inputChangeHandler = () => {
        if (selctedValue === 'a') {
            return ChangeMawbHandler
        }
        if (selctedValue === 'b') {
            return ChangeInvoiceHandler
        }
    }
    const ChangeMawbHandler = (event) => {
        setValues({
            ...values, ip_mawb_no: event.target.value,
            ip_invoice_no: ''
        })
    }
    const ChangeInvoiceHandler = (event) => {
        setValues({
            ...values, ip_invoice_no: event.target.value,
            ip_mawb_no: ''
        })
    }

    const inputField = () => {
        if (selctedValue === 'a') {
            return values.ip_mawb_no
        }
        if (selctedValue === 'b') {
            return values.ip_invoice_no
        }
    }
    const inputLabel = () => {
        if (selctedValue === 'a') {
            return 'Mawb.No'
        }
        if (selctedValue === 'b') {
            return 'Invoice.No'
        }
    }

    return (
        <div>
            <Sidebar />
            <Dialog 
                open={open}
                onClose={handleClose}
                PaperComponent={PaperComponent}>
                <DialogActions>
                    <Button  onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
                <DialogTitle style={{ cursor: 'move', marginTop: "-10%" }} id="draggable-dialog-title">
                    Clearance Documents
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Card >
                            <FormGroup row className={classes.formControll}>
                                <FormControlLabel control={<Checkbox checked={selctedValue === 'invoice'} onChange={Changehandler} value="invoice" />}
                                    label="Invoice" />
                                <FormControlLabel control={<Checkbox checked={selctedValue === 'manifist'} onChange={Changehandler} value="manifist" />}
                                    label="Manifest" />
                                <FormControlLabel control={<Checkbox checked={selctedValue === 'declaration'} onChange={Changehandler} value="declaration" />}
                                    label="Declaration Sheet" />
                            </FormGroup>
                            <FormGroup row className={classes.formControll}>
                                <FormControlLabel control={<Checkbox checked={selctedValue === 'form4'} onChange={Changehandler} value="form4" />}
                                    label="Form IV" />
                                <FormControlLabel control={<Checkbox checked={selctedValue === 'manifist_edi'} onChange={Changehandler} value="manifist_edi" />}
                                    label="ManifestEdi" />
                                <FormControlLabel control={<Checkbox checked={selctedValue === 'authrizetion'} onChange={Changehandler} value="authrizetion" />}
                                    label="Authorization Letter" />
                            </FormGroup>
                            <FormGroup row className={classes.formControll}>
                                <Button onClick={handleOpen2}
                                variant="outlined" size="small" color="primary" className={classes.margin}>
                                    FormIv
                                </Button>
                                <FormControlLabel control={<Radio checked={selctedValue === 'a'} onChange={ChangeInputHandler} value="a" />}
                                    label="MAWB" />
                                <FormControlLabel control={<Radio checked={selctedValue === 'b'} onChange={ChangeInputHandler} value="b" />}
                                    label="Invoice" />
                            </FormGroup>
                            <TextField label={inputLabel()} value={inputField()} onChange={inputChangeHandler()}
                                className={classes.formControll} />
                        </Card>
                        <Button variant="outlined" size="small" color="primary" className={classes.export}>
                            Export
                        </Button>
                    </DialogContentText>
                </DialogContent>

            </Dialog>
            <Dialog fullWidth={true}
            maxWidth="sm"
                open={open2}
                onClose={handleClose2}
                PaperComponent={PaperComponent}>
                <DialogActions>
                    <Button onClick={handleClose2} color="primary">
                        Close
                    </Button>
                </DialogActions>
                <DialogTitle style={{ cursor: 'move', marginTop: "-10%" }} id="draggable-dialog-title">
                    Form V
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Card >
                            <Row xs={2}>
                        <TableContainer className={classes.tableContainer}>
                  <Table stickyHeader size="small" className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="left">Sl.No</StyledTableCell>
                        <StyledTableCell align="left">Invoice</StyledTableCell>
                        <StyledTableCell align="left">FormType</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody >
                      {Invoice.map((invoice) => (
                        <StyledTableRow hover key={invoice.customer_id} >
                          <TableCell align="center">{invoice.sl_No}</TableCell>
                          <TableCell align="center">{invoice.customer_id}</TableCell>
                          <TableCell align="center">{invoice.customer_name}</TableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <br/>
                <TextField label="MAWB.No" className={classes.TextField}/>
               
                </Row>
                <ButtonGroup variant="outlined" size="small" color="primary" className={classes.ButtonGroup}>
                    <Button >
                        show
                    </Button>
                    <Button >
                        Clear
                    </Button>
                    <Button >
                        Form V
                    </Button>
                    <Button>
                        Update to Form IV
                    </Button>
                </ButtonGroup>
                        </Card>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default ClearanceDacument
