import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Route, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-menu-buttom',
  templateUrl: './menu-buttom.component.html',
  styleUrls: ['./menu-buttom.component.scss']
})
export class MenuButtomComponent implements OnInit {
  constructor(
    private readonly _bottomSheetRef: MatBottomSheetRef<MenuButtomComponent>,
    private readonly _router: Router,
    private readonly _userService: UserService,
    private readonly _authService: AuthService
  ) {}

  ngOnInit(): void {}

  openLink(route: string): void {
    this._bottomSheetRef.dismiss();
    this._router.navigate(['/portal/' + route]);
  }

  public logOut() {
    this._bottomSheetRef.dismiss();
    Swal.fire({
      title: 'Encerrar sessão',
      icon: 'info',
      text: 'Você deseja encerrar esta sessão?',
      showCancelButton: true,
      showConfirmButton: true
    }).then((resul) => {
      if (resul.isConfirmed) {
        this._authService.logOut();
      } else {
        Swal.close();
      }
    });
  }
}
