import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { take} from 'rxjs/operators';
import Swal from 'sweetalert2';
import {MatDialog} from "@angular/material/dialog";
import {CreateClientComponent} from "../create-client/create-client.component";
import {FineOneClientComponent} from "../find-one-client/find-one-client.component";
import { Client } from 'src/app/models/client.model';
import { DialogTypeEnum } from 'src/app/models/dialogType.enum';
import { IQuery } from 'src/app/models/query.model';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: "app-find-clients",
  templateUrl: "./find-clients.component.html",
  styleUrls: ["./find-clients.component.css"],
})
export class FindClientsComponent implements OnInit {
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
    private readonly service: ClientsService,
    private readonly  dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.find(this.paginationDefault.page + 1, this.paginationDefault.size)
  }

  newClient() {
    this.dialog.open(CreateClientComponent, {
      width: '40rem',
      data: {
        type: DialogTypeEnum.CREATE
      }
    }).afterClosed().pipe(take(1)).subscribe({
      next: (resp: {data: boolean}) => {
        if(resp){
         this.find(this.paginationDefault.page + 1, this.paginationDefault.size)
        }
      }})
  }

  getClient(_id: number) {
    this.dialog.open(FineOneClientComponent,{
      width: '40rem',
      height: '20rem',
      data: {
        id: _id
      }
    }).afterClosed().pipe(take(1)).subscribe({
      next: (resp: {data: boolean}) => {
        if(resp){
          if(resp.data) this.find(this.paginationDefault.page + 1, this.paginationDefault.size)
        }
      }
    })
  }

  update(id: number) {
    this.dialog.open(CreateClientComponent, {
      width: '40rem',
      minHeight: '20rem',
      data: {
        client: id,
        type: DialogTypeEnum.UPDATE
      }
    }).afterClosed().pipe(take(1)).subscribe({
      next: (resp: {data: boolean}) => {
        if(resp){
          this.find(this.paginationDefault.page + 1, this.paginationDefault.size)
        }
      }})
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
    this.service.delete(id).subscribe({
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

    this.service.find(query).pipe(
      take(1)
    ).subscribe({
      next: (resp) => {
      this.clients = resp.users
      this.paginationDefault.totalElements = resp.count
        this.loading = false
    }})
  }
}
