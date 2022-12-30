import { SidebarSideClassName, SidenavbarTheme } from 'src/app/layout/sidebar/models/sidenavbar.enum';
import { NavbarSettings } from './../sidebar/models/navbnarSettings.model';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { SideNavbarService } from '../sidebar/services/sidenavbar.service';

@Component({
  selector: 'app-layout-component',
  templateUrl: './layout-component.component.html',
  styleUrls: ['./layout-component.component.scss']
})
export class LayoutComponentComponent implements OnInit  {

  sidebarSideClassName = SidebarSideClassName
  sidenavbarTheme = SidenavbarTheme
  
  constructor(
    private observer: BreakpointObserver,
    private _sideNavService:SideNavbarService,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }

  openSidebar(){
    this._sideNavService.getSidebar('app-sidebar-navigation').openSidebar()
  }
}
