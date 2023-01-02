import { SidebarSideClassName, SidebarTheme } from 'src/app/layout/sidebar/models/sidenavbar.enum';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { SideNavbarService } from '../sidebar/services/sidenavbar.service';
import { SidebarNames } from '../sidebar/models/sidenavbarNames';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-layout-component',
  templateUrl: './layout-component.component.html',
  styleUrls: ['./layout-component.component.scss']
})
export class LayoutComponentComponent implements OnInit  {

  sidebarSideClassName = SidebarSideClassName
  sidebarTheme = SidebarTheme
  sidebarNames = SidebarNames

  clientId: number

  constructor(
    private observer: BreakpointObserver,
    private _sideNavService:SideNavbarService,
    private readonly _clientService: ClientsService
  ) { }

  ngOnInit(): void {
  }

  openSidebar(){
    this._sideNavService.getSidebar(this.sidebarNames.COMPONENT_NAVBAR_NAVIGATION).openSidebar()
  }
}
