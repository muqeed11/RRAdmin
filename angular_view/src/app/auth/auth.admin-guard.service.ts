import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";

@Injectable()
export class AdminGuard  implements CanActivate{
  constructor(private authService:AuthService,private router:Router){}

  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot) {
    return this.authService.isAdmin();
  }


}
