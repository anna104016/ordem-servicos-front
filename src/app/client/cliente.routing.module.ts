import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FineOneClientComponent } from "./find-one-client/find-one-client.component";
import { UpdateClientComponent } from "./update-client/update-client.component";
import { FindClientsComponent } from "./find-clients/find-clients.component";
import { CreateClientComponent } from "./create-client/create-client.component";

const routes: Routes = [
    { path: '', component: FindClientsComponent},
    { path: 'novo-cliente', component: CreateClientComponent },
    { path: 'atualizar/:id', component: UpdateClientComponent },
    { path: 'dados/:id', component: FineOneClientComponent },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ClientRoutingModule { }