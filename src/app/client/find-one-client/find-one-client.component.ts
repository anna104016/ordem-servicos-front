import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../../models/client.model';
import { ClientsService } from '../clients.service';
import { map, switchMap } from 'rxjs/operators'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-find-one-client',
  templateUrl: './find-one-client.component.html',
  styleUrls: ['./find-one-client.component.css']
})
export class FineOneClientComponent implements OnInit {

  clientModel = new Client()

  constructor(
    private clientService: ClientsService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.findOne()
  }

  findOne(){
    this.activatedRouter.params
    .pipe(
      map((params:any) => params['id']),
      switchMap(id => this.clientService.findOne(id))
    ).subscribe(client => {
      this.clientModel = client
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
      cancelButtonText:'NÃO',
      confirmButtonText: 'SIM'
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
