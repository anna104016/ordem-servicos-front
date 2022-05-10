import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserGuard } from "../resolver/user.guard";
import { UserIdComponent } from "./user-id/user-id.component";

const routes: Routes = [
    { path: '', component: UserIdComponent, resolve: { user: UserGuard }}
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class UserRoutingModule { }