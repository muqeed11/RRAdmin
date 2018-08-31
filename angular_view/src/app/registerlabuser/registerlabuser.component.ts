import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {ServerService} from "../server.service";
import {LabUser} from "../auth/labuser.model";
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";



@Component({
  selector: 'app-registerlabuser',
  templateUrl: './registerlabuser.component.html',
  styleUrls: ['./registerlabuser.component.css']
})
export class RegisterlabuserComponent implements OnInit {

  constructor(private server:ServerService,private authService:AuthService,private router:Router) { }

  ngOnInit() {
  }
  RegisterLabUser(form:NgForm) {

    console.log(form.value)

    const labuserid = form.value.userid;
    const password = form.value.userid + "123";
    const labname = form.value.labname;
    const email = form.value.email;
    const area = form.value.area;
    const city = form.value.city;
    const customerrole = "LabUser";
    const doctorname = form.value.doctorname;
    const labphonenum = form.value.labnum;

    const userId = localStorage.getItem('userId')

    const labuser = new LabUser(labuserid,password,labname,email,area,city,
      labphonenum,doctorname,customerrole,userId)

console.log(labuser)
    this.server.registerLabUser(labuser)
      .subscribe(
        (res)=>
        {
          const result = res['responseStatus'];
          if(res['responseStatus'] == '99') {
            if (res['error'].name == 'TokenExpiredError') {
              window.alert('Session Expired , Please login again..!')
              this.authService.logout();
              this.router.navigate(['signin']);
            }
          }
          else
          if(result == '0')
            window.alert("Lab user is created . Login ID :" + labuserid +
              " and Password: " + labuserid + "123")
          form.resetForm();
          console.log(res)
        }
      )
  }
}
