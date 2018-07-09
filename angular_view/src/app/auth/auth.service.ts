import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable()
export class AuthService {

  token:String;
  result:String;
  name:String;


  constructor(private http:HttpClient , private router:Router){}

  signinUser(userid: string, password: string) {

    const body = {"userName":userid,"password":password};
    this.http.post('http://192.168.134.1:8080/MedReports/medstore/login/validateLogin',body)
     // .subscribe(
     //   (res)=> {
     //     this.result = res['root'].responseStatus
     //      this.token  = res['root'].key
     //     this.name = res['root'].name
     //     console.log('result' + this.result)
     //      if (this.result == "0")
     //     this.router.navigate(['/dashboard'])
     //   } );
    this.result='0'
    this.token='testtoken'
    this.name = 'Muqeet Ahmed'
    this.router.navigate(['/dashboard'])
    return this.result
  }

  isAuthenticated()
  {
    return this.token!=null;
  }

  logout()
  {
    this.token=null;
  }
}
