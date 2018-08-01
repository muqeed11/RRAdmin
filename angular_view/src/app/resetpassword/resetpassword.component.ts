import { Component, OnInit } from '@angular/core';
import {ServerService} from "../server.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  userid:String;
  password:String;
  constructor(private server:ServerService) { }

  ngOnInit() {
  }

  passwordReset(form:NgForm) {

    this.userid = form.value.pwdresetid;

    console.log(this.userid)
    this.password = this.userid + '123';

    let body: any = {"userId": this.userid,"newPassword":this.password }
    console.log(body)

    this.server.resetPassword(body)
      .subscribe(
        (res) => {
          console.log(res)
        }
      )



  }

}
