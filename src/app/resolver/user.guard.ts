import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { ServiceModel } from '../models/service.model';
import { UserModel } from '../models/user.model';
import { ServicesService } from '../services/services.service';
import { UserService } from '../services/user.service';

@Injectable()
export class UserGuard implements Resolve<UserModel> {
  constructor(private userService: UserService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.userService.finduser();
  }
}
