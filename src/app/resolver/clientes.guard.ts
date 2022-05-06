import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { ClientsService } from '../client/clients.service';
import { Client } from '../models/client.model';
import { ServicesService } from '../services/services.service';


@Injectable()
export class ClientesGuard implements Resolve<Client[]> {

    constructor(private clienteService: ClientsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.clienteService.find();
    }

}
