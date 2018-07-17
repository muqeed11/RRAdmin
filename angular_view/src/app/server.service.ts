import {Injectable} from "@angular/core";
import 'rxjs/Rx';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ServerService {
 constructor(private http: HttpClient){}

 storeServers(servers: any[]){
   // return this.http.post('https://rrdummy-669b4.firebaseio.com/laboure1.json',servers);
   return this.http.post('http://localhost:3000/user',servers);
 }

  sendMessage(body:any[]) {
    return this.http.post('http://192.168.134.1:3000/SendMessage/messageToCustomer',body);

  }


  getReport(body: any[]){

   // console.log(body)
   //  const body1 = JSON.stringify(body)
   //  console.log(body1)

    // return this.http.get('./../assets/sampleJSON/showReport.json');
   return this.http.post('http://192.168.134.1:3000/reportsAdmin/showreportAdmin',body);
  }

  getUserInformation(userid:any[]){
   return this.http.post('http://192.168.134.1:3000/editcustomer/customerid',userid)
  }

  updateUserInformation(userInformation:any[])
  {

    // return this.http.post('./../assets/userreports.json',userInformation)

    // return this.http.get('./../assets/sampleJSON/userreports3.json')
    return this.http.post('http://192.168.134.1:3000/editcustomer/customerupdate',userInformation)
  }

  delReport(body:any[]){

   console.log(body)
   // const body = { "rid":rid,"userid":userid,"action":"Deleted"}
   // return this.http.post('./../assets/sampleJSON/userreports2.json',body)
   return this.http.post('http://192.168.134.1:3000/reportsAdmin/delreportAdmin',body);
    //@Server side : if successful , call geruserinformation service and send the data
  }


  approveReport(body:any[]){
    // const body = { "rid":rid,"userid":userid,"action":"Deleted"}
    // return this.http.post('./../assets/sampleJSON/userreports2.json',body)
    return this.http.post('http://192.168.134.1:3000/reportsAdmin/approvereportAdmin',body);
    //@Server side : if successful , call geruserinformation service and send the data
  }


  rejReport(body:any[]){

    // const body = { "rid":rid,"userid":userid,"action":"Rejected"}
    // return this.http.post('./../assets/sampleJSON/userreports.json',body)
    return this.http.post('http://192.168.134.1:3000/reportsAdmin/rejreportAdmin',body);
    //@Server side : if successful , call geruserinformation service and send the data
  }

}
