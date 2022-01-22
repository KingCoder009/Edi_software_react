import axios from '../../axiosInstance';
import {getUserId} from '../../components/Utils/Common';

const operation_ABI_BASE_URL = "/opiration";
class OprationServices {
    /*MAWB Invoice Entry Module Services*/
    getMAWBNOdata(origin_id, consgmnt_iD) {
        return axios.get(operation_ABI_BASE_URL+'/getMawbInvoice?origin=' + origin_id + '&consgmnt=' + consgmnt_iD);
    }
    addMAWB(mawb_invoice) {
        return axios.post(operation_ABI_BASE_URL + "/addMawb", mawb_invoice);
    }
    updateMAWB(consigment_id, update_invoice) {
        return axios.put(operation_ABI_BASE_URL + "/updateMAWB?CONSIGMENTid=" + consigment_id, update_invoice);
    }

    deleteMAWB(consigment_id) {
        return axios.delete(operation_ABI_BASE_URL + '/DeleteMAWB?CONSIGMENTid=' + consigment_id);
    }


    //get invoice number
    getInvoiceNO(consigment_no) {
        return axios.get(operation_ABI_BASE_URL+'/getInvoice?ConsigmentNo=' + consigment_no);
    }
    //upload excel
    upload(consigment_no, file) {
        let formData = new FormData();
        formData.append("file", file);
        return axios.post(operation_ABI_BASE_URL + "/upload?createdBy=" + getUserId() + "&consgmntNO=" + consigment_no, formData);
    }
    //getIGMno
    getIGMNo(){
        console.log("igm genaretion")
        return axios.get(operation_ABI_BASE_URL+"/getIGMdetails?StartLimit=0&EndLimit=1000");
    }
    //insertIGMno
    addIgmNO(igm_details){
        return axios.post(operation_ABI_BASE_URL+"/addIGMdetails",igm_details);
    }
    //updateIGMno
    updateIGM(igm_id,igm_details){
        return axios.put(operation_ABI_BASE_URL+"/updateIGM?IGM_Id="+igm_id,igm_details);
    }
    //deleteIGMno
    deleteIGMno(igm_id){
        return axios.delete(operation_ABI_BASE_URL+"/DeleteIGM?IGM_Id="+igm_id);
    }
    //getInvoice Based on MAWB
    loadInvoice(mawb_no){
        return axios.get(operation_ABI_BASE_URL+"/loadInvoice?MAWB_NO="+mawb_no);
    }
    //Assign Invoice Based on Igm
    assignInvoiceBasedIgm(assign_igm){
        // console.log("assign = "+JSON.stringify(Assign_IGM))
        return axios.post(operation_ABI_BASE_URL+"/AssignInvoice",assign_igm);
    }
    //viewIGM
    getInvoiceBasedIgm(igm_id){
        return axios.get(operation_ABI_BASE_URL+"/getInvoiceBasedIgm?IGM_ID="+igm_id);
    }
    //removeIGM
    removeIgm(invoice_id,igm_id){
        return axios.delete(operation_ABI_BASE_URL+"/removeIGM?Invoice_id="+invoice_id+","+igm_id);
    }
   //get IGM BASED IGM NO
   getIGMdetailsSelected(igm_no){
       return axios.get(operation_ABI_BASE_URL+"/getIGMdetailsBasedIGMNo?IGM_No="+igm_no)
   }
   //updateInvoice
   UpdateInvoice(invoice_id,invoice_details){
       return axios.post(operation_ABI_BASE_URL+"/updateInvoice?Invoice_ID="+invoice_id,invoice_details);
   }
   //getPkgeList
   getPackagList(invice_id){
       return axios.get(operation_ABI_BASE_URL+"/getPkgList?Invoiceid="+invice_id);
   }
   //updatePkgList
   updatePackageList(invice_id,invoice_packgedata){
       return axios.put(operation_ABI_BASE_URL+"/updatePkgList?Invoice_ID="+invice_id,invoice_packgedata);
   }
   //getDataCorrectionForWight
   getDataCorrectionForWight(consigment_no,filter_value){
       return axios.get(operation_ABI_BASE_URL+"/getWight?ConsimentNo="+consigment_no+"&FilterValue="+filter_value);
   }
   //getDataCorrectionForItemValue
   getDataCorrectionForItemValue(invice_data_to){
       return axios.post(operation_ABI_BASE_URL+"/getItemValue",invice_data_to);
   }
   //getDataCorrectionpkgList
   getDataCorrectionpkgList(consigment_no,filter_value){
       return axios.get(operation_ABI_BASE_URL+"/getDataCorrectionPkgList?ConsimentNo="+consigment_no+"&FilterValue="+filter_value);
   }
   getSUMMARY(consigment){
       return axios.get(operation_ABI_BASE_URL+"/getSummary?ConsigmentNo="+consigment);
   }
}
export default new OprationServices();