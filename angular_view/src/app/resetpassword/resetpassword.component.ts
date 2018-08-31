import { Component, OnInit } from '@angular/core';
import {ServerService} from "../server.service";
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";
import {Subject} from "rxjs/Subject";

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  userId:String;
  customerId:String;
  password:String;

  private ngUnsubscribe: Subject<any> = new Subject<any>()

  constructor(private server:ServerService,private authService:AuthService,private router:Router) { }

  ngOnInit() {
  }

  passwordReset(form:NgForm) {

    this.customerId = form.value.pwdresetid;
    this.userId = localStorage.getItem('userId');

    // console.log(this.customerId)
    this.password = this.customerId + '123';

    let body: any = {"customerId": this.customerId,"newPassword":this.password , "userId":this.userId }
    // console.log(body)

    this.server.resetPassword(body)
      .subscribe(
        (res) => {
          if(res['responseStatus'] == '99') {
            // if (res['error'].name == 'TokenExpiredError') {
            //   window.alert('Session Expired , Please login again..!')
            //   this.authService.logout();
            //   this.router.navigate(['signin']);
          // }
            window.alert(res['response']);
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

  // ngOnDestroy() {
  //   this.ngUnsubscribe.next();
  //   this.ngUnsubscribe.complete();
  // }
}
