import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FineOneClientComponent } from "./find-one-client/find-one-client.component";
import { FindClientsComponent } from "./find-clients/find-clients.component";
import { CreateClientComponent } from "./create-client/create-client.component";

const routes: Routes = [
    { path: '', component: FindClientsComponent},
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ClientRoutingModule { }