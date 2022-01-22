import React, { useState } from 'react';
import { makeStyles,Table,TableBody,TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { Button, ButtonGroup, Card, Col, Form, Row } from 'react-bootstrap';
import Sidebar from '../menus/Sidebar';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: "black",
        color: '#fff',
    },
    container: {
        margin: theme.spacing(1),
        
        height: 250,
        border: "1px solid black",
        boxSizing: "border-box "
    },
    card: {
        minWidth: "90%",
        maxWidth: "100%",

    },
}));
function ItemValue(props) {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [ShowInput, setShowInput] = useState(true)
    const [validated, setValidated] = useState(false);
    const [product ,setProduct] = useState([]);
    const [values, setValues] = useState({
        redio_Value: "MAWB.No",
        txt_FilterValue: "",
        txt_ItemName:"",
        txt_ItemValue:""
    })
    const [InputTitle, setInputTitle] = useState("MAWB.No")

    const FilterDetails =()=>{
        setLoading(true);
        if(values.redio_Value === "MAWB.No"){
            setLoading(false)
            setValidated(false)
        }
        else if(values.redio_Value === "Invoice"){
            setLoading(false);
        }
        else if(values.redio_Value === "All"){
            setLoading(false);
        }
    }
    const ChangeFilterHandel = (event) => {
        setValues({ ...values, txt_FilterValue: event.target.value })
    }
    const ChangeItemNameHandel = (event) => {
        setValues({ ...values, txt_ItemName: event.target.value })
    }
    const ChangeItemValueHandel = (event) => {
        setValues({ ...values, txt_ItemValue: event.target.value })
    }
    const ChangeItemRedioHandler = (event) => {
        setValues({ ...values, redio_Value: event.target.value })
        if (event.target.value === "MAWB.No") {
            setProduct([])
            setInputTitle("MAWB.No")
            setShowInput(true)
        }
        else if (event.target.value === "Invoice") {
            setProduct([])
            setInputTitle("Invoice")
            setShowInput(true)
        }
        else if (event.target.value === "All") {
            setProduct([])
            setInputTitle("")
            setShowInput(false)
        }
    };
    let dataRadio = ["MAWB.No", "Invoice", "All"];
    return (
        <div>
            <div>
            <Sidebar />
            </div>
            <div>
                <body className="responsive  " style={{ marginTop: "4rem" }}>
                <Row >
                    <Col xs={11} style={{ margin: "auto" }} className=" font-serif">
                <Card  style={{ borderTop: "4px solid rgb(175, 174, 129)", borderLeft: "3px solid rgb(128, 127, 96)" }} >
                <Form.Text style={{ fontSize: "20px", color: "black",textAlign:"center" }}>Item Details:-</Form.Text>
                <Form noValidate validated={validated} className="self-center"> 
                    <Row xs={1} >
                        <Form.Group style={{marginLeft:"25%"}} as={Row} className="mt-3 form-inline">
                            {dataRadio.map(result => (
                                <Form.Check  inline label={result} value={result} checked={values.redio_Value === result}
                                    type="radio" name="rediovalues" onChange={ChangeItemRedioHandler} />
                            ))}
                        </Form.Group>
                    </Row>
                    {ShowInput ? <Row style={{marginLeft:"20%",width:"20rem",textAlign:"center"}} className="mt-3">
                    <Form.Group >
                        <Form.Label>{InputTitle}</Form.Label>
                        <Form.Control style={{textAlign:"center",fontWeight:"bold"}} required size="sm" type="text" value={values.txt_FilterValue} onChange={ChangeFilterHandel} />
                        </Form.Group>
                    </Row> : null}
                    <Row xs={3} className="mt-3 form-inline">
                    <Form.Group  md="3">
                        <Form.Label>ItemName</Form.Label>
                        <Form.Control  size="sm" value={values.txt_ItemName} onChange={ChangeItemNameHandel} disabled/>
                        </Form.Group>
                        {/*  */}
                        <Form.Group  md="4">
                        <Form.Label>ItemValue</Form.Label>
                        <Form.Control  size="sm" value={values.txt_ItemValue} onChange={ChangeItemValueHandel} disabled/>
                        </Form.Group>
                        {/*  */}
                        <Form.Group md="4">
                        <Form.Label>BannedItem</Form.Label>
                        <Form.Select>
                            <option>NO</option>
                            <option>YES</option>
                        </Form.Select>
                        </Form.Group>
                        <ButtonGroup bsPrefix>
                                <Button className="p-1" onClick={FilterDetails} disabled={loading}>{loading ? 'Processing...' : 'Filter'}</Button>
                                <Button className="p-1" onClick={FilterDetails}>Clear</Button>
                        </ButtonGroup>
                    </Row>
                    </Form>
                    <Col>
                    <TableContainer className={classes.container}>
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
                        </TableContainer> 
                        </Col>
                       
                </Card>
            </Col>
            </Row>
            </body>
            </div>
        </div>
    );
}

export default ItemValue;