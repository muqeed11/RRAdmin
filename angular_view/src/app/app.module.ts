
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from "@angular/common/http";


import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HeaderComponent} from "./header/header.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import {ServerService} from "./server.service";
import { DashboardempComponent } from './dashboardemp/dashboardemp.component';
import {AppRoutingModule} from "./app-routing.module";
import {AuthService} from 'app/auth/auth.service';
import {AuthGuard} from "./auth/auth-guard.service";
import { UsersComponent } from './users/users.component';
import { ReportsComponent } from './reports/reports.component';
import { SidenavbarComponent } from './sidenavbar/sidenavbar.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import {DataTablesModule} from "angular-datatables";
import { MessagetousersComponent } from './messagetousers/messagetousers.component';
import {ModalModule} from "ngx-bootstrap";
import { RegisterlabuserComponent } from './registerlabuser/registerlabuser.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { LabUploadReportsComponent } from './lab-upload-reports/lab-upload-reports.component';
import {MaterialModule} from './material.module';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FileUploadModule } from "ng2-file-upload";
import {MatRadioModule} from '@angular/material/radio';
import { ChangeownpwdComponent } from './changeownpwd/changeownpwd.component';
import {AdminGuard} from "./auth/auth.admin-guard.service";
import { LabuserdashboardComponent } from './labuserdashboard/labuserdashboard.component';
import { ErrorComponent } from './error/error.component';
import {ErrorService} from "./error/error.service";
import {ImageCompressService,ResizeOptions,ImageUtilityService } from 'ng2-image-compress';
import { TestcompComponent } from './testcomp/testcomp.component';
import {ImageUploadModule} from "ng2-imageupload";




// import {MatFormFieldModule} from '@angular/material/form-field';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    HeaderComponent,
    DashboardComponent,
    DashboardempComponent,
    UsersComponent,
    ReportsComponent,
    SidenavbarComponent,
    AdminhomeComponent,
    MessagetousersComponent,
    RegisterlabuserComponent,
    ResetpasswordComponent,
    LabUploadReportsComponent,
    ChangeownpwdComponent,
    LabuserdashboardComponent,
    ErrorComponent,
    TestcompComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    DataTablesModule,
    MaterialModule,
    BrowserAnimationsModule,
    FileUploadModule,
    ModalModule.forRoot(),
    MatRadioModule,
    ImageUploadModule
  ],
  exports: [
  ],
  providers: [HttpClientModule,ServerService,AuthService,AuthGuard,AdminGuard,
    ErrorService,ImageCompressService,ResizeOptions],
  bootstrap: [AppComponent]
})
export class AppModule { }
