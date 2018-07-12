import { Component } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";
import {SigninComponent} from "../auth/signin/signin.component";

@Component({
  selector: 'app-sidenavbar',
  templateUrl: './sidenavbar.component.html',
  styleUrls: ['./sidenavbar.component.css']
})
export class SidenavbarComponent {

  constructor(protected authService:AuthService , private router:Router) {

  }

  onLogout(){
    this.authService.logout();
    this.router.navigate(['signin']);
  }

   name1 = this.authService.userName;

}
