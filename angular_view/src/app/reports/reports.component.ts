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

  customerDetails : any=[] ;
  reportDetails : any =[] ;
  reportString: string;
  modalRef: BsModalRef;
  reportType:string;
  responseStatus:string;
  reportId : string;
  reason : string;
  indexi : number;

  constructor(private http:HttpClient , private server:ServerService ,
              private modalService: BsModalService) { }

  ngOnInit() {


  }

  getUserDetails(form:NgForm){

    const userid = form.value.searchuserid;
    const body:any = {"userId":userid} ;

    this.server.getUserInformation(body)
      .subscribe(
        (res)=>
        {
          document.getElementById('reportDetailsContainer').style.visibility='visible'
          document.getElementById('userDetailsContainer').style.visibility='visible'
          form.resetForm();
          console.log(res)

          this.customerDetails = res['customerDetails'];
            this.reportDetails = res['reportDetails']
        }
      )
  }

  updateUserDetails(form:NgForm){
    // console.log(this.customerDetails)
    // console.log(this.customerDetails.dateOfBirth)

    this.server.updateUserInformation(this.customerDetails)
      .subscribe(
        (res)=>
        {
          this.responseStatus = res['responseStatus']
          // console.log(this.responseStatus)
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
          this.reportString = "data:image/jpg;base64," + res['reportFile'];
          this.reportType = res['reportType'];
          this.reportId = reportId;
          this.indexi = i;
          this.reason = this.reportDetails[this.indexi].reportReason;

          this.modalRef = this.modalService.show(template);
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
          this.reason = res['reportReason']
          this.responseStatus = res['reponseStatus']
          this.reportDetails[this.indexi].reportReason = this.reason
          this.reportDetails[this.indexi].reportStatus = "Deleted"

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
          // this.customerDetails = res['userdetails'];
          // this.reportDetails = res['reportdetails'];
          this.reason = res['reportReason']
          this.responseStatus = res['reponseStatus']
          this.reportDetails[this.indexi].reportReason = this.reason
          this.reportDetails[this.indexi].reportStatus = "Rejected"

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
          this.reason = res['reportReason']
          this.responseStatus = res['reponseStatus']
          this.reportDetails[this.indexi].reportReason = this.reason
          this.reportDetails[this.indexi].reportStatus = "Approved"
        }
      )

  }
}
