import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FindServicesComponent } from './find-all-services/find-services.component';

const routes: Routes = [{ path: '', component: FindServicesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceRoutingModule {}
