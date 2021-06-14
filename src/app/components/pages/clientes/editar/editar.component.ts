import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../cliente.model';
import { ClientesService } from '../clientes.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    dataCadastro: ''
  };

  constructor(private service: ClientesService,private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.cliente.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.service.findById(this.cliente.id)
    .subscribe(response => {
      this.cliente = response;
    })
  } 

  cancelar(){
    this.router.navigate(['/meus-clientes'])
  }

  editar(): void {
    this.service.editar(this.cliente)
      .subscribe(response =>{
        this.service.mensagem(`Cliente ${this.cliente.id} atualizado com sucesso!`);
        this.router.navigate(['/meus-clientes'])
      })
  }
}
