import {Component, OnInit} from '@angular/core';
import {Subject} from "rxjs/Subject";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private http:HttpClient) { }

  results : any =[] ;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
   ngOnInit() {
     this.dtOptions = {
       pagingType:'full_numbers',
       pageLength:10
     };
    this.http.get('./../assets/sampleJSON/userslist.json')
      .subscribe(
        (res)=>
        {
          this.results = res;
          this.dtTrigger.next();
          console.log(this.results);

        }
      )
  }

}
