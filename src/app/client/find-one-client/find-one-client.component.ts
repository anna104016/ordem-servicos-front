import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client} from '../../models/client.model';
import { ClientsService } from '../../services/clients.service';
import Swal from 'sweetalert2';
import {finalize, take} from 'rxjs/operators';

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
    private clientService: ClientsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.id = this.activatedRoute?.snapshot?.params['id']
   }

  ngOnInit(): void {
    this.findOne()
  }

  findOne(){
    this.loading = true
    this.clientService.findOne(this.id).pipe(
      finalize(() =>  this.loading = false),
        take(1)
    ).subscribe({
      next: (resp) =>{ this.clientModel = resp}
  })
  }

  update(){
    this.router.navigate([`/main/clientes/update/${this.clientModel.client_id}`])
  }

  back(){
    this.router.navigate([`/main/clientes`])
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
       this.clientService.delete(this.clientModel.client_id).subscribe(
         result => {
           this.successModel()
         }, error => {
           this.errorModel()
         }
       )
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
      title: 'Oppess...!',
      text: 'Cliente não pode ser deletado',
      showConfirmButton: true,
    }).then((result) => {
      if(result.isConfirmed){
        this.router.navigate(['/main/clientes'])
      }
    })
  }

}
