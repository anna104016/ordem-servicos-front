import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeletarComponent } from './components/pages/clientes/deletar/deletar.component';
import { EditarComponent } from './components/pages/clientes/editar/editar.component';
import { ListarComponent } from './components/pages/clientes/listar/listar.component';
import { NovoComponent } from './components/pages/clientes/novo/novo.component';
import { HomeComponent } from './components/pages/home/home.component';
import { NotfoundComponent } from './components/pages/notfound/notfound.component';
import { DetalhesComponent } from './components/pages/servicos/detalhes/detalhes.component';
import { EditarservicosComponent } from './components/pages/servicos/editarservicos/editarservicos.component';
import { ListarservicosComponent } from './components/pages/servicos/listarservicos/listarservicos.component';
import { NovoservicoComponent } from './components/pages/servicos/novoservico/novoservico.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'meus-clientes', component: ListarComponent},
  { path: 'novo-cliente', component: NovoComponent },
  { path: 'atualizar-cliente/:id', component: EditarComponent },
  { path: 'deletar-cliente/:id', component: DeletarComponent },
  { path: 'servicos', component: ListarservicosComponent },
  { path: 'servicos/:id', component: DetalhesComponent},
  { path: 'novo-servico', component: NovoservicoComponent},
  { path: 'servicos/atualizar-servico/:id', component: EditarservicosComponent},
  { path: '**', component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
