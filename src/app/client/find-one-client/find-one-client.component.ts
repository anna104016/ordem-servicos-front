import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client, ResClientResolve } from '../../models/client.model';
import { ClientsService } from '../clients.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-find-one-client',
  templateUrl: './find-one-client.component.html',
  styleUrls: ['./find-one-client.component.css']
})
export class FineOneClientComponent implements OnInit {

  clientModel: Client
  id: any

  constructor(
    private clientService: ClientsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private readonly spinner: NgxSpinnerService
  ) {
    this.id = this.activatedRoute?.snapshot?.params['id']
   }

  ngOnInit(): void {
    this.findOne()
  }

  findOne(){
    this.spinner.show()
    this.clientService.findOne(this.id).pipe(
      finalize(() =>  this.spinner.hide())
    ).subscribe(resp => {
      this.clientModel = resp
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
