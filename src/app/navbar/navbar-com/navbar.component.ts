import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnDestroy {

  events: string[] = [];
  opened: boolean;

  mobileQuery: MediaQueryList

  private _mobileQueryListener: () => void

  constructor(
    private userService: UserService,
    changeDetectorRef: ChangeDetectorRef, 
    media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 800px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener)
  }

  logOut(){
    Swal.fire({
      icon:'question',
      title: 'Encerrar sessão',
      text: 'Você deseja encerrar a sessão?',
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: 'NÃO',
      confirmButtonText: 'SIM'
    }).then((result) => {
      if(result.isConfirmed){
        this.userService.logOut()
      }
    })
  }
}
