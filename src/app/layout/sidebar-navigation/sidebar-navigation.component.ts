import { MatDialog } from '@angular/material/dialog';
import { UserModel } from 'src/app/models/user.model';
import { Component, OnInit } from '@angular/core';
import { SideNavbarService } from '../sidebar/services/sidenavbar.service';
import { SidebarNames } from '../sidebar/models/sidenavbarNames';
import { AuthService } from 'src/app/auth/auth.service';
import { take, takeUntil } from 'rxjs/operators';
import { SelectUserPhotoComponent } from 'src/app/shared/select-user-photo/select-user-photo.component';
import { UserService } from 'src/app/services/user.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-sidebar-navigation',
  templateUrl: './sidebar-navigation.component.html',
  styleUrls: ['./sidebar-navigation.component.scss']
})
export class SidebarNavigationComponent implements OnInit {
  user: UserModel;
  private componentDestroyed$ = new Subject();

  constructor(
    private _sideNavbarService: SideNavbarService,
    private readonly _authService: AuthService,
    private readonly _dialog: MatDialog,
    private readonly _userService: UserService
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this._authService
      .validateUser()
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe({
        next: (user) => {
          this.user = user;
        }
      });
  }

  selectPhoto() {
    const photoDialog = this._dialog.open(SelectUserPhotoComponent, {
      width: '40rem',
      height: '90vh'
    });
    photoDialog
      .afterClosed()
      .pipe(take(1))
      .subscribe((resp) => {
        if (resp) {
          this.updateUserPhoto(resp.photo);
        }
      });
  }

  updateUserPhoto(photo: string) {
    this._userService.updatePhoto(this.user.user_id, { photo }).subscribe();
  }

  closeSidebar() {
    this._sideNavbarService
      .getSidebar(SidebarNames.COMPONENT_NAVBAR_NAVIGATION)
      .closeSidenav();
  }
}
