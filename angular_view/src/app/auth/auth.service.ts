import {Injectable} from "@angular/core";
import {HttpClient,HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {User} from "./user.model";
import 'rxjs/Rx' ;
import {catchError} from "rxjs/operators";
import {ErrorService} from "../error/error.service";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AuthService {

  token:String;
  errorMsg:String;
  customerName:String;
  res:String;


  constructor(private http:HttpClient , private router:Router,private errorService:ErrorService){}

  signinUser(user:User) {

    const headers = new HttpHeaders({'Content-Type':'application/json'})

    const body=JSON.stringify(user);
     return this.http.post('http://192.168.134.1:3000/userauth/signin',body,{headers:headers})
    //    .map((response:Response) => response.json())
    // .catch((error:Response) => {
    //      this.errorService.handleError(error.json())
    //      return Observable.throw(error.json())
    //    });

       // .subscribe(
       //   data => {
       //     console.log(data);
       //     this.res = data['responseStatus'];
       //     this.token = data['token'];
       //     this.customerName = data['customerName'];
       //     console.log(this.res +" "+ this.token + this.customerName)
       //     if(this.res ==  '0')
       //       this.router.navigate(['/dashboard'])
       //     else window.alert('Invalid User')
       //     // else this.errorMsg="invalid user"
       //   },
       //   error=> console.log(error)
       // );
  }

  signupUser(user:User){
    const body=JSON.stringify(user);
    const headers = new HttpHeaders({'Content-Type':'application/json'})
    return this.http.post('http://localhost:3000/register',body,{headers:headers})
      // .map((response: Response) => response.json())
      .map((response: Response) => console.log(response));
      // .catch((error: Response) => Observable.throw(error.json()));

  }

  isAuthenticated()
  {
    // console.log('inside isauthenticated ' , localStorage.getItem('token'))
    return localStorage.getItem('token') !== null
  }

  isAdmin()
  {
    // console.log('inside isauthenticated ' , localStorage.getItem('token'))
    return localStorage.getItem('role') == 'Admin'
  }

  isAdminLabUser() {
    if((localStorage.getItem('role') == 'Admin' ) || (localStorage.getItem('role') == 'LabUser' || localStorage.getItem('role') == null) )
    return true
    else
      false

  }
  isLabUser(){

    if((localStorage.getItem('role') == 'LabUser') || (localStorage.getItem('role') == null))
      return true
    else
      return false
  }

  logout()
  {
    // console.log('inside logout authserv')
    // this.token=null;
    localStorage.clear();
  }
}
