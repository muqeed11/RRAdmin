import {Component, ElementRef, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ServerService} from "../server.service";
import {ReportTypes} from "../reporttype.model";
import { FileUploader} from 'ng2-file-upload';
import {Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";


// const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

var token =localStorage.getItem('token')
  ? '?token=' + localStorage.getItem('token')
  : '';
const URL = 'http://192.168.134.1:3000/reports/fileupload'+token;


@Component({
  selector: 'app-lab-upload-reports',
  templateUrl: './lab-upload-reports.component.html',
  styleUrls: ['./lab-upload-reports.component.css']
})

export class LabUploadReportsComponent {

  @ViewChild('inputfile')
    myInputSelectedFile : ElementRef;

  uploader: FileUploader = new FileUploader({url: URL})

  reportTypes: ReportTypes[] = [
    {id: 1, type: 'CBP'},
    {id: 2, type: 'XRAY'},
    {id: 3, type: 'Scan'},
    {id: 4, type: 'BloodTest'}
  ];

  paymentPlans : string[] = [
    '500INR(6Months)', '1000INR(1year)'
  ];

  dropdownReports: String;
  customerId: String;
  reportDate: Date;
  files: any = [];
  validErrorMsg: String;
  uploadedBy :String = localStorage.getItem('userId');
  filenameArray: String = "";
  onlyFilename: String;
  selectedPlan:String;


  constructor(private server: ServerService,private router:Router,private authService:AuthService) {

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers) => {
    };

    this.uploader.onCompleteAll = () => {
      const body: any = {
        userId: this.customerId, uploadedBy: this.uploadedBy,
        reportType: this.dropdownReports, reportDate: this.reportDate, reportFileNames: this.filenameArray
      };
      document.getElementById('reportUpload').style.visibility = 'hidden';
      this.server.UploadReports(body)
        .subscribe(
          (res) => {
            if (res['responseStatus'] == "0") {
              window.alert("Reports uploaded..!")
              this.router.navigate(['/dashboardLabUser'])
            }
            else
            if(res['responseStatus'] == '99') {
              if (res['error'].name == 'TokenExpiredError') {
                window.alert('Session Expired , Please login again..!')
                this.authService.logout();
                this.router.navigate(['signin']);
              }
              else
              window.alert(res['response'])
            }
            else
              window.alert(res['response'])
          }
        )
    }
  }


  UploadReports() {

    this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
      this.onlyFilename = this.customerId + '.' + this.dropdownReports + '.' + Date.now() + '.jpg';
      this.filenameArray = this.filenameArray + "" + this.onlyFilename + ',';

      form.append('userId', this.customerId); //note comma separating key and value
      form.append('uploadedBy', this.uploadedBy); //note comma separating key and value
      form.append('reportType', this.dropdownReports); //note comma separating key and value
      form.append('reportDate', this.reportDate); //note comma separating key and value
      form.append('reportFileNames', this.onlyFilename); //note comma separating key and value
    };

    this.uploader.uploadAll();

  }

  ValidateCustomer(form: NgForm) {

    this.customerId = form.value.customerId;

    const body: any = {customerId: this.customerId};

    this.server.validateCustomer(body)
      .subscribe(
        (res) => {

          if (res['responseStatus'] == "0" || "1" || "2" || "3") {
            this.validErrorMsg = res['response']
            if(this.validErrorMsg==='Valid User') {
              document.getElementById('reportUpload').style.visibility = 'visible';
            }
          }
          else
          if(res['responseStatus'] == '99') {
            if (res['error'].name == 'TokenExpiredError') {
              window.alert('Session Expired , Please login again..!')
              this.authService.logout();
              this.router.navigate(['signin']);
            }
          }
        }
      )

  }


  formReset(form:NgForm) {

    form.resetForm();
    this.validErrorMsg=""
    document.getElementById('reportUpload').style.visibility = 'hidden';


  }


  formReset1(form:NgForm) {

    form.resetForm();
    // this.myInputSelectedFile.nativeElement.value=''
    this.uploader.queue.splice(0)
    // document.getElementById('fileUpload')
    // document.getElementById('reportUpload').style.visibility = 'hidden';


  }

  payments() {

    document.getElementById('reportUpload').style.visibility = 'visible';
    const body:any = {customerId:this.customerId,uploadedBy:this.uploadedBy,customerPlan:this.selectedPlan}

    this.server.updatePayments(body)
      .subscribe(
        (res)=> console.log(res)
      )
  }


}
