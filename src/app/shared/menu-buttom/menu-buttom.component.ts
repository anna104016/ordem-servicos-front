import { Component, OnInit } from '@angular/core';
import {MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {Route, Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-menu-buttom',
  templateUrl: './menu-buttom.component.html',
  styleUrls: ['./menu-buttom.component.css']
})
export class MenuButtomComponent implements OnInit {

  constructor(
      private readonly _bottomSheetRef: MatBottomSheetRef<MenuButtomComponent>,
      private readonly router: Router,
      private readonly userService: UserService
  ) { }

  ngOnInit(): void {
  }

  openLink(route: string): void {
    this._bottomSheetRef.dismiss();
    this.router.navigate(['/portal/' + route])
  }

  public logOut(){
    Swal.fire({
      title: "Encerrar sessão",
      icon: "info",
      text: "Você deseja encerrar esta sessão?",
      showCancelButton: true,
      showConfirmButton: true
    }).then((resul) => {
      if(resul.isConfirmed){
        this.userService.logOut()
      }else{
        Swal.close()
      }
    })
  }

}
