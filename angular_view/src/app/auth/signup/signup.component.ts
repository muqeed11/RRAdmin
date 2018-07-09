import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {ServerService} from "../../server.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  credentials = []

  constructor(private serverService: ServerService) { }

  ngOnInit() {
  }

  onSignup(form: NgForm) {

    const userid = form.value.userid;
    const password = form.value.password;
    this.credentials=[
      {
        username: userid,
        password: password
      }
    ];
    this.serverService.storeServers(this.credentials)
      .subscribe(
        (response) => console.log(response),
        (error)=>console.log(error)
      );

  }

}
