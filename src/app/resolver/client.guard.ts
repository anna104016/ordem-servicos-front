import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { ClientsService } from '../client/clients.service';
import { Client } from '../models/client.model';

@Injectable()
export class OneClienteGuard implements Resolve<Client> {

    constructor(private clientsService: ClientsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        let _id = route.params['id']
        return this.clientsService.findOne(_id)
    }

}
