import { UserModel } from 'src/app/models/user.model';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { SideNavbarService } from '../sidebar/services/sidenavbar.service';

@Component({
  selector: 'app-sidebar-navigation',
  templateUrl: './sidebar-navigation.component.html',
  styleUrls: ['./sidebar-navigation.component.css']
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
    this._sideNavbarService.getSidebar('app-sidebar-navigation').closeSidenav()
  }

}
