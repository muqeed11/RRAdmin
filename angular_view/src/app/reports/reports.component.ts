import {Component, OnInit, TemplateRef} from '@angular/core';
import {NgForm} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ServerService} from "../server.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  userDetails : any=[] ;
  reportDetails : any =[] ;
  reportString: string;
  modalRef: BsModalRef;
  reportId:string;
  responseStatus:string;

  constructor(private http:HttpClient , private server:ServerService ,
              private modalService: BsModalService) { }

  ngOnInit() {


  }

  getUserDetails(form:NgForm){

    const userid = form.value.searchuserid;
    const body = {"userName":userid};

    this.server.getUserInformation(userid)
      .subscribe(
        (res)=>
        {
          document.getElementById('reportDetailsContainer').style.visibility='visible'
          document.getElementById('userDetailsContainer').style.visibility='visible'
          form.resetForm();

          this.userDetails = res['userdetails'];
            this.reportDetails = res['reportdetails']
        }
      )
  }

  updateUserDetails(form:NgForm){
    //
    // const username1 = form.value.uname;
    // const uemail = form.value.email;
    // const ugender = form.controls['gender'].value;
    // //  .value.gender;
    //
    // const totalreports = form.value.totalreports;
    // const regdate = form.value.regdate;
    // const expdate = form.value.expdate;
    //
    // const area = form.value.area;
    // const city = form.value.city;
    // const enum1 = form.value.enum;
    //
    // const occupation = form.value.occupation;
    // const married = form.controls['married'].value;
    // const habits = form.value.habits;
    //
    // const dname = form.value.dname;
    // const dnum = form.value.dnum;

    //console.log(this.userDetails);

    this.server.updateUserInformation(this.userDetails)
      .subscribe(
        (res)=>
        {
          this.responseStatus = res['responseStatus']
          console.log(this.responseStatus)
          if(this.responseStatus == "0") {
            window.alert("User details updated..!")
            form.reset()
            document.getElementById('reportDetailsContainer').style.visibility='hidden'
            document.getElementById('userDetailsContainer').style.visibility='hidden'
          }
          else
            window.alert("Server error")
        }
      );
  }

  showReport(template: TemplateRef<any>,rid:string , userid:string){

    this.server.getReport(rid,userid)
      .subscribe(
        (res)=>
        {
          this.reportString = res['report'];
          this.reportId = rid
          this.modalRef = this.modalService.show(template);
        }
      );

  }

  deleteReport(rid:string , userid:string){
    console.log("delete report"  + rid + userid)
    this.modalRef.hide()

    this.server.delReport(rid,userid)
      .subscribe(
        (res)=>
        {
          this.userDetails = res['userdetails'];
          this.reportDetails = res['reportdetails']
        }
      )

  }

  rejectReport(rid:string , userid:string){
    console.log("reject report" + rid + userid)
    this.modalRef.hide()
    this.server.rejReport(rid,userid)
      .subscribe(
        (res)=>
        {
          this.userDetails = res['userdetails'];
          this.reportDetails = res['reportdetails']
        }
      )

  }

  approveReport(rid:string , userid:string){

    this.modalRef.hide()
    this.server.approveReport(rid,userid)
      .subscribe(
        (res)=>
        {
          this.userDetails = res['userdetails'];
          this.reportDetails = res['reportdetails']
        }
      )

  }
}
