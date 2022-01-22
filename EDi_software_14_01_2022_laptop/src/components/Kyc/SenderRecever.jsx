import React, { useState } from 'react';
import { Tabs, Tab, Card, Row, Form ,Button,ButtonGroup} from 'react-bootstrap';
import { Divider,Table, TableBody, TableCell, TableHead, TableRow, TableContainer,TablePagination, makeStyles
  } from '@material-ui/core';
import Sidebar from '../menus/Sidebar';

  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer - 1,
      backgroundColor: "pink",
      color: '#fff',
    },
   tabs:{
    margin: theme.spacing(1),
   },
    tblecontainer: {
      height: 320,
    },
    
    card: {
        margin: theme.spacing(3),
    },
   
  }));
function SenderRecever(props) {
    const classes = useStyles();
    const [tblSender ,setTblSender] =useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);
    const [serachLoading , setSearchLoding] = useState(false);
    const [addLoading , setAddLoading] = useState(false);
    const [updateLoading , setUpdateLoading] = useState(false);
    const [deleteLoading , setDeleteLoding] = useState(false);
    const [values , setValues] = useState({
        txt_senderMobile:"",
        txt_senderName:"",
        txt_recevermobile:"",
        txt_receverName:""
    });

    const reset =()=>{
        setAddLoading(false);
        setUpdateLoading(false);
        setDeleteLoding(false);
        setSearchLoding(false);

    }

    const ChangeSenderMobileHandler =(event)=>{
        setValues({...values ,txt_senderMobile:event.target.value})
    }
    const ChangeSenderNameHandler =(event)=>{
        setValues({...values ,txt_senderName:event.target.value})
    }
    const ChangeReceverMobileHandler =(event)=>{
        setValues({...values ,txt_recevermobile:event.target.value})
    }
    const ChangeReceverNameHandler =(event)=>{
        setValues({...values ,txt_receverName:event.target.value})
    }
    const search =()=>{
        setTblSender([])
        setSearchLoding(true);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return (
        <div>
            <div>
                <Sidebar />
            </div>
            <div>
                <body className="responsive" style={{ marginTop: "4rem" }}>
                    <Tabs className="Tabs">
                        <Tab eventKey="Sender" title="Sender">
                            <Card className={classes.card}>
                                <Row xs={5} className="mx-5">
                                <Form.Group md="1"  >
                                    <Form.Label>SenderMobile</Form.Label>
                                    <Form.Control size="sm" value={values.txt_senderMobile} onChange={ChangeSenderMobileHandler}/>
                                    </Form.Group>
                                    <Form.Group md="1"  >
                                    <Form.Label>SenderName</Form.Label>
                                    <Form.Control size="sm" value={values.txt_senderName} onChange={ChangeSenderNameHandler}/>
                                   </Form.Group>
                                    <Form.Group md="1"  >
                                    <Form.Label>SenderIdType</Form.Label>
                                    <Form.Select>
                                        <option>
                                            Id
                                        </option>
                                    </Form.Select>
                                    </Form.Group>
                                    
                                </Row>
                                <div>
                                <Button className="btn-info p-1 ml-5" onClick={search}>{serachLoading ? 'searching':'search'}</Button>
                                </div>
                                <TableContainer className={classes.tblecontainer}>
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
                                            {tblSender.map((igm) => (
                                                <TableRow hover key={igm.igm_id} >
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
                                <TablePagination
                                    rowsPerPageOptions={[10, 15]}
                                    component="div"
                                    count={tblSender.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                                  <Card.Footer>
                                <ButtonGroup bsPrefix>
                                    <Button className="btn-info p-1">{addLoading ? 'processing':'Add Sender'}</Button>
                                    <Button className="btn-info p-1">{updateLoading ? 'processing':'Update Sender'}</Button>
                                    <Button className="btn-info p-1">{deleteLoading ? 'processing':'Delete Sender'}</Button>
                                    <Button className="btn-info p-1" onClick={reset}>Reset</Button>
                                    </ButtonGroup>
                                </Card.Footer>
                            </Card>
                        </Tab>
                        <Tab eventKey="Reciver" title="Reciver">
                        <Card className={classes.card}>
                                <Row xs={5} className="mx-5">
                                <Form.Group md="1"  >
                                    <Form.Label>ReceverMobile</Form.Label>
                                    <Form.Control size="sm" value={values.txt_recevermobile} onChange={ChangeReceverMobileHandler}/>
                                    </Form.Group>
                                    <Form.Group md="1"  >
                                    <Form.Label>ReceverName</Form.Label>
                                    <Form.Control size="sm" value={values.txt_recevermobile} onChange={ChangeReceverNameHandler}/>
                                    </Form.Group>
                                    <Form.Group md="1"  >
                                    <Form.Label>ReceverIdType</Form.Label>
                                    <Form.Select>
                                        <option>
                                            Id
                                        </option>
                                    </Form.Select>
                                    </Form.Group>
                                </Row>
                                <div>
                                <Button className="btn-info p-1 ml-5" onClick={search}>{serachLoading ? 'searching':'search'}</Button>
                                    </div>
                                <TableContainer className={classes.tblecontainer}>
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
                                            {tblSender.map((igm) => (
                                                <TableRow hover key={igm.igm_id}>
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
                                <TablePagination
                                    rowsPerPageOptions={[10, 15]}
                                    component="div"
                                    count={tblSender.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                                <Card.Footer>
                                <ButtonGroup bsPrefix>
                                    <Button className="btn-info p-1">{addLoading ? 'processing':'Add Sender'}</Button>
                                    <Button className="btn-info p-1">{updateLoading ? 'processing':'Update Sender'}</Button>
                                    <Button className="btn-info p-1">{deleteLoading ? 'processing':'Delete Sender'}</Button>
                                    <Button className="btn-info p-1" onClick={reset}>Reset</Button>
                                    </ButtonGroup>
                                </Card.Footer>
                            </Card>
                        </Tab>
                    </Tabs>
                </body>
            </div>
        </div>
    );
}

export default SenderRecever;