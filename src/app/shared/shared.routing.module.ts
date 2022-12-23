import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "../pages/home/home.component";
import { LoginFormComponent } from "./login-form/login-form.component";

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