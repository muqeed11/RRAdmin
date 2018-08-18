import {Injectable} from "@angular/core";
import 'rxjs/Rx';
import {HttpClient} from "@angular/common/http";
import {LabUser} from "./auth/labuser.model";

@Injectable()
export class ServerService {
 constructor(private http: HttpClient){

 }

 //
 //
 // storeServers(servers: any[]){
 //   // return this.http.post('https://rrdummy-669b4.firebaseio.com/laboure1.json',servers);
 //   return this.http.post('http://192.168.134.1:3000/user',servers);
 // }

  updatePayments(body:any[]) {
    var token =localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    return this.http.post('http://192.168.134.1:3000/payments/transactions'+token,body)

  }


  validateCustomer(body:any[]) {
    var token =localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    return this.http.post('http://192.168.134.1:3000/editcustomer/validateCustomer'+token,body)

  }

  UploadReports(body:any[]) {
    var token =localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    return this.http.post('http://192.168.134.1:3000/reports/uploadLabReport' ,body)

  }


  uploadFile(fileToUpload:File) {
   const endpoint = 'http://192.168.134.1:3000/labuser/reportUpload';
   const formData : FormData = new FormData();
   formData.append('filekey',fileToUpload,fileToUpload.name);
   return this.http.post(endpoint,formData)
     .map(() => {return true});
     // .catch((e) => this.handleError(e));
  }

  resetPassword(body:any[]) {
    var token =localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    return this.http.post('http://192.168.134.1:3000/editcustomer/resetPassword' + token,body);

  }

  changePassword(body:any[]) {
      var token =localStorage.getItem('token')
        ? '?token=' + localStorage.getItem('token')
        : '';
      return this.http.post('http://192.168.134.1:3000/editcustomer/changePassword' + token,body);


  }

  registerLabUser(labuser:LabUser) {
    var token =localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    return this.http.post('http://192.168.134.1:3000/userprofile/register'+token,labuser);

  }

  sendMessage(body:any[]) {
    var token =localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    return this.http.post('http://192.168.134.1:3000/SendMessage/messageToCustomer'+token,body);

  }


  getReport(body: any[]){
    var token =localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';

   // console.log(body)
   //  const body1 = JSON.stringify(body)
   //  console.log(body1)

    // return this.http.get('./../assets/sampleJSON/showReport.json');
   return this.http.post('http://192.168.134.1:3000/reportsAdmin/showreportAdmin'+token,body);
  }

  getUserInformation(userid:any[]){
    var token =localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
   return this.http.post('http://192.168.134.1:3000/editcustomer/customerid'+token,userid)
  }

  updateUserInformation(userInformation:any[])
  {
    var token =localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    // return this.http.post('./../assets/userreports.json',userInformation)

    // return this.http.get('./../assets/sampleJSON/userreports3.json')
    return this.http.post('http://192.168.134.1:3000/editcustomer/customerupdate'+token,userInformation)
  }

  delReport(body:any[]){
    var token =localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
   // const body = { "rid":rid,"userid":userid,"action":"Deleted"}
   // return this.http.post('./../assets/sampleJSON/userreports2.json',body)
   return this.http.post('http://192.168.134.1:3000/reportsAdmin/delreportAdmin'+token,body);
    //@Server side : if successful , call geruserinformation service and send the data
  }


  approveReport(body:any[]){
    var token =localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    // const body = { "rid":rid,"userid":userid,"action":"Deleted"}
    // return this.http.post('./../assets/sampleJSON/userreports2.json',body)
    return this.http.post('http://192.168.134.1:3000/reportsAdmin/approvereportAdmin'+token,body);
    //@Server side : if successful , call geruserinformation service and send the data
  }


  rejReport(body:any[]){

    var token =localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    // const body = { "rid":rid,"userid":userid,"action":"Rejected"}
    // return this.http.post('./../assets/sampleJSON/userreports.json',body)
    return this.http.post('http://192.168.134.1:3000/reportsAdmin/rejreportAdmin'+token,body);
    //@Server side : if successful , call geruserinformation service and send the data
  }

}
