import axios from '../axiosInstance';

const Reports_ABI_BASE_URL = "/Reports";
class ReportsServices{
     //dwnloadXml File
     getECM_NonDocs_XMLFiles(mawb_no,igm_no,xmldata){
        return axios.post(Reports_ABI_BASE_URL+'/getNoNDocs?MAWB_NO='+mawb_no+'&IGM_NO='+igm_no,xmldata);
    }
    getCBEXII_XMLFiles(mawb_no,igm_no,xmldata){
        return axios.post(Reports_ABI_BASE_URL+'/getCBE_XII?MAWB_NO='+mawb_no+'&IGM_NO='+igm_no,xmldata);
    }
    getCBEXIII_XMLFiles(mawb_no,igm_no,xmldata){
        return axios.post(Reports_ABI_BASE_URL+'/getCBE_XIII?MAWB_NO='+mawb_no+'&IGM_NO='+igm_no,xmldata);
    }
}

export default new ReportsServices();