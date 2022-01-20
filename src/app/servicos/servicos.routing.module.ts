import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DetalhesServicosComponent } from "./detalhes/detalhes.component";
import { EditarservicosComponent } from "./editarservicos/editarservicos.component";
import { ListarservicosComponent } from "./listarservicos/listarservicos.component";
import { NovoservicoComponent } from "./novoservico/novoservico.component";

const routes: Routes = [
    { path: '', component: ListarservicosComponent},
    { path: 'novo-servico', component: NovoservicoComponent },
    { path: 'atualizar/:id', component: EditarservicosComponent },
    { path: 'dados/:id', component: DetalhesServicosComponent },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ServicoRoutingModule { }