import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {ServerService} from "../server.service";
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-labuserdashboard',
  templateUrl: './labuserdashboard.component.html',
  styleUrls: ['./labuserdashboard.component.css']
})
export class LabuserdashboardComponent implements OnInit {

  customerDetails : any=[] ;
  constructor(private server:ServerService,private authService:AuthService,
              private router:Router) { }

  ngOnInit() {

      const userid = localStorage.getItem('userId');
      const body:any = {"userId":userid} ;

      this.server.getLabUserInformation(body)
        .subscribe(
          (res)=>
          {
            if(res['responseStatus'] == '99') {
                this.authService.logout();
              window.alert(res['response'])
              this.router.navigate(['signin']);
            }


            if(res['responseStatus']==='0'){
              this.customerDetails = res['customerDetails'];
            }
            else if(res['responseStatus']=='1') {
              window.alert("Error while fetching details..!")
            }
          }
        )
    }


}
