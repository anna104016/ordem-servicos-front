import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../cliente.model';
import { ClientesService } from '../clientes.service';
import { map, switchMap } from 'rxjs/operators'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente-id',
  templateUrl: './cliente-id.component.html',
  styleUrls: ['./cliente-id.component.css']
})
export class ClienteIdComponent implements OnInit {

  cliente = new Cliente()

  constructor(
    private clienteService: ClientesService,
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
      switchMap(id => this.clienteService.findById(id))
    ).subscribe(cliente => {
      this.cliente = cliente
    })
  }

  update(){
    this.router.navigate([`/clientes/atualizar/${this.cliente.id}`])
  }

  back(){
    this.router.navigate([`/clientes`])
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
       this.clienteService.deletarCliente(this.cliente.id).subscribe(
         result => {
           this.sucesso()
         }, error => {
           this.error()
         }
       )
      }
    }) 
  }

  sucesso(){
    Swal.fire({
      icon: 'success',
      title: 'Sucesso!',
      text: 'Cliente deletado com sucesso',
      showConfirmButton: true,
    }).then((result) => {
      if(result.isConfirmed){
        this.router.navigate(['/clientes'])
      }
    }) 
  }

  error(){
    Swal.fire({
      icon: 'error',
      title: 'Oppess...!',
      text: 'Cliente não pode ser deletado',
      showConfirmButton: true,
    }).then((result) => {
      if(result.isConfirmed){
        this.router.navigate(['/clientes'])
      }
    }) 
  }

}
