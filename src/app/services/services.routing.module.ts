import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FindOneServiceComponent } from "./find-one-service/find-one-service.component";
import { FindServicesComponent } from "./find-all-services/find-services.component";
import { CreateServiceComponent } from "./create-service/create-service.component";
import { ServicesGuard } from "../resolver/services.guard";
import { ServiceGuard } from "../resolver/service.guard";

const routes: Routes = [
    { path: '', component: FindServicesComponent, resolve: { servicos: ServicesGuard },},
    { path: 'create', component: CreateServiceComponent },
    { path: 'update/:id', component: CreateServiceComponent },
    { path: 'dados/:id', component: FindOneServiceComponent, resolve: { servico: ServiceGuard } },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ServiceRoutingModule { }