import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Client } from 'src/app/models/client.model';
import { ClientsService } from 'src/app/services/clients.service';
import { SideNavbarService } from '../../sidebar/services/sidenavbar.service';
import { Subject } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit, OnDestroy, OnChanges {
  private componentDestroyed$ = new Subject();

  loading: boolean = false;
  clientModel: Client;

  @Input() clientId: number;

  @Output() closeSidebar = new EventEmitter();
  @Output() openClientForm = new EventEmitter();

  sidebarIsOpen: boolean = false;

  constructor(
    private readonly _clientService: ClientsService,
    private readonly _router: Router,
    private readonly _sidebarService: SideNavbarService,
    private readonly alertService: AlertService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.sidebarIsOpen == true) {
      this.getClientDetails();
    }
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  ngOnInit(): void {
    this.getSidenavState();
  }

  getSidenavState() {
    this._sidebarService
      .getSidebarIsOpen()
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe({
        next: (value) => {
          this.sidebarIsOpen = value;
        }
      });
  }

  getClientDetails() {
    this.loading = true;
    this._clientService.findOne(this.clientId).subscribe({
      next: (client) => {
        this.clientModel = client;
        this.loading = false;
      }
    });
  }

  openSidebarUpdateClient() {
    this._sidebarService.setSidebarIsOpen(false);
    this.openClientForm.emit(this.clientId);
  }

  deleteClient() {
    this.alertService.showSweetAlert({
      icon: 'question',
      title: 'Deletar cliente',
      text: 'Você deseja deletar este cliente?',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      confirmButtonText: 'Continuar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.confirmDeleteClient();
      }
    });
  }

  confirmDeleteClient() {
    this._clientService.delete(this.clientModel.client_id).subscribe({
      next: () => {
        this.messageAlert('Sucesso!', 'Cliente deletado com sucesso', true);
      },
      error: () => {
        this.messageAlert(
          'Opsss',
          'Não foi possível deletar este cliente',
          false
        );
      }
    });
  }

  messageAlert(title: string, message: string, success: boolean) {
    this.alertService.showSweetAlert({
      icon: success ? 'success' : 'error',
      title: `${title}`,
      text: `${message}`,
    }).then((result) => {
      if (result.isConfirmed) {
        if (success) {
          this._router.navigate(['/main/clientes']);
        } 
      }
    });
  }

  closeNavbar() {
    this.closeSidebar.emit();
  }
}
