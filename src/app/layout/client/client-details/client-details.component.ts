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
import Swal from 'sweetalert2';
import { takeUntil } from 'rxjs/operators';
import { Client } from 'src/app/models/client.model';
import { ClientsService } from 'src/app/services/clients.service';
import { SideNavbarService } from '../../sidebar/services/sidenavbar.service';
import { Subject } from 'rxjs';

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
    private readonly _sidebarService: SideNavbarService
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
    Swal.fire({
      icon: 'question',
      title: 'Deletar cliente',
      text: 'Você deseja deletar este cliente?',
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: 'Não',
      confirmButtonText: 'Sim'
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
    Swal.fire({
      icon: success ? 'success' : 'error',
      title: `${title}`,
      text: `${message}`,
      showConfirmButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        if (success) {
          this._router.navigate(['/main/clientes']);
        } else {
          Swal.close();
        }
      }
    });
  }

  closeNavbar() {
    this.closeSidebar.emit();
  }
}
