import { Component } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidenavbar',
  templateUrl: './sidenavbar.component.html',
  styleUrls: ['./sidenavbar.component.css']
})
export class SidenavbarComponent {

  constructor(public authService:AuthService , private router:Router) {

  }

  onLogout(){
    this.authService.logout();
    this.router.navigate(['signin']);
  }

   // name1 = this.signin.customerName;
  CustomerName = localStorage.getItem('userName')
  CustomerId = localStorage.getItem('userId')

}
