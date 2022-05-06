import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { ServiceModel } from '../models/service.model';
import { ServicesService } from '../services/services.service';


@Injectable()
export class ServicesGuard implements Resolve<ServiceModel[]> {

    constructor(private servicosService :ServicesService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.servicosService.findAll();
    }

}
