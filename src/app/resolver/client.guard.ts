import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Route,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { ClientsService } from '../services/clients.service';
import { Client } from '../models/client.model';

@Injectable()
export class OneClienteGuard implements Resolve<Client> {
  constructor(private clientsService: ClientsService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    let _id = route.params['id'];
    return this.clientsService.findOne(_id);
  }
}
