import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponentComponent } from './layout-component/layout-component.component';
import {SharedModule} from "../shared/shared.module";
import {RouterModule} from "@angular/router";
import {LayoutRoutingModule} from "./layout.routing.module";

@NgModule({
  declarations: [
    LayoutComponentComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    LayoutRoutingModule
  ],
  exports: [
      LayoutComponentComponent
  ]
})
export class LayoutModule { }
