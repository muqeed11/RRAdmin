import {PreloadAllModules, RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {SigninComponent} from "./auth/signin/signin.component";
import {SignupComponent} from "./auth/signup/signup.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AuthGuard} from "./auth/auth-guard.service";
import {AdminGuard} from "./auth/auth.admin-guard.service";
import {DashboardempComponent} from "./dashboardemp/dashboardemp.component";
import {UsersComponent} from "./users/users.component";
import {ReportsComponent} from "./reports/reports.component";
import {MessagetousersComponent} from "./messagetousers/messagetousers.component";
import {RegisterlabuserComponent} from "./registerlabuser/registerlabuser.component";
import {ResetpasswordComponent} from "./resetpassword/resetpassword.component";
import {LabUploadReportsComponent} from "./lab-upload-reports/lab-upload-reports.component";
import {ChangeownpwdComponent} from "./changeownpwd/changeownpwd.component";
import {LabuserdashboardComponent} from "./labuserdashboard/labuserdashboard.component";
import {TestcompComponent} from "./testcomp/testcomp.component";

const appRoutes: Routes =[
  // { path: '',redirectTo:'/signin', pathMatch:'full'},
  { path: '',redirectTo:'/dashboard', pathMatch:'full'},
  { path: 'signin', component: SigninComponent},
  { path: 'signup',component:SignupComponent},
  { path : 'dashboard', component:DashboardComponent ,canActivate:[AuthGuard,AdminGuard]},
  { path : 'dashboardLabUser', component:LabuserdashboardComponent ,canActivate:[AuthGuard]},
  { path : 'dashboardemp', component:DashboardempComponent,canActivate:[AuthGuard]},
  { path : 'users', component:UsersComponent,canActivate:[AuthGuard,AdminGuard]},
  { path : 'reports', component:ReportsComponent,canActivate:[AuthGuard,AdminGuard]},
  { path: 'messageToUsers', component:MessagetousersComponent,canActivate:[AuthGuard] },
  { path : 'registerlabuser', component:RegisterlabuserComponent ,canActivate:[AuthGuard]},
  { path : 'resetPassword', component:ResetpasswordComponent ,canActivate:[AuthGuard]},
  { path : 'changeownpassword', component:ChangeownpwdComponent ,canActivate:[AuthGuard]},
  { path : 'dashboardemp', component:DashboardempComponent ,canActivate:[AuthGuard]},
  { path : 'labUploadReports', component:LabUploadReportsComponent ,canActivate:[AuthGuard]},
  { path : 'testcomp', component:TestcompComponent ,canActivate:[AuthGuard]}
  // //
  // { path : 'dashboard', component:DashboardComponent },
  // { path : 'dashboardemp', component:DashboardempComponent},
  // { path : 'users', component:UsersComponent},
  // { path : 'reports', component:ReportsComponent},
  // { path: 'messageToUsers', component:MessagetousersComponent  },
  // { path : 'registerlabuser', component:RegisterlabuserComponent},
  // { path : 'resetPassword', component:ResetpasswordComponent},
  // { path : 'dashboardemp', component:DashboardempComponent},
  // { path : 'labUploadReports', component:LabUploadReportsComponent},


];

@NgModule({
  imports:[RouterModule.forRoot(appRoutes,{preloadingStrategy:PreloadAllModules})],
  exports:[RouterModule]

})

export class AppRoutingModule {


}
