import { LoginFormComponent } from './../pages/login-form/login-form.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "../pages/home/home.component";

const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'login', component: LoginFormComponent },
    { path: 'create-account', component: LoginFormComponent },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class SharedRoutingModule { }