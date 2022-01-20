import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/cliente/cliente.model';
import { ClientesService } from 'src/app/cliente/clientes.service';
import { ServicoModel } from '../servico.model';
import { ServicosService } from '../servicos.service';

@Component({
  selector: 'app-editarservicos',
  templateUrl: './editarservicos.component.html',
  styleUrls: ['./editarservicos.component.css']
})
export class EditarservicosComponent implements OnInit {
  

  listCliente: Cliente[] =[];
  
  editservico: ServicoModel = new ServicoModel()

  constructor(
      private route: ActivatedRoute, 
      private cliService: ClientesService, 
      private service: ServicosService,
      private router: Router
      ) { }

  ngOnInit(): void {
    this.editservico.id = this.route.snapshot.paramMap.get('id');
    this.getAllClientes();
    this.getServicoId();
  }

  voltar(){
    this.router.navigate(['/servicos'])
  }

  getAllClientes(): void {
    this.cliService.findAllClientes().subscribe(
      response => {
        this.listCliente = response;
      }
    );
  }

  getServicoId(): void{
    this.service.finById(this.editservico.id).subscribe(
      response => {
        this.editservico = response;
      }
    )
  }

  editar(): void {
    this.service.atualizar(this.editservico).subscribe(
      response => {
        this.service.mensagem(`Serviço ${this.editservico.id} atualizado com sucesso!`);
        this.router.navigate(['/servicos']);
      },err => {
        this.service.mensagem(err.error.message);
      }
    )
  }
}
