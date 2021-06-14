import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from '../../clientes/cliente.model';
import { ClientesService } from '../../clientes/clientes.service';
import { ServicoModel } from '../servico.model';
import { ServicosService } from '../servicos.service';

@Component({
  selector: 'app-novoservico',
  templateUrl: './novoservico.component.html',
  styleUrls: ['./novoservico.component.css']
})
export class NovoservicoComponent implements OnInit {

  selected ='';
  listCliente: Cliente[] =[];

  novoservico: ServicoModel = {
    descricao: '',
    cliente: '',
    valor: '',
  }

  constructor(
      private clienteService: ClientesService, 
      private router: Router, 
      private service: ServicosService) { }

  ngOnInit(): void {
    this.listarClientes();
  }

  listarClientes(): void {
    this.clienteService.findAllClientes().subscribe(
      response => {
        this.listCliente = response;
      }
    )
  }

  salvar(): void {
    this.service.novo(this.novoservico).subscribe(
      response => {
        console.log(response);
        this.service.mensagem("Serviço adicionado com sucesso!");
        this.router.navigate(['/servicos']);
      },err => {
        for(let i = 0; i < err.error.erros.length; i++) {
          this.service.mensagem(err.error.erros[i].mensagem)
        }
      })
  }

  voltar(){
    this.router.navigate(['/servicos']);
  }
}
