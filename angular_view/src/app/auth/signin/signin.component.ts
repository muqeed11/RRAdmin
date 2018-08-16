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
   token : String;
  customerName:String;

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
     this.authService.signinUser(user)
       .subscribe(
         data => {
           console.log(data);
           this.res = data['responseStatus'];
           this.token = data['token'];
           this.customerName = data['customerName'];
           // console.log(this.res +" "+ this.token + this.customerName)
           if(this.res ==  '0') {
             localStorage.setItem('token',data['token'])
             localStorage.setItem('userId',data['userId'])
             localStorage.setItem('customerName',data['customerName'])


             this.router.navigate(['/dashboard'])
           }
           else window.alert('Invalid User')
           // else this.errorMsg="invalid user"
         },
         error=> console.log(error)
       );

     form.resetForm();
}
  }
