import {Component} from "@angular/core";
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(protected authService:AuthService , private router:Router){

  }

  onLogout(){
    this.authService.logout();
    this.router.navigate(['signin']);
  }
  showDashboard(){

  }
}
