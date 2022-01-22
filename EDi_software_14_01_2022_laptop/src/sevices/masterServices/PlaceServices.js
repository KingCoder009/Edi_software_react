import axios from '../../axiosInstance';

const Place_ABI_BASE_URL = "/master/place";
class PlaceServices {
    getCountry() {
        console.log("getcountry");
        return axios.get(Place_ABI_BASE_URL + "/getcountry");
    }
    addCountry(Country) {
        return axios.post(Place_ABI_BASE_URL + "/addCountry", Country);
    }
    updateCountry(countryId, Country) {
        return axios.put(Place_ABI_BASE_URL + "/updatecountry?countryId=" + countryId, Country);
    }

    deleteCountry(countryId) {
        return axios.delete(Place_ABI_BASE_URL + '/DeleteCountry?countryId=' + countryId);
    }

    //state Details

    getState() {
        console.log("test");
        return axios.get(Place_ABI_BASE_URL + "/getState");
    }
    addState(StateDetails) {
        return axios.post(Place_ABI_BASE_URL + "/addState", StateDetails);
    }
    updateState(stateid, StateDetails) {
        return axios.put(Place_ABI_BASE_URL + "/updateState?StateId=" + stateid, StateDetails);
    }

    deleteState(stateid) {
        return axios.delete(Place_ABI_BASE_URL + '/DeleteState?StateId=' + stateid);
    }
    //clearanceLocetion
    getClearanceLocetion() {
        return axios.get(Place_ABI_BASE_URL + '/getLocetion');
    }
    getClrLocState(Countryid) {
        console.log("clr");
        return axios.get(Place_ABI_BASE_URL + "/getClrLocState?CountryId=" + Countryid);
    }
    //Insert Clearance Location
    addClearanceLocetion(ClearanceLocetion) {
        return axios.post(Place_ABI_BASE_URL + "/addLocetion", ClearanceLocetion);
    }
    //Update Clearance Location
    updateClearanceLocetion(ClearanceLocetion_Id, ClearanceLocetion) {
        return axios.put(Place_ABI_BASE_URL + "/updateClrLoc?ClrLocetionId=" + ClearanceLocetion_Id, ClearanceLocetion);
    }
    //Delete Clearance Locetion
    deleteClearanceLocetion(Point_Id) {
        return axios.delete(Place_ABI_BASE_URL + "/DeleteClrLoc?PointId=" + Point_Id);
    }
    //clearence organizetion
    getClearncOrgs() {
        return axios.get(Place_ABI_BASE_URL + '/getClrOrgs');
    }
    //Insert ClrOrganizetion
    addClearanceOrganizetion(ClearanceOrganizetion) {
        return axios.post(Place_ABI_BASE_URL + "/addClrOrgs",ClearanceOrganizetion);
    }
    //Update ClearanceOrganizetion
    updateClearanceOrganizetion(point_Id, ClearanceOrganizetion) {
        return axios.put(Place_ABI_BASE_URL + "/updateClrOrgs?point_id="+point_Id, ClearanceOrganizetion)
    }
    //Delete ClearanceOrganizetion
    deleteClearanceOrganizetion(point_Id) {
        return axios.delete(Place_ABI_BASE_URL + "/DeleteClrOrgs?point_id="+point_Id);
    }
    //get cntry based origin 
    getOrginCompany(countryId) {
        console.log('getParentOrginCompany =>' + JSON.stringify(countryId));
        return axios.get(Place_ABI_BASE_URL + "/getOrgin?countryId=" + countryId);
    }
    //get Parent Origin
    getParentOrigin() {
        return axios.get(Place_ABI_BASE_URL + "/getParentOrgin")
    }
    //Insert Parent Origin
    addParentOrgin(ParentOrgin) {
        return axios.post(Place_ABI_BASE_URL + "/addParentOrigin", ParentOrgin);
    }
    //Update Parent Orgin
    updateParentOrgin(pointId, OrginCompany_Id, ParentOrgin) {
        return axios.put(Place_ABI_BASE_URL + "/UpdateParentOrigin?point_id=" + pointId + "&OriginID=" + OrginCompany_Id, ParentOrgin);
    }
    //Delete Parent Orgin
    deleteParentOrgin(PointId) {
        return axios.delete(Place_ABI_BASE_URL + "/DleteParentOrigin?PointId="+PointId)
    }

    //get clr origin
    getClearanceOrigin() {
        return axios.get(Place_ABI_BASE_URL + "/getClearance/Orgin")
    }
    //InsertOriginCompeny
    addOrginCompany(OrginCompany) {
        return axios.post(Place_ABI_BASE_URL + "/addOrigin", OrginCompany);
    }
    //UpdateOrginCompany
    updateOrginCompany(pointId, OrginCompany_Id, OrginCompany) {
        return axios.put(Place_ABI_BASE_URL + "/UpdateOrigin?point_id="+pointId+"&OriginID="+OrginCompany_Id,OrginCompany);
    }
    //DeleteOrginCompany
    deleteOrginCompany(point_id) {
        return axios.delete(Place_ABI_BASE_URL + "/DleteOrigin?OriginID="+point_id)
    }
}
export default new PlaceServices();