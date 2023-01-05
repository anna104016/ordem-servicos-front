import {
  SidebarSideClassName,
  SidebarTheme
} from 'src/app/layout/sidebar/models/sidenavbar.enum';
import { Component, OnInit } from '@angular/core';
import { SideNavbarService } from '../sidebar/services/sidenavbar.service';
import { SidebarNames } from '../sidebar/models/sidenavbarNames';
@Component({
  selector: 'app-layout-component',
  templateUrl: './layout-component.component.html',
  styleUrls: ['./layout-component.component.scss']
})
export class LayoutComponentComponent implements OnInit {
  sidebarSideClassName = SidebarSideClassName;
  sidebarTheme = SidebarTheme;
  sidebarNames = SidebarNames;

  clientId: number;

  constructor(private _sideNavService: SideNavbarService) {}

  ngOnInit(): void {}

  openSidebar() {
    this._sideNavService
      .getSidebar(this.sidebarNames.COMPONENT_NAVBAR_NAVIGATION)
      .openSidebar();
  }
}
