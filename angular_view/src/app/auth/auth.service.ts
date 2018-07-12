import {Injectable} from "@angular/core";
import {HttpClient,HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {User} from "./user.model";
import 'rxjs/Rx' ;

@Injectable()
export class AuthService {

  token:String;
  errorMsg:String;
  userName:String;
  res:String;


  constructor(private http:HttpClient , private router:Router){}

  signinUser(user:User) {

    const headers = new HttpHeaders({'Content-Type':'application/json'})

    console.log(user);
    const body=JSON.stringify(user);
    console.log('body' + body)
    // const user = new User(userid,password)
    // this.http.post('http://192.168.134.1:8080/MedReports/medstore/login/validateLogin',body)
     this.http.post('http://localhost:3000/userauth/signin',body,{headers:headers})
       .subscribe(
         data => {
           console.log(data);
           this.res = data['responseStatus'];
           this.token = data['token'];
           this.userName = data['userName'];
           console.log(this.res +" "+ this.token + this.userName)
           if(this.res ==  '0')
             this.router.navigate(['/dashboard'])
           else window.alert('Invalid User')
           // else this.errorMsg="invalid user"
         },
         error=> console.log(error)
       );
     //  .map((response: Response) => response.json())
     //  .catch((error: Response) => Observable.throw(error.json()));
     // // .subscribe(
     // //   (res)=> {
     //     console.log(res)
     //     this.result = res['responseStatus']
     //     console.log('resultq' + this.result)
     //     this.token  = res['token']
     //     this.name = res['userName']
     //      if (this.result == '0')
     //     this.router.navigate(['/dashboard'])

       // });
    // this.result='0'
    // this.token='testtoken'
    // this.name = 'Muqeet Ahmed'
    // this.router.navigate(['/dashboard'])
    // return this.result
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
    return this.token!=null;
  }

  logout()
  {
    this.token=null;
  }
}
