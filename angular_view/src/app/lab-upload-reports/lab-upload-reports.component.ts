import {Component, NgModule} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ServerService} from "../server.service";
import {ReportTypes} from "../reporttype.model";
import { FileUploader} from 'ng2-file-upload';
import {Router} from "@angular/router";

// const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';
const URL = 'http://192.168.134.1:3000/reports/fileupload';


@Component({
  selector: 'app-lab-upload-reports',
  templateUrl: './lab-upload-reports.component.html',
  styleUrls: ['./lab-upload-reports.component.css']
})

export class LabUploadReportsComponent {
  uploader: FileUploader = new FileUploader({url: URL})

  reportTypes: ReportTypes[] = [
    {id: 1, type: 'CBP'},
    {id: 2, type: 'XRAY'},
    {id: 3, type: 'Scan'},
    {id: 4, type: 'BloodTest'}
  ];

  dropdownReports: String;
  customerId: String;
  reportDate: Date;
  files: any = [];
  validErrorMsg: String;
  uploadedBy = "LabUser";
  filenameArray: String = "";
  onlyFilename: String;


  constructor(private server: ServerService,private router:Router) {

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers) => {
    }


    this.uploader.onCompleteAll = () => {
      const body: any = {
        userId: this.customerId, uploadedBy: this.uploadedBy,
        reportType: this.dropdownReports, reportDate: this.reportDate, reportFileNames: this.filenameArray
      };
      this.server.UploadReports(body)
        .subscribe(
          (res) => {
            if (res['responseStatus'] == "0") {
              window.alert("Reports uploaded..!")
              this.router.navigate(['/dashboard'])
              document.getElementById('reportUpload').style.visibility = 'hidden';

            }
          }
        )

    }

  }


  UploadReports() {

    this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
      this.onlyFilename = this.customerId + '.' + this.dropdownReports + '.' + Date.now() + '.jpg';
      this.filenameArray = this.filenameArray + "" + this.onlyFilename + ','

      form.append('userId', this.customerId); //note comma separating key and value
      form.append('uploadedBy', this.uploadedBy); //note comma separating key and value
      form.append('reportType', this.dropdownReports); //note comma separating key and value
      form.append('reportDate', this.reportDate); //note comma separating key and value
      form.append('reportFileNames', this.onlyFilename); //note comma separating key and value
    };

    this.uploader.uploadAll();

  }

  ValidateCustomer(form: NgForm) {
    // console.log(form.value.customerId)

    this.customerId = form.value.customerId;

    const body: any = {customerId: this.customerId};

    this.server.validateCustomer(body)
      .subscribe(
        (res) => {

          // console.log(res)
          if (res['responseStatus'] == "0" || "1" || "2" || "3") {
            this.validErrorMsg = res['response']
            document.getElementById('reportUpload').style.visibility = 'visible';
          }
        }
      )

  }

}
