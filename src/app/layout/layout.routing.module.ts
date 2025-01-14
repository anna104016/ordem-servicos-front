import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponentComponent } from './layout-component/layout-component.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponentComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: 'clientes',
        loadChildren: () =>
          import('./client/client.module').then((m) => m.ClientModule)
      },
      {
        path: 'servicos',
        loadChildren: () =>
          import('./servicesClient/services.module').then(
            (m) => m.ServicesModule
          )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {}
