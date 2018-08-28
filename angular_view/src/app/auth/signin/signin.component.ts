import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
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


     this.authService.signinUser(user)
       .subscribe(
         data => {
           this.res = data['responseStatus'];
           this.token = data['token'];
           this.customerName = data['userName'];
           if(this.res ==  '0') {
             if (data['userRole'] == 'MobileUser' || data['userRole'] == null ) {
               window.alert('You are not authorized to login here.')
             }
             else {
             localStorage.setItem('token', data['token'])
             localStorage.setItem('userId', data['userId'])
             localStorage.setItem('userName', data['userName'])
               if(data['userRole'] == 'Admin') {
                 localStorage.setItem('role', data['userRole'])
                 this.router.navigate(['/dashboard'])
               }
               else
                 this.router.navigate(['/dashboardLabUser'])
             }
           }
           else window.alert('Invalid User')
         },
         error=> console.log(error)
       );

     form.resetForm();
}
  }
