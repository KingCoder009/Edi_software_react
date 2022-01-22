import axios from '../../axiosInstance';

const Shipment_ABI_BASE_URL = "/master/Shipment";
class ShipmentServices  {
    getClearanceShipment(){
        return axios.get(Shipment_ABI_BASE_URL+'/getShipmnt');
    }
    addShipment(ShipmentCompany){
        return axios.post(Shipment_ABI_BASE_URL+'/AddShipmnt',ShipmentCompany);
    }
    updateShipment(shipmnt_id,ShipmentCompany){
        return axios.put(Shipment_ABI_BASE_URL+'/UpdateShipmnt?Shipmnt_Id='+shipmnt_id,ShipmentCompany);
    }
    deleteShipmwent(ShipmntId){
        return axios.delete(Shipment_ABI_BASE_URL+'/DeleteShipmnt?Shipmnt_Id='+ShipmntId);
    }
    getTransitType(){
        return axios.get(Shipment_ABI_BASE_URL+'/getTrnsit');
    }
    addTrnsit(trnsitType){
        return axios.post(Shipment_ABI_BASE_URL+'/addTrnsitTyp',trnsitType);
    }
    updateTransit(trnsitTypeId,trnsitType){
        return axios.put(Shipment_ABI_BASE_URL+'/UpdateTrnsitTyp?Trnsit_Id='+trnsitTypeId,trnsitType);
    }
    DeleteTransitType(trnsitTypeId){
        return axios.delete(Shipment_ABI_BASE_URL+'/DeleteTrnsitTyp?Trnsit_Id='+trnsitTypeId);
    }
}

export default new ShipmentServices();