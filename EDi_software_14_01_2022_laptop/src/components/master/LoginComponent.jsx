import React, { useState, Fragment } from 'react';
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Avatar from '@material-ui/core/Avatar';
import LoginServices from '../../sevices/LoginServices';
import { setUserSession, setloginSession } from '../Utils/Common';
import { Snackbar, IconButton,
    //  Backdrop, CircularProgress, makeStyles 
    } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import AuthenticationService from '../../sevices/AuthenticationService';

// const useStyles = makeStyles((theme) => ({
//     backdrop: {
//       zIndex: theme.zIndex.drawer - 1,
//       color: '#fff',
//     },
//   }));
function LoginComponent(props) {
    // const classes = useStyles();
    const [values, setValues] = useState({
        txt_userName: '',
        txt_password: '',
        txt_infoMassage: '',
        text_userId: 0,
    });
    const [notefy, setNotedfy] = useState(false);
    // const [open, setOpen] = useState(false);
    const [validated, setValidated] = useState(false);
    const [submitted, setSubmited] = useState(false);
    const [loading, setLoading] = useState(false);
    const changeUserNameHandler = (event) => {
        setValues({ ...values, txt_userName: event.target.value.replace(/[^a-zA-Z]/ig, '') });
    }
    const changePasswordHandler = (event) => {
        setValues({ ...values, txt_password: event.target.value.replace(/[^a-zA-Z0-9]/ig, '') });
    }
    //Authntication call request
    const loginPage = (e) => {
        e.preventDefault();
        // setOpen(true);
        setLoading(true);
        // Call Authentication service
        AuthenticationService.executeJwtAuthenticationService().then((response) => {
            console.log('APILogin=>' + JSON.stringify("Barear " + response.data.token));
            setUserSession("Bearer " + response.data.token, values.txt_userName)
           // AuthenticationService.registerSuccessfulLoginForJwt(values.txt_userName,response.data.token);
            loginAPI();

        }).catch(error => {
            console.log('catch auth  =>' + JSON.stringify(error));
            setValues({
                txt_infoMassage: error.message,
                txt_userName: '',
                txt_password: ''
            });
            // setOpen(false);
            setSubmited(false);
            setValidated(true);
            setLoading(false);
            setNotedfy(true);

        });
    }


    const loginAPI = () => {
        //login API call
        let Login = { userName: values.txt_userName, password: values.txt_password }
        LoginServices.getLogin(Login).then(res => {
            // setOpen(false);
            console.log('login all =>' + JSON.stringify(res.data));
            if (res.data[0].messageCode === "0000") {
                setValues({ txt_infoMassage: res.data[0].message })
                setNotedfy(true);
                console.log('loginData message =>' + JSON.stringify(res.data));
                console.log('loginwithoutdata  =>' + JSON.stringify(res.data[0].userID));
                setloginSession(res.data[0].userID, res.data[0].currentDate)
                props.history.push('/home');
            }
            else {
                setValues({
                    txt_infoMassage: res.data[0].message,
                    txt_userName: '',
                    txt_password: ''
                })
                // setOpen(false);
                setNotedfy(true);
                // console.log('loginData message =>' + JSON.stringify(res.data[0].message));
                setloginSession(res.data[0].userID,)
                setLoading(false);
            }
        }).catch(error => {
            console.log('error  =>' + JSON.stringify(error));
            if (!values.txt_userName) {
                setSubmited(true);
                setValidated(true);
                setLoading(false);
                // setOpen(false);
            }
            else if (!values.txt_password) {
                setSubmited(true);
                setValidated(true);
                setLoading(false);
                // setOpen(false);
            }
            else {
                setValues({
                    txt_infoMassage: error.message,
                    txt_userName:"",
                    txt_password:""
                });
                setSubmited(false);
                setValidated(true);
                setNotedfy(true);
                // setOpen(false);
                setLoading(false);
            }
        });

    }

    const notefyClose = () => {
        setNotedfy(false);
    };
    return (
        <div className="background">
            <Fragment>
                <Container>
                {/* <Backdrop className={classes.backdrop} open={open} >
                    <CircularProgress color="inherit" />
                  </Backdrop> */}
                    <Row>
                        <Col lg={6} md={6} sm={12} className="p-5 m-auto font-serif">
                            <div className="loginBox p-5">
                                <Avatar className="border-solid border-1 border-white ml-5" style={{ backgroundColor: "darksalmon", width: "5.5rem", height: "5.5rem" }}>
                                    <label>Login</label>
                                </Avatar>
                                <Form noValidate validated={validated} style={{ fontWeight: 'bold' }}>
                                    <Form.Label>UserName:</Form.Label>
                                    <Form.Control size="sm" required type="text" placeholder="userName"
                                        value={values.txt_userName} maxLength="50" onChange={changeUserNameHandler} autoComplete="off" />
                                    {submitted && !values.txt_userName ? <Form.Text style={{ color: 'red', fontWeight: 'bold' }}>
                                        Please fill the userName
                                    </Form.Text> : null}
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control size="sm" required type="password" placeholder="Password"
                                        value={values.txt_password} maxLength="50" onChange={changePasswordHandler}
                                        autoComplete="off" />
                                    {submitted && !values.txt_password ? <Form.Text style={{ color: 'red', fontWeight: 'bold' }}>
                                        Please fill the password
                                    </Form.Text> : null}
                                    <Snackbar
                                        anchorOrigin={{ vertical: 'top', horizontal: 'right', }}
                                        open={notefy} autoHideDuration={6000} message={values.txt_infoMassage}
                                        action={
                                            <IconButton size="small" aria-label="close" color="inherit" onClick={notefyClose}>
                                                <CloseIcon fontSize="small" />
                                            </IconButton>
                                        } />
                                    <Button onClick={loginPage} className="p-2" variant="success"
                                        type="submit" disabled={loading}>
                                        {loading ? 'loging...' : 'Login'}
                                    </Button>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        </div>
    );

}

export default LoginComponent;
