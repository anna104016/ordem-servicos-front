import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import { take} from 'rxjs/operators';
import Swal from 'sweetalert2';
import {MatDialog} from "@angular/material/dialog";
import { Client } from 'src/app/models/client.model';
import { DialogTypeEnum } from 'src/app/models/dialogType.enum';
import { IQuery } from 'src/app/models/query.model';
import { ClientsService } from 'src/app/services/clients.service';
import { SideNavbarService } from '../../sidebar/services/sidenavbar.service';
import {SidebarNames} from "../../sidebar/models/sidenavbarNames";
import { SidebarSideClassName, SidebarTheme } from '../../sidebar/models/sidenavbar.enum';

@Component({
  selector: "app-find-clients",
  templateUrl: "./find-clients.component.html",
  styleUrls: ["./find-clients.component.scss"],
})
export class FindClientsComponent implements OnInit {

  currentClientId: number

  sidebarSideClassName = SidebarSideClassName
  sidebarTheme = SidebarTheme
  sidebarNames = SidebarNames
  clientFormType = DialogTypeEnum
  
  clients: Client[] = []

  paginationDefault = {
    size: 12,
    totalElements: 0,
    page: 0
  }

  pageSizeOptions: number[] = [12, 24, 36, 48]
  displayedColumns: string[] = ["name", "cell_phone", "actions"];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  loading: boolean = true;

  constructor(
    private readonly _clientService: ClientsService,
    private readonly  _dialog: MatDialog,
    private readonly _sidebarService: SideNavbarService
  ) {}

  ngOnInit(): void {
    this.find(this.paginationDefault.page + 1, this.paginationDefault.size)
  }

  openClientDetails(id: number) {
    this.currentClientId = id
    this._sidebarService.setSidebarIsOpen(true)
    this._sidebarService.getSidebar(SidebarNames.COMPONENT_CLIENT_DETAILS).openSidebar()
  }

  deleteClient(id: number): void {
    Swal.fire({
      text: "Você deseja deletar este cliente?",
      title: "Deletar cliente",
      showCancelButton: true,
      showConfirmButton: true,
      icon: "question",
      confirmButtonText: "Sim",
      cancelButtonText: "Não",
    }).then((result) => {
      if (result.isConfirmed) {
        this.confirmDeleteClient(id)
      }
    });
  }

  confirmDeleteClient(id: number){
    this._clientService.delete(id).subscribe({
      next: () => { this.messageAlert('Cliente deletado com sucesso!', true)},
      error: () => {this.messageAlert('Cliente não pode ser deletado!', false)}
     });
  }

  messageAlert(text:string, sucess: boolean){
    Swal.fire({
      icon: sucess ? 'success' :  'error',
      title: 'Sucesso!',
      text: `${text}`,
      showConfirmButton: true,
    }).then((result) => {
      if(result.isConfirmed){
        Swal.close()
        this.find(this.paginationDefault.page + 1, this.paginationDefault.size)
      }
    })
  }

  getNext (event: PageEvent): void {
    this.paginationDefault.size = event.pageSize
    this.paginationDefault.page = event.pageIndex

    this.find(event.pageIndex + 1, event.pageSize)
  }

  find(page: number, perPage: number) {
    const query: IQuery = {
      page: page,
      take: perPage
    }

    this._clientService.find(query).pipe(take(1)).subscribe({
      next: (resp) => {
      this.clients = resp.users
      this.paginationDefault.totalElements = resp.count
        this.loading = false
    }})
  }

  closeClientDetailsComponent(){
    this._sidebarService.setSidebarIsOpen(false)
    this._sidebarService.getSidebar(SidebarNames.COMPONENT_CLIENT_DETAILS).closeSidenav()
  }

  openSidebarUpdateClient(id: number){
    this.currentClientId = id
    this._sidebarService.setSidebarClientFormIsOpen(true)
    this._sidebarService.getSidebar(SidebarNames.COMPONENT_CLIENT_FORM_UPDATE).openSidebar()
  }

  closeSidebarUpdateClient(){
    this._sidebarService.setSidebarClientFormIsOpen(false)
    this._sidebarService.getSidebar(SidebarNames.COMPONENT_CLIENT_FORM_UPDATE).closeSidenav()
  }

  openSidebaCreateClient(){
    this._sidebarService.getSidebar(SidebarNames.COMPONENT_CLIENT_FORM_CREATE).openSidebar()
  }

  openClientForm(event){
    this.closeClientDetailsComponent()
    this.openSidebarUpdateClient(event)
  }

}
