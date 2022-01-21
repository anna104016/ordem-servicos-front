import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientesService } from 'src/app/cliente/clientes.service';
import { ServicoModel } from '../servico.model';
import { ServicosService } from '../servicos.service';
import { map, switchMap } from 'rxjs/operators'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.css']
})
export class DetalhesServicosComponent implements OnInit {

  servico= new ServicoModel()

  constructor(
      private servicosService: ServicosService, 
      private activatedRoute: ActivatedRoute, 
      private router: Router,
      private serviceClient: ClientesService) { }

  ngOnInit(): void {
    this.findOne();
  }

  back(){
    this.router.navigate(['/servicos'])
  }

  findOne(): void {
    this.activatedRoute.params
    .pipe(
      map((params:any) => params['id']),
      switchMap(id => this.servicosService.finById(id))
    ).subscribe(servico => {
      this.servico = servico
    })
  }

  update(){
    this.router.navigate([`/servicos/atualizar/${this.servico.id}`])
  }

  delete(){
    Swal.fire({
      title: 'Deletar serviço',
      icon:'question',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'SIM',
      cancelButtonText: 'NÃO'
    }).then((result) => {
      if(result.isConfirmed){
        this.servicosService.deletar(this.servico.id).subscribe(
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
      text: 'Serviço deletado com sucesso',
      showConfirmButton: true,
    }).then((result) => {
      if(result.isConfirmed){
        this.router.navigate([`/servicos`])
      }
    }) 
  }

  error(){
    Swal.fire({
      icon: 'error',
      title: 'Oppess...!',
      text: 'Serviço não pode ser deletado',
      showConfirmButton: true,
    }).then((result) => {
      if(result.isConfirmed){
        this.router.navigate([`/servicos/dados/${this.servico.id}`])
      }
    }) 
  }
}

