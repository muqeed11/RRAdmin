import {Injectable} from "@angular/core";
import 'rxjs/Rx';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ServerService {
 constructor(private http: HttpClient){}

 storeServers(servers: any[]){
   // return this.http.post('https://rrdummy-669b4.firebaseio.com/laboure1.json',servers);
   return this.http.post('https://assetmanagepoc.firebaseio.com/laboure1.json',servers);
 }

  getReport(rid:string,userid:string){
   return this.http.get('./../assets/sampleJSON/showReport.json');
  }

  getUserInformation(userid:string){
   return this.http.get('./../assets/sampleJSON/userreports.json')
  }

  updateUserInformation(userInformation:any[])
  {
    // return this.http.post('./../assets/userreports.json',userInformation)
    return this.http.get('./../assets/sampleJSON/userreports3.json')
  }

  delReport(rid:string,userid:string){

   const body = { "rid":rid,"userid":userid,"action":"Deleted"}
   // return this.http.post('./../assets/sampleJSON/userreports2.json',body)
   return this.http.get('./../assets/sampleJSON/userreports2.json')
    //@Server side : if successful , call geruserinformation service and send the data
  }


  approveReport(rid:string,userid:string){
    const body = { "rid":rid,"userid":userid,"action":"Deleted"}
    // return this.http.post('./../assets/sampleJSON/userreports2.json',body)
    return this.http.get('./../assets/sampleJSON/userreports.json')
    //@Server side : if successful , call geruserinformation service and send the data
  }


  rejReport(rid:string,userid:string){

    const body = { "rid":rid,"userid":userid,"action":"Rejected"}
    // return this.http.post('./../assets/sampleJSON/userreports.json',body)
    return this.http.get('./../assets/sampleJSON/userreports2.json')
    //@Server side : if successful , call geruserinformation service and send the data
  }

}
