import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {UserService} from "../../services/user.service";
import Swal from "sweetalert2";
import {MenuButtomComponent} from "../menu-buttom/menu-buttom.component";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import { SidebarSideClassName } from 'src/app/layout/sidebar/models/sidenavbar.enum';
import { SideNavbarService } from 'src/app/layout/sidebar/services/sidenavbar.service';
import { NavbarSettings } from 'src/app/layout/sidebar/models/navbnarSettings.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  settings: NavbarSettings

  @Output() openSidebarEvent = new EventEmitter()
  @Output() closeSidenavEvent = new EventEmitter()

  constructor(
      private readonly userService: UserService,
      private readonly bottomSheet: MatBottomSheet,
      private _sideNavService: SideNavbarService
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

  openSidebar(): void{
    this.openSidebarEvent.emit()
  }

  closeSidebar(): void{
    this.closeSidenavEvent.emit()
  }

}
