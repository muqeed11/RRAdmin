import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  res:String;
  token:String;
  errorMsg:String;

 // constructor(private serverService: ServerService) { }
  constructor(private http:HttpClient , private router:Router,
  private authService:AuthService){}

  ngOnInit() {
  }

  onSignin(form: NgForm) {

    const userid = form.value.userid;
    const password = form.value.password;

    const body = {"userName":userid,"password":password};
    console.log("userid and pwd:" + body.password + body.userName);

    this.res = this.authService.signinUser(userid,password) ;
          if(this.res=='1')
            this.errorMsg="invalid user"


}
  }
