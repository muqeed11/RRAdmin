import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {ServerService} from "../../server.service";
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {User} from "../user.model";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  credentials = []

  constructor(private authService: AuthService ,
              private router:Router) { }

  ngOnInit() {
  }

  onSignup(form: NgForm) {

    const userName = form.value.userid;
    const password = form.value.password;
    const emailid = form.value.email;

    const user = new User(userName,password);


    // this.serverService.storeServers(this.credentials)
    //   .subscribe(
    //     (response) => console.log(response),
    //     (error)=>console.log(error)
    //     this.router.navigate(['/signin'])
    //   );

    this.authService.signupUser(user)
      .subscribe(
        (response) => console.log(response),
        (error)=>console.log(error)
        // this.router.navigate(['/signin'])
      );
  }

}
