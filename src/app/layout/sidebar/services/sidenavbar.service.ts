import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { NavbarSettings } from '../models/navbnarSettings.model';
import { NavbarComponent } from '../navbar/navbar.component';

@Injectable({
  providedIn: 'root'
})
export class SideNavbarService {

  private sidenavbarIsOpen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  
  private _registry: { [key: string]: NavbarComponent } = {};

  constructor() { } 

    getSidebar(key): NavbarComponent{
      return this._registry[key];
    }

    register(key, sidebar): void{
      this._registry[key] = sidebar;
    }

    unregister(key): void{
      delete this._registry[key];
    }

    getSidenavbarIsOpen(){
      return this.sidenavbarIsOpen.asObservable()
    }

    setSidenavbarIsOpen(value: boolean){
      this.sidenavbarIsOpen.next(value)
    }

}