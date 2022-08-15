import {Component, Inject, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client} from '../../models/client.model';
import { ClientsService } from '../../services/clients.service';
import Swal from 'sweetalert2';
import {finalize, take} from 'rxjs/operators';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CreateServiceComponent} from "../../servicesClient/create-service/create-service.component";
import {DialogTypeEnum} from "../../models/dialogType.enum";
import {CreateClientComponent} from "../create-client/create-client.component";

@Component({
  selector: 'app-find-one-client',
  templateUrl: './find-one-client.component.html',
  styleUrls: ['./find-one-client.component.css']
})
export class FineOneClientComponent implements OnInit {

  loading: boolean = false

  clientModel: Client
  id: any

  constructor(
    private readonly clientService: ClientsService,
    private readonly router: Router,
    private readonly dialogRef: MatDialogRef<FineOneClientComponent>,
    private readonly dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: {
      id: number
  }
  ) { }

  ngOnInit(): void {
    this.findOne()
  }

  findOne(){
    this.loading = true
    this.clientService.findOne(this.data.id).pipe(
      finalize(() =>  this.loading = false),
        take(1)
    ).subscribe({
      next: (resp) =>{ this.clientModel = resp}
  })
  }

  update(){
    this.dialogRef.close()
    this.dialog.open(CreateClientComponent, {
      width: '40rem',
      minHeight: '20rem',
      data: {
        client: this.data.id,
        type: DialogTypeEnum.UPDATE
      }
    })
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
       this.clientService.delete(this.clientModel.client_id).subscribe({
         next : () => { this.successModel() },
         error: () => { this.errorModel()}
      })
      }
    })
  }

  successModel(){
    Swal.fire({
      icon: 'success',
      title: 'Sucesso!',
      text: 'Cliente deletado com sucesso',
      showConfirmButton: true,
    }).then((result) => {
      if(result.isConfirmed){
        this.router.navigate(['/main/clientes'])
      }
    })
  }

  errorModel(){
    Swal.fire({
      icon: 'error',
      title: 'Opss...!',
      text: 'Cliente não pode ser deletado',
      showConfirmButton: true,
    }).then((result) => {
      if(result.isConfirmed){
        this.router.navigate(['/main/clientes'])
      }
    })
  }
}
