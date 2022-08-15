import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar-com/navbar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { SharedModule } from '../shared/shared.module';
import { NavbarRoutingModule } from './navbar.routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {NgApexchartsModule} from "ng-apexcharts";

@NgModule({
  declarations: [
    NavbarComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    NavbarRoutingModule,
    MatSidenavModule,
    MatListModule,
    SharedModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    NgApexchartsModule
  ],
  exports: [NavbarComponent]
})
export class NavbarModule { }
