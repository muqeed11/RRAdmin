import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {ServerService} from "../server.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-changeownpwd',
  templateUrl: './changeownpwd.component.html',
  styleUrls: ['./changeownpwd.component.css']
})
export class ChangeownpwdComponent implements OnInit {

  constructor(private server:ServerService,private router:Router) { }

  password:String;
  newpassword:String;
  confirmpassword:String;
  userId:String;

  ngOnInit() {
  }
  passwordReset(form:NgForm) {

    this.newpassword = form.value.newpassword;
    this.password = form.value.password;
    this.confirmpassword = form.value.confirmpassword;
    this.userId = localStorage.getItem('userId')

    if(this.newpassword === this.confirmpassword) {
      let body: any = {"userId":this.userId,"password": this.password,"newPassword":this.newpassword }

      this.server.changePassword(body)
        .subscribe(
          (res) => {
            console.log(res)
            if (res['responseStatus'] == '0') {
              window.alert(res['response'])
              form.resetForm()
              this.router.navigate(['/dashboard'])
            }

          else
              window.alert(res['response'])

          }
        )
    }

    else
    {
      window.alert("New password and Confirm password do not match..!")
    }
  }

}
