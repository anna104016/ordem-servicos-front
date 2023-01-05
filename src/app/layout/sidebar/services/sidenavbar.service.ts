import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';

@Injectable({
  providedIn: 'root'
})
export class SideNavbarService {
  private sidebarIsOpen: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private _sidebarFormClientIsOpen: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  private _registry: { [key: string]: NavbarComponent } = {};

  constructor() {}

  getSidebar(key): NavbarComponent {
    return this._registry[key];
  }

  register(key, sidebar): void {
    this._registry[key] = sidebar;
  }

  unregister(key): void {
    delete this._registry[key];
  }

  getSidebarIsOpen() {
    return this.sidebarIsOpen.asObservable();
  }

  setSidebarIsOpen(value: boolean) {
    this.sidebarIsOpen.next(value);
  }

  getSidebarClientFormIsOpen() {
    return this._sidebarFormClientIsOpen.asObservable();
  }

  setSidebarClientFormIsOpen(value: boolean) {
    this._sidebarFormClientIsOpen.next(value);
  }
}
