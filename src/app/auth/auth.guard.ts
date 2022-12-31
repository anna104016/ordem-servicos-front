import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../services/user.service';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private readonly _router: Router,
    private readonly _userService: UserService,
    private readonly _authService: AuthService
  ){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const userIsAuthenticated  = this._authService.checkIfTheUserIsAuthenticated()
    if(userIsAuthenticated){
      return true
    }else{
      this.logOut()
      return false
    }
  }

  logOut(){
    Swal.fire({
      icon:'info',
      title:'Sessão encerada.',
      text: 'Faça login para acessar sua conta.',
      showConfirmButton: true,
      cancelButtonText: 'OK'
    }).then((result) => {
      if(result.isConfirmed){
        this._router.navigate([''])
      }else{
        this._router.navigate([''])
      }
    })
  }

}
