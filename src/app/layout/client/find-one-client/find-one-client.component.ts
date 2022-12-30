import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {finalize, take, takeUntil} from 'rxjs/operators';
import { Client } from 'src/app/models/client.model';
import { ClientsService } from 'src/app/services/clients.service';
import { SideNavbarService } from '../../sidebar/services/sidenavbar.service';
import { Subject } from 'rxjs';
import { SidenavbarNames } from '../../sidebar/models/sidenavbarNames';

@Component({
  selector: 'app-client-details',
  templateUrl: './find-one-client.component.html',
  styleUrls: ['./find-one-client.component.scss']
})
export class FineOneClientComponent implements OnInit {

  private componentDestroyed$ = new Subject();

  loading: boolean = false
  clientModel: Client
  id: number

  sidenavbarIsOpen: boolean = false

  constructor(
    private readonly _clientService: ClientsService,
    private readonly router: Router,
    private readonly _sidenavbarService: SideNavbarService
  ) { }

  ngOnInit(): void {
    this.getClientId()
    this.getSidenavState()
  }

  getClientId(){
    this._clientService.getCurrentClientId().pipe(takeUntil(this.componentDestroyed$)).subscribe({
      next: (clientId) => {
        this.id = clientId
      }
    })
  }

  getSidenavState(){
    this._sidenavbarService.getSidenavbarIsOpen().pipe(takeUntil(this.componentDestroyed$)).subscribe({
      next: (value) => {
        this.sidenavbarIsOpen = value

        if(this.sidenavbarIsOpen == true && this.id != null){
          this.getClient()
        }
      }
    })
  }

  getClient(){
      this.loading = true
      this._clientService.findOne(this.id).pipe(
        finalize(() =>  this.loading = false),
          take(1)
      ).subscribe({
        next: (resp) =>{
          this.clientModel = resp}
    })
  }

  update(){
    // this.dialog.open(CreateClientComponent, {
    //   width: '40rem',
    //   minHeight: '20rem',
    //   data: {
    //     client: this.data.id,
    //     type: DialogTypeEnum.UPDATE
    //   }
    // })
  }

  delete(){
    Swal.fire({
      icon: 'question',
      title: 'Deletar cliente',
      text: 'Você deseja deletar este cliente?',
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText:'Não',
      confirmButtonText: 'Sim'
    }).then((result) => {
      if(result.isConfirmed){
       this.confirmDeleteClient()
      }
    })
  }

  confirmDeleteClient(){
    this._clientService.delete(this.clientModel.client_id).subscribe({
      next : () => { this.messageAlert('Sucesso!', 'Cliente deletado com sucesso',
          true) },
      error: () => { this.messageAlert('Opsss', 'Não foi possível deletar este cliente',
          false)}
   })
  }

  messageAlert(title: string, message: string, success: boolean){
    Swal.fire({
      icon: success ? 'success' : 'error',
      title: `${title}`,
      text: `${message}`,
      showConfirmButton: true,
    }).then((result) => {
      if(result.isConfirmed){
        if(success){
          this.router.navigate(['/main/clientes'])
        }else{
          Swal.close()
        }
      }
    })
  }

  closeNavbar(){
    this._clientService.setCurrentClientId(null)
    this._sidenavbarService.setSidenavbarIsOpen(false)
    this._sidenavbarService.getSidebar(SidenavbarNames.COMPONENT_CLIENT_DETAILS).closeSidenav()
  }
}
