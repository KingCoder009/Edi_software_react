import axios from 'axios';
import {getUser, setUserSession,removeUserSession} from '../components/Utils/Common';
// getToken
//const API_URL = 'http://localhost:8080'
 

const  API_username='javainuse';
const  API_password ='password';
     

class AuthenticationService {

    getAthanticate(user_object){
        // console.log(user_object); 
        return axios.post("http://localhost:8080/Clearence_applicetion_software/authenticate",user_object);
    }
 //later
 executeJwtAuthenticationService(){
     const username =API_username;
    const password =  API_password;

   const user_object = {
      username: username,
      password: password
    };
  
       // let user_object = {userName :API_username, password:API_password}
        // console.log(user_object); 
        return axios.post("http://localhost:8080/Clearence_applicetion_software/authenticate",user_object);
    
  
 }
 
    // getLogin(Login){
    //     console.log('login serviceCall =>'+ JSON.stringify(Login));
    //      return axios.post("http://localhost:8080/clearence/Login",Login);
    //     //  {
    //     //     headers: {
    //     //       'Authorization': getToken()
    //     //     }
    //     //   }
    // }

    registerSuccessfulLoginForJwt(username, token) {
        // console.log("registerSuccessfulLoginForJwt"+token); 
        setUserSession("Bearer "+token,username)
   
    } 

    logout() {
        removeUserSession();
    }

    isUserLoggedIn() {
        let user = getUser();
        if (user === null) return false
        return true
    }

    getLoggedInUserName() {
        let user =  getUser();
        if (user === null) return ''
        return user
    }

    /*setupAxiosInterceptors(token) {
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.Authorization = token
                  }
                return config
            }
        )
    }*/
}

export default new AuthenticationService()