import { UserModel } from 'src/app/models/user.model';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { SideNavbarService } from '../sidebar/services/sidenavbar.service';
import { SidenavbarNames } from '../sidebar/models/sidenavbarNames';

@Component({
  selector: 'app-sidebar-navigation',
  templateUrl: './sidebar-navigation.component.html',
  styleUrls: ['./sidebar-navigation.component.scss']
})
export class SidebarNavigationComponent implements OnInit {

  user: UserModel

  constructor(
    private _userService: UserService,
    private _sideNavbarService: SideNavbarService

  ) { }

  ngOnInit(): void {
    this.getUser()
  }

  getUser(){
    this._userService.getUser().subscribe({
      next: (user) => {
        this.user = user
      }
    })
  }

  closeSiebar(){
    this._sideNavbarService.getSidebar(SidenavbarNames.COMPONENT_NAVBAR_NAVIGATION).closeSidenav()
  }

}
