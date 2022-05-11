import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FineOneClientComponent } from "./find-one-client/find-one-client.component";
import { FindClientsComponent } from "./find-clients/find-clients.component";
import { CreateClientComponent } from "./create-client/create-client.component";
import { OneClienteGuard } from "../resolver/client.guard";
import { ClientesGuard } from "../resolver/clientes.guard";

const routes: Routes = [
    { path: '', component: FindClientsComponent, resolve : {
      clientes: ClientesGuard
    }},
    { path: 'create', component: CreateClientComponent },
    { path: 'update/:id', component: CreateClientComponent },
    { path: 'dados/:id', component: FineOneClientComponent, resolve : {cliente: OneClienteGuard} },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ClientRoutingModule { }