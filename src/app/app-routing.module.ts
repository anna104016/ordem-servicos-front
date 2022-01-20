import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';
import { NotfoundComponent } from './components/notfound/notfound.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'clientes', 
    loadChildren: () => import('./cliente/cliente.module').then(m => m.ClienteModule),
  },
  { path: 'servicos', 
  loadChildren: () => import('./servicos/servicos.module').then(m => m.ServicosModule),
},
  { path: '**', component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
