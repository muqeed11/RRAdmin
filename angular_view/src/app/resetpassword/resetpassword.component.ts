import { Component, OnInit } from '@angular/core';
import {ServerService} from "../server.service";
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  userId:String;
  customerId:String;
  password:String;
  constructor(private server:ServerService,private authService:AuthService,private router:Router) { }

  ngOnInit() {
  }

  passwordReset(form:NgForm) {

    this.customerId = form.value.pwdresetid;
    this.userId = localStorage.getItem('userId');

    console.log(this.customerId)
    this.password = this.customerId + '123';

    let body: any = {"customerId": this.customerId,"newPassword":this.password , "userId":this.userId }
    console.log(body)

    this.server.resetPassword(body)
      .subscribe(
        (res) => {
          if(res['responseStatus'] == '99') {
            if (res['error'].name == 'TokenExpiredError') {
              window.alert('Session Expired , Please login again..!')
              this.authService.logout();
              this.router.navigate(['signin']);            }
          }
          else
            if(res['responseStatus'] == '0') {
              window.alert('Password is reset.');
            }
            else
            window.alert(res['response']);
        }
      )



  }

}
