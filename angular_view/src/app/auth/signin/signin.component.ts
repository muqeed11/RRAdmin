import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {User} from "../user.model";


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  res:String;
  userName:String;
   errorMsg : String;

 // constructor(private serverService: ServerService) { }
  constructor(private http:HttpClient , private router:Router,
  private authService:AuthService){}

  ngOnInit() {
  }

  onSignin(form: NgForm) {

    const userid = form.value.userid;
    const password = form.value.password;
    const user = new User(userid,password);



    // const body = {"userName":userid,"password":password};
    // console.log("userid and pwd:" + User.userid + user.password);
     this.authService.signinUser(user);
    // this.errorMsg = this.authService.errorMsg;
    // console.log(this.authService.errorMsg)

       // .subscribe(
       //   data => {
       //     console.log(data);
       //     const res = data['responseStatus'];
       //     const token = data['token'];
       //     this.userName = data['userName'];
       //     console.log(res + token + this.userName)
       //     if(res ==  '0')
       //       this.router.navigate(['/dashboard'])
       //     else this.errorMsg="invalid user"
       //   },
       //   error=> console.log(error)
       // );

}
  }
