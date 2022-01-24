import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/cliente/cliente.model';
import { ClientesService } from 'src/app/cliente/clientes.service';
import { ServicoModel } from 'src/app/servicos/servico.model';
import { ServicosService } from 'src/app/servicos/servicos.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  cliente: Cliente[] = []
  servicos: ServicoModel[] = []

  totalServicos:number = 0
  totalServicosOpen:number = 0
  totalServicosClose:number = 0
  totalClientes:number = 0
  clientsWithService: number = 0
  clientsWithoutService: number = 0

  constructor(
    private clienteService: ClientesService,
    private servicosService: ServicosService,
  ) { }

  ngOnInit(): void {
    this.getServicos()
    this.getClientesService()
  }

  getServicos(){
    this.servicosService.findAllServicos().subscribe(
      response => {
        this.servicos = response
        this.totalServicos += this.servicos.length
        this.getServicosOpen(response)
        this.getServicosClose(response)
    })
  }

  getServicosOpen(response: any[]){
    var status: string = 'ABERTO'
    const total = response.filter((s) => s.status.nome == status)
    if(total.length >= 0){
      this.totalServicosOpen += total.length
    }
  }

  getServicosClose(response: any[]){
    var status: string = 'FINALIZADO'
    const total = response.filter((s) => s.status.nome == status)
    if(total.length >= 0){
      this.totalServicosClose += total.length
    }
  }

  getClientesService(){
    this.clienteService.relatorios().subscribe(
      response => {
        this.clientsWithService = response.clientes_com_servico
        this.clientsWithoutService = response.clientes_sem_servicos
        this.totalClientes = response.clientes
      }
    )
  }
}
