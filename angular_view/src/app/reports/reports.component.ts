import {Component, OnInit, TemplateRef} from '@angular/core';
import {NgForm} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ServerService} from "../server.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  customerDetails : any=[] ;
  reportDetails : any =[] ;
  reportString: string;
  modalRef: BsModalRef;
  reportType:string;
  responseStatus:string;
  reportId : string;
  reason : string;
  indexi : number;
  serverRes:String;


  constructor(private http:HttpClient , private server:ServerService ,
              private modalService: BsModalService,private authService:AuthService,private router:Router) { }

  ngOnInit() {


  }

  getUserDetails(form:NgForm){

    const customerId = form.value.searchuserid;
    const body:any = {"customerId":customerId,"userId":localStorage.getItem('userId')} ;

    this.server.getUserInformation(body)
      .subscribe(
        (res)=>
        {
          console.log(res)
          if(res['responseStatus'] == '99') {
            if (res['error'].name == 'TokenExpiredError') {
              window.alert('Session Expired , Please login again..!')
              this.authService.logout();
              this.router.navigate(['signin']);            }
          }

          document.getElementById('reportDetailsContainer').style.visibility='visible'
          document.getElementById('userDetailsContainer').style.visibility='visible'
          form.resetForm();

          if(res['responseStatus']==='0'){
            this.customerDetails = res['customerDetails'];
            this.reportDetails = res['reportDetails']
          }
          else
            if(res['responseStatus']==='1'){
              this.customerDetails = res['customerDetails'];
              this.reportDetails = res['reportDetails']
            }
            else if(res['responseStatus']=='2') {
              this.reportDetails = res['reportDetails']
              this.customerDetails = res['customerDetails'];
              // document.getElementById('reportDetailsContainer').style.visibility='hidden'
              // document.getElementById('userDetailsContainer').style.visibility='hidden'
              // window.alert("Customer details do not exist..!")
            }
            else if(res['responseStatus']=='3') {
              this.reportDetails = res['reportDetails']
              this.customerDetails = res['customerDetails'];
              document.getElementById('reportDetailsContainer').style.visibility='hidden'
              document.getElementById('userDetailsContainer').style.visibility='hidden'
              window.alert("Customer details do not exist..!")
            }

        }
      )
  }

  updateUserDetails(form:NgForm){

    this.server.updateUserInformation(this.customerDetails)
      .subscribe(
        (res)=>
        {
          this.responseStatus = res['responseStatus']
          if(res['responseStatus'] == '99') {
            if (res['error'].name == 'TokenExpiredError') {
              this.checkServerResponse()
            }
          }
          else
          if(this.responseStatus == "0") {
            window.alert("User details updated..!")
            // form.reset()
            document.getElementById('reportDetailsContainer').style.visibility='hidden'
            document.getElementById('userDetailsContainer').style.visibility='hidden'
          }
          else
            window.alert("Server error")
        }
      );
  }

  showReport(template: TemplateRef<any>,reportId:string , i: number){
    const body:any = {reportId:reportId} ;


    // console.log(body)
    this.server.getReport(body)
      .subscribe(
        (res)=>
        {
          // console.log(res)

          if(res['responseStatus'] == '99') {
            if (res['error'].name == 'TokenExpiredError') {
              this.checkServerResponse()
            }
          }
          else {
            this.reportString = "data:image/jpg;base64," + res['reportFile'];
            this.reportType = res['reportType'];
            this.reportId = reportId;
            this.indexi = i;
            this.reason = this.reportDetails[this.indexi].reportReason;

            this.modalRef = this.modalService.show(template);
          }
        }
      );

  }

  deleteReport(){
    // console.log(this.reason);
    const  body:any = {reportId: this.reportId , reportReason:this.reason}
    this.modalRef.hide();

    this.server.delReport(body)
      .subscribe(
        (res)=>
        {
          // this.customerDetails = res['userdetails'];
          // this.reportDetails = res['reportdetails'];
          if(res['responseStatus'] == '99') {
            if (res['error'].name == 'TokenExpiredError') {
              this.checkServerResponse()
            }
          }
          else {
            this.reason = res['reportReason']
            this.responseStatus = res['reponseStatus']
            this.reportDetails[this.indexi].reportReason = this.reason
            this.reportDetails[this.indexi].reportStatus = "Deleted"
          }
        }
      )

  }

  rejectReport(){
    // console.log(this.reason);
    const  body:any = {reportId: this.reportId , reportReason:this.reason}
    this.modalRef.hide();

    this.server.rejReport(body)
      .subscribe(
        (res)=>
        {

          if(res['responseStatus'] == '99') {
            if (res['error'].name == 'TokenExpiredError') {
              this.checkServerResponse()
            }
          }
          else {
            this.reason = res['reportReason']
            this.responseStatus = res['reponseStatus']
            this.reportDetails[this.indexi].reportReason = this.reason
            this.reportDetails[this.indexi].reportStatus = "Rejected"
          }
        }
      )

  }

  approveReport(){
    const  body:any = {reportId: this.reportId , reportReason:this.reason}
    this.modalRef.hide();

    this.modalRef.hide()
    this.server.approveReport(body)
      .subscribe(
        (res)=>
        {
          if(res['responseStatus'] == '99') {
            if (res['error'].name == 'TokenExpiredError') {
              this.checkServerResponse()
            }
          }
          else {
            this.reason = res['reportReason']
            this.responseStatus = res['reponseStatus']
            this.reportDetails[this.indexi].reportReason = this.reason
            this.reportDetails[this.indexi].reportStatus = "Approved"
          }
        }
      )

  }

  checkServerResponse(){
    window.alert('Session Expired , Please login again..!')
    this.authService.logout();
    this.router.navigate(['signin']);
  }
}
