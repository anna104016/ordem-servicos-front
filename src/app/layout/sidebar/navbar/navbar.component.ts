import { SidebarSideClassName, SidenavbarTheme } from './../models/sidenavbar.enum';
import { Component, HostBinding, OnInit, Input, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { SideNavbarService } from '../services/sidenavbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Input() side: SidebarSideClassName
  @Input() name: string
  @Input() theme: SidenavbarTheme

  @HostBinding('class') get navbarSide() { return `${this.side} ${this.theme}` }

  @HostBinding('class.sidebar__container__show')
  opened: boolean;

  @HostBinding('class.sidebar__container')
  configSidevbar: boolean

  constructor(
    private _sideNavbarService:SideNavbarService,
    private _elementRef: ElementRef, 
    private _renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this._sideNavbarService.register(this.name, this)
  }

  public openSidebar(){
    this.opened = true
    this.configSidevbar = true
    // this.renderer.addClass(this._elementRef.nativeElement, 'sidebar__container__show');
    // this.renderer.addClass(this._elementRef.nativeElement, 'sidebar__container');
  }

  public closeSidenav(){
    this.opened = false
    this.configSidevbar = false
  }

  ngOnDestroy(): void {
    this._sideNavbarService.unregister(this.name)
  }
}
