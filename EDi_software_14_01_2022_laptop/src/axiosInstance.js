import axios from "axios";
import { getToken } from "./components/Utils/Common";

/*
instance.defaults.headers.common['Authorization']= getToken();
console.log("axios call token "+JSON.stringify(getToken()));
instance.defaults.headers.common['Content-Type']= 'application/json';
export default instance;*/



const customAxios = axios.create({
    baseURL: `http://localhost:8080/Clearence_applicetion_software/edi/sit/clearence/private/v1/prelogin`,
    timeout: 60000
   // headers: { 'api-key': 'eyJz-CI6Ikp-4pWY-lhdCI6' }
});

// Step-2: Create request, response & error handlers
const requestHandler = request => {
    // Token will be dynamic so we can use any app-specific way to always   
    // fetch the new token before making the call
    request.headers.Authorization = getToken();  
    console.log("axios call token "+JSON.stringify(getToken()));
    return request;
};

const responseHandler = response => {
    console.log("response.status "+JSON.stringify(response.status));
    if (response.status === 401) {

        window.location = '/ediimports';
    }

    return response;
};

const errorHandler = error => {
    // console.log("error call "+JSON.stringify(error));
    return Promise.reject(error);
};

// Step-3: Configure/make use of request & response interceptors from Axios
// Note: You can create one method say configureInterceptors, add below in that,
// export and call it in an init function of the application/page.
customAxios.interceptors.request.use(
    (request) => requestHandler(request),
    (error) => errorHandler(error)
);

customAxios.interceptors.response.use(
    (response) => responseHandler(response),
    (error) => errorHandler(error)
 );


// Step-4: Export the newly created Axios instance to be used in different locations.
export default customAxios;