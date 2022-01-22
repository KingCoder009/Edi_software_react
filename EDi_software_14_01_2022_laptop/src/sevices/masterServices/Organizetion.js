import axios from '../../axiosInstance';

const ORGANIZETION_ABI_BASE_URL = "/master/organizetion";
class Organizetion {
//getCompany
getCompany(){
    console.log("test")
    return axios.get(ORGANIZETION_ABI_BASE_URL+"/getCompany");
}
//insert company
addCompany(Company){
    return axios.post(ORGANIZETION_ABI_BASE_URL+"/addCompany",Company);
}
//update company
updateCompany(point_id,Company){
    return axios.put(ORGANIZETION_ABI_BASE_URL+"/updateCompany?point_id="+point_id,Company);
}
//delete company
deleteCompany(point_id){
   
    return axios.delete(ORGANIZETION_ABI_BASE_URL+"/deleteCompany?point_id="+point_id);
}

//getDesignetion
getDesignetion() {
    return axios.get(ORGANIZETION_ABI_BASE_URL + '/getDesignetion');
}

//addDesignation
addDesignation(Desgination) {
    return axios.post(ORGANIZETION_ABI_BASE_URL + '/addDesignation',Desgination);
}
//updateDesignation
updateDesignation(disg_Id,Desgination) {
    return axios.put(ORGANIZETION_ABI_BASE_URL + '/updateDesignation?disg_Id='+disg_Id,Desgination);
}
//deleteDsignation
deleteDsignation(Desig_id) {
    return axios.delete(ORGANIZETION_ABI_BASE_URL + '/deleteDsignation?disg_Id='+Desig_id);
}

//getDepartment
getDepartment()
{
    return axios.get(ORGANIZETION_ABI_BASE_URL+"/getDpartment");
}

//insert Department
addDepartment(department){
    return axios.post(ORGANIZETION_ABI_BASE_URL+"/addDepartment",department);
}

//update Department
updateDepartment(dprtmntId,Department)
{
    return axios.put(ORGANIZETION_ABI_BASE_URL+"/updateDeprtmnt?dprtmnt_Id="+dprtmntId,Department);
}

//delete DepartMent
deleteDepartment(dprtmntId){
    return axios.delete(ORGANIZETION_ABI_BASE_URL+"/deleteDepartmnt?dprtmnt_Id="+dprtmntId);
}

//get point type
getPointType(){
    return axios.get(ORGANIZETION_ABI_BASE_URL+"/getPointType");
}
//get WorkLocetion
getWorkLocation(point_id,Cntry_id)
{
    return axios.get(ORGANIZETION_ABI_BASE_URL+"/getwrklocation?pointId="+point_id+"&cntryId="+Cntry_id);
}

//get employee
getEmployee()
{
    return axios.get(ORGANIZETION_ABI_BASE_URL+"/getEmplaye");
}

//insert Employee
addEmploye(employee)
{
    return axios.post(ORGANIZETION_ABI_BASE_URL+"/addEmployee",employee);
}

//update Employee
updateEmployee(emp_id,employee)
{
    return axios.put(ORGANIZETION_ABI_BASE_URL+"/updateEmployee?Emp_Id="+emp_id,employee);
}

//delete Employee
deleteEmployee(emp_id)
{
    return axios.delete(ORGANIZETION_ABI_BASE_URL+"/deleteEmployee?Emp_Id="+emp_id);
}

}
export default new Organizetion();