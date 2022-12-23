import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgApexchartsModule} from "ng-apexcharts";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import {DashboardRoutingModule} from "./dashboard.routing.module";
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
      DashboardComponent
  ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        NgApexchartsModule,
        MatToolbarModule,
        MatCardModule,
        SharedModule,
    ],
  exports: []
})
export class DashboardModule { }
