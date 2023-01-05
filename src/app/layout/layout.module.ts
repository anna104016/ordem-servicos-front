import { ClientModule } from './client/client.module';
import { SidebarNavigationComponent } from './sidebar-navigation/sidebar-navigation.component';
import { SidebarModule } from './sidebar/sidebar.module';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponentComponent } from './layout-component/layout-component.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { LayoutRoutingModule } from './layout.routing.module';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [LayoutComponentComponent, SidebarNavigationComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    LayoutRoutingModule,
    MatBottomSheetModule,
    MatSidenavModule,
    MatIconModule,
    MatDividerModule,
    SidebarModule,
    ClientModule
  ],
  exports: [LayoutComponentComponent]
})
export class LayoutModule {}
