import axios from '../axiosInstance';

 
const Login_ABI_BASE_URL = "/login";
 
class LoginService{


    getLogin(login){
        
         return axios.post(Login_ABI_BASE_URL+"/Login",login);
    }
}

export default new LoginService();