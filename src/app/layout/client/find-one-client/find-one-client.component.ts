import {Component, Inject, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import {finalize, take} from 'rxjs/operators';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CreateClientComponent} from "../create-client/create-client.component";
import { Client } from 'src/app/models/client.model';
import { DialogTypeEnum } from 'src/app/models/dialogType.enum';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-find-one-client',
  templateUrl: './find-one-client.component.html',
  styleUrls: ['./find-one-client.component.css']
})
export class FineOneClientComponent implements OnInit {
  loading: boolean = false
  clientModel: Client
  id: number

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
       this.confirmDeleteClient()
      }
    })
  }

  confirmDeleteClient(){
    this.clientService.delete(this.clientModel.client_id).subscribe({
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
}
