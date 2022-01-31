import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { DashboardComponent } from './navbar/dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar-com/navbar.component';

const routes: Routes = [
  { path: '', 
  loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule),
  },
  { path: 'main', component: NavbarComponent, canActivate: [AuthGuard] ,children: [
    {path: 'dashboard', component: DashboardComponent},
    { path: 'clientes', 
      loadChildren: () => import('./client/client.module').then(m => m.ClientModule),
    },
    { path: 'servicos', 
    loadChildren: () => import('./services/services.module').then(m => m.ServicesModule),
    },
    { path: 'user', 
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    },
  ]},
  { path: '**', component: NotfoundComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
