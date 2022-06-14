import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppPageComponent } from "./app-page/app-page.component";
import { HomeComponent } from "./home/home.component";
import { LoginFormComponent } from "./login-form/login-form.component";

const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'download-app', component: AppPageComponent},
    { path: 'login', component: LoginFormComponent },
    { path: 'create-account', component: LoginFormComponent },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class SharedRoutingModule { }