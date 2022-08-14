import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { ClientsService } from '../services/clients.service';
import { Client } from '../models/client.model';

@Injectable()
export class ClientesGuard implements Resolve<Client[]> {

    constructor(private clienteService: ClientsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return null
    }
}
