import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ClienteIdComponent } from "./cliente-id/cliente-id.component";
import { EditarClienteComponent } from "./editar/editar.component";
import { ListarClienteComponent } from "./listar/listar.component";
import { NovoClienteComponent } from "./novo/novo.component";

const routes: Routes = [
    { path: '', component: ListarClienteComponent},
    { path: 'novo-cliente', component: NovoClienteComponent },
    { path: 'atualizar/:id', component: EditarClienteComponent },
    { path: 'dados/:id', component: ClienteIdComponent },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ClienteRoutingModule { }