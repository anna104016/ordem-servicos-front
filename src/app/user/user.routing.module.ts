import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserIdComponent } from "./user-id/user-id.component";

const routes: Routes = [
    { path: '', component: UserIdComponent}
  ];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class UserRoutingModule { }
