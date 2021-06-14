import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../cliente.model';
import { ClientesService } from '../clientes.service';

@Component({
  selector: 'app-deletar',
  templateUrl: './deletar.component.html',
  styleUrls: ['./deletar.component.css']
})
export class DeletarComponent implements OnInit {

  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
  }

  constructor(private route: Router, private service: ClientesService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.cliente.id = this.router.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void{
    this.service.findById(this.cliente.id)
      .subscribe(response => {
        this.cliente = response;
    })
  }

  cancelar(){
    this.route.navigate(['/meus-clientes'])
  }

  deletarCliente(): void{
    this.service.deletarCliente(this.cliente.id)
      .subscribe(response => {
        this.service.mensagem(`Cliente ${this.cliente.id} exluido com sucesso!`);
        this.route.navigate(['/meus-clientes'])
      }, err => {
        this.service.mensagem(err.error.message);
      })
  }
}
