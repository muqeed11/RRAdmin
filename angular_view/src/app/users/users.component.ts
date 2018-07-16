import {Component, OnInit} from '@angular/core';
import {Subject} from "rxjs/Subject";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../auth/user.model";


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private http:HttpClient) { }

  results : any =[] ;
  userinfo : any=  [
    {
      userid:"aa",
      password: "aa"

    }]
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
   ngOnInit() {
     this.dtOptions = {
       pagingType:'full_numbers',
       pageLength:10
     };

     const headers = new HttpHeaders({'Content-Type':'application/json'});
     const body=JSON.stringify(this.userinfo);


     this.http.post('http://192.168.134.1:3000/listofcustomers/customerdetails',this.userinfo,{headers:headers})
      .subscribe(
        (res)=>
        {
          this.results = res['customerDetails'];
          console.log(this.results);
          this.dtTrigger.next();

        }
      )
  }

}
