import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { ServiceModel } from '../models/service.model';
import { ServicesService } from '../services/services.service';

@Injectable()
export class ServiceGuard implements Resolve<ServiceModel> {
  constructor(
    private servicosService: ServicesService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    let serviceid = route.params['id'];
    return this.servicosService.findOne(serviceid);
  }
}
