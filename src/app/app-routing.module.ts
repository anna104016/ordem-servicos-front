import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './components/notfound/notfound.component';

const routes: Routes = [
    { path: '',
        loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule),
    },
    { path: 'portal',
        loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule),
    },
  { path: '**', component: NotfoundComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
