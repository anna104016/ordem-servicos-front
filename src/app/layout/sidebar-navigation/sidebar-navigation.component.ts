import { UserModel } from 'src/app/models/user.model';
import { Component, OnInit } from '@angular/core';
import { SideNavbarService } from '../sidebar/services/sidenavbar.service';
import { SidebarNames } from '../sidebar/models/sidenavbarNames';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidebar-navigation',
  templateUrl: './sidebar-navigation.component.html',
  styleUrls: ['./sidebar-navigation.component.scss']
})
export class SidebarNavigationComponent implements OnInit {

  user: UserModel

  constructor(
    private _sideNavbarService: SideNavbarService,
    private readonly _authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getUser()
  }

  getUser(){
    this._authService.validateUser().subscribe({
      next: (user) => {
        this.user = user
      }
    })
  }

  closeSidebar(){
    this._sideNavbarService.getSidebar(SidebarNames.COMPONENT_NAVBAR_NAVIGATION).closeSidenav()
  }
}
