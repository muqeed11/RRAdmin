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
    MessagetousersComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    DataTablesModule,
    ModalModule.forRoot()
  ],
  providers: [HttpClientModule,ServerService,AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
