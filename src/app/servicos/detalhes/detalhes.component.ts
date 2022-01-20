import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientesService } from 'src/app/cliente/clientes.service';
import { Cliente } from '../../cliente/cliente.model';
import { ServicoModel } from '../servico.model';
import { ServicosService } from '../servicos.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.css']
})
export class DetalhesServicosComponent implements OnInit {

  servico: ServicoModel ={
    id: '',
    descricao: '',
    cliente: '',
    status: '',
  }

  constructor(
      private service: ServicosService, 
      private router: ActivatedRoute, 
      private route: Router,
      private serviceClient: ClientesService) { }

  ngOnInit(): void {
    this.servico.id = this.router.snapshot.paramMap.get('id');
    this.finById();
  }

  voltar(){
    this.route.navigate(['/servicos'])
  }
  deletarServico(): void{
    this.service.deletar(this.servico.id)
      .subscribe(response => {
        this.service.mensagem(`Serviço ${this.servico.id} exluido com sucesso!`);
        this.route.navigate(['/'])
      }, err => {
        this.service.mensagem(err.error.message);
      })
  }

  finById(): void {
    this.service.finById(this.servico.id)
      .subscribe(response => {
        this.servico = response;
      })
  }
}

