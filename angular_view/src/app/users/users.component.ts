import {Component, OnInit} from '@angular/core';
import {Subject} from "rxjs/Subject";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../auth/user.model";
import {Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private http:HttpClient,private router:Router,private authService:AuthService) { }

  results : any =[] ;
  body :any = { userId : localStorage.getItem('userId') };

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
   ngOnInit() {
     this.dtOptions = {
       pagingType:'full_numbers',
       pageLength:10
     };

     const headers = new HttpHeaders({'Content-Type':'application/json'});
     const token =localStorage.getItem('token')
       ? '?token=' + localStorage.getItem('token')
       : '';

     this.http.post('http://192.168.134.1:3000/listofcustomers/customerdetails'+ token,this.body,{headers:headers})
      .subscribe(
        (res)=>
        {
          if(res['responseStatus']=='0') {
            this.results = res['customerDetails'];
            this.dtTrigger.next();
          }

          else
            if(res['responseStatus']=='99') {
              // if (res['error'].name == 'TokenExpiredError') {
              //   window.alert('Session Expired , Please login again..!')
              //   this.authService.logout();
              //   this.router.navigate(['signin']);
              // }
              window.alert(res['response']);
                this.authService.logout();
                this.router.navigate(['signin']);
            }
            else
              window.alert(res['response'])
        }
      )
  }

}
