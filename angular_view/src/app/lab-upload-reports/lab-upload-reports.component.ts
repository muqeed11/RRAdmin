import {Component, ElementRef, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ServerService} from "../server.service";
import {ReportTypes} from "../reporttype.model";
import { FileUploader} from 'ng2-file-upload';
import {Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";
import {IImage, ImageCompressService} from "ng2-image-compress";


// const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';



@Component({
  selector: 'app-lab-upload-reports',
  templateUrl: './lab-upload-reports.component.html',
  styleUrls: ['./lab-upload-reports.component.css']
})

export class LabUploadReportsComponent {

  @ViewChild('inputfile')
    myInputSelectedFile : ElementRef;

   token =localStorage.getItem('token')
   userId1 =localStorage.getItem('userId')

  //  URL = 'http://192.168.134.1:3000/reports/fileupload?token='+this.token +'&userId=' + this.userId1;
  //
  // uploader: FileUploader = new FileUploader({url: this.URL})
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
  userId :String = localStorage.getItem('userId');
  filenameArray: String = "";
  onlyFilename: String;
  selectedPlan:String;
  processedImages: any = [];
   images: Array<IImage> = [];
  showTitle: boolean = false;


  constructor(private server: ServerService,private router:Router,
              private authService:AuthService,private imgCompressService: ImageCompressService) { }

  onChange(fileInput: any) {
    let fileList: FileList;

        this.onlyFilename = this.customerId + '.' + this.dropdownReports + '.' + Date.now() + '.jpg';
        this.filenameArray = this.filenameArray + "" + this.onlyFilename + ',';

    ImageCompressService.filesToCompressedImageSource(fileInput.target.files).then(observableImages => {
      observableImages.subscribe((image) => {
          this.images.push(image);
          // console.log(fileInput.target.files)
          // console.log(this.images)
          // console.log(this.images[0]['imageDataUrl'])
        }, (error) => {
          console.log("Error while converting");
        }, () => {
          this.processedImages = this.images;
          console.log(this.processedImages)
          this.showTitle = true;
        }
      );
    });

    //
  }


  UploadReports() {

        const body: any = {
          customerId: this.customerId, uploadedBy: this.uploadedBy, userId:this.userId,
          reportType: this.dropdownReports, reportDate: this.reportDate, reportFileNames: this.filenameArray,
          numberofReports:this.images.length, reportsContents:this.images
        };
        document.getElementById('reportUpload').style.visibility = 'hidden';
        console.log(body)
        this.server.UploadReports(body)
          .subscribe(
            (res) => {
              if (res['responseStatus'] == "0") {
                window.alert("Reports uploaded..!")
                this.router.navigate(['/dashboardLabUser'])
              }
              else
              if(res['responseStatus'] == '99') {
                this.authService.logout();
                window.alert(res['response'])
                this.router.navigate(['signin']);
              }
              else
                window.alert(res['response'])
            }
          )
      }

    // this.uploader.onCompleteItem = (item: any, response: any, status: any, headers) => {
    // };

    // this.uploader.onAfterAddingFile = () => {
    //   console.log(this.uploader.queue)
    //   console.log("inside on after adding file")
    //   // do stuff
    //
    //   // ImageCompressService.filesToCompressedImageSource(this.uploader.queue).then(observableImages => {
    //   //   observableImages.subscribe((image) => {
    //   //     this.images.push(image);
    //   //   }, (error) => {
    //   //     console.log("Error while converting");
    //   //   }, () => {
    //   //     this.processedImages = this.images;
    //   //     // this.showTitle = true;
    //   //   });
    //   // });
    //
    //
    // };




  //   this.uploader.onCompleteAll = () => {
  //     const body: any = {
  //       customerId: this.customerId, uploadedBy: this.uploadedBy, userId:this.userId,
  //       reportType: this.dropdownReports, reportDate: this.reportDate, reportFileNames: this.filenameArray
  //     };
  //     console.log("uploader",this.uploader)
  //
  //     document.getElementById('reportUpload').style.visibility = 'hidden';
  //     this.server.UploadReports(body)
  //       .subscribe(
  //         (res) => {
  //           if (res['responseStatus'] == "0") {
  //             window.alert("Reports uploaded..!")
  //             this.router.navigate(['/dashboardLabUser'])
  //           }
  //           else
  //           if(res['responseStatus'] == '99') {
  //             this.authService.logout();
  //             window.alert(res['response'])
  //             this.router.navigate(['signin']);
  //           }
  //           else
  //             window.alert(res['response'])
  //         }
  //       )
  //   }
  // }


  // UploadReports() {
  //
  //   this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
  //     this.onlyFilename = this.customerId + '.' + this.dropdownReports + '.' + Date.now() + '.jpg';
  //     this.filenameArray = this.filenameArray + "" + this.onlyFilename + ',';
  //
  //     form.append('customerId', this.customerId); //note comma separating key and value
  //     form.append('uploadedBy', this.uploadedBy); //note comma separating key and value
  //     form.append('userId', this.uploadedBy); //note comma separating key and value
  //     form.append('reportType', this.dropdownReports); //note comma separating key and value
  //     form.append('reportDate', this.reportDate); //note comma separating key and value
  //     form.append('reportFileNames', this.onlyFilename); //note comma separating key and value
  //   };
  //
  //   this.uploader.uploadAll();
  //
  // }

  ValidateCustomer(form: NgForm) {

    this.customerId = form.value.customerId;

    const body: any = {customerId: this.customerId,userId:localStorage.getItem('userId')};

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
              window.alert('Session Expired , Please login again..!')
              this.authService.logout();
              this.router.navigate(['signin']);

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
    // this.uploader.queue.splice(0)
    // document.getElementById('fileUpload')
    // document.getElementById('reportUpload').style.visibility = 'hidden';


  }

  payments() {

    const body:any = {customerId:this.customerId,uploadedBy:this.uploadedBy,
      customerPlan:this.selectedPlan,userId:this.uploadedBy}

    this.server.updatePayments(body)
      .subscribe(
        (res)=> {
          // console.log(res)
          if(res['responseStatus'] == '0')
            document.getElementById('reportUpload').style.visibility = 'visible';
          else
            window.alert(res['response'])
        }
      )
  }


}
