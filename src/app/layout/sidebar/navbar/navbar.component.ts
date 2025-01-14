import { SidebarSideClassName, SidebarTheme } from '../models/sidenavbar.enum';
import {
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2,
  SimpleChanges
} from '@angular/core';
import { SideNavbarService } from '../services/sidenavbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy, OnChanges {
  @Input() side: SidebarSideClassName;
  @Input() name: string;
  @Input() theme: SidebarTheme;

  @HostBinding('class') get navbarSide() {
    return `${this.side} ${this.theme}`;
  }

  @HostBinding('class.sidebar__container__show')
  opened: boolean = false;

  @HostBinding('class.sidebar__container')
  configSidebar: boolean = false;

  @HostBinding('class.sidebar__container__hide')
  closed: boolean = true;

  constructor(
    private _sideNavbarService: SideNavbarService,
    private _elementRef: ElementRef,
    private _renderer: Renderer2
  ) {}

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit(): void {
    this._sideNavbarService.register(this.name, this);
  }

  public openSidebar() {
    this.opened = true;
    this.configSidebar = true;
    this.closed = false;
    // this.renderer.addClass(this._elementRef.nativeElement, 'sidebar__container__show');
    // this.renderer.addClass(this._elementRef.nativeElement, 'sidebar__container');
  }

  public closeSidenav() {
    this.opened = false;
    this.configSidebar = false;
    this.closed = true;
  }

  ngOnDestroy(): void {
    this._sideNavbarService.unregister(this.name);
  }
}
