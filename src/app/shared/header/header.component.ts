import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import Swal from "sweetalert2";
import {MenuButtomComponent} from "../menu-buttom/menu-buttom.component";
import {MatBottomSheet} from "@angular/material/bottom-sheet";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
      private readonly userService: UserService,
      private readonly bottomSheet: MatBottomSheet
  ) { }

  ngOnInit(): void {
  }

  openBottomSheet(){
    this.bottomSheet.open(MenuButtomComponent);
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
