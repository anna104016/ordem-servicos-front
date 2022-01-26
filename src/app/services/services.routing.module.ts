import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FindOneServiceComponent } from "./find-one-service/find-one-service.component";
import { UpdateServiceComponent } from "./update-service/update-service.component";
import { FindServicesComponent } from "./find-all-services/find-services.component";
import { CreateServiceComponent } from "./create-service/create-service.component";

const routes: Routes = [
    { path: '', component: FindServicesComponent},
    { path: 'novo-servico', component: CreateServiceComponent },
    { path: 'atualizar/:id', component: UpdateServiceComponent },
    { path: 'dados/:id', component: FindOneServiceComponent },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ServiceRoutingModule { }