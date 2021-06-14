import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from '../cliente.model';
import { ClientesService } from '../clientes.service';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html',
  styleUrls: ['./novo.component.css']
})
export class NovoComponent implements OnInit {

  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    dataCadastro: '',
    telefone: '',
  }
  constructor(private router: Router, private service: ClientesService) { }

  ngOnInit(): void {
  }

  novoCliente() {
    this.service.novoCliente(this.cliente)
      .subscribe(response =>{
          this.service.mensagem("Cliente adicionado com sucesso!");
          this.router.navigate(['/meus-clientes'])
      },err => {
        for(let i = 0; i < err.error.erros.length; i++) {
          this.service.mensagem(err.error.erros[i].mensagem)
        }
      })
  }

  cancelar(){
    this.router.navigate(['/meus-clientes'])
  }
}
