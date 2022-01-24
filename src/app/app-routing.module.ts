import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { DashboardComponent } from './navbar/dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar-com/navbar.component';

const routes: Routes = [
  { path: '', 
  loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule),
  },
  { path: 'main', component: NavbarComponent, children: [
    {path: 'dashboard', component: DashboardComponent},
    { path: 'clientes', 
      loadChildren: () => import('./cliente/cliente.module').then(m => m.ClienteModule),
    },
    { path: 'servicos', 
    loadChildren: () => import('./servicos/servicos.module').then(m => m.ServicosModule),
    }
  ]},
  { path: '**', component: NotfoundComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
