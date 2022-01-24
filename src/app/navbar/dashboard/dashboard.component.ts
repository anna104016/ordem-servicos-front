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

  totalClientes:number = 0
  totalServicos:number = 0
  totalServicosOpen:number = 0
  totalServicosClose:number = 0

  constructor(
    private clienteService: ClientesService,
    private servicosService: ServicosService,
  ) { }

  ngOnInit(): void {
    this.getClientes()
    this.getServicos()
  }

  getClientes(){
    this.clienteService.findAllClientes().subscribe(response => {
      this.cliente = response
        this.totalClientes += this.cliente.length
    })
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
    const total = response.filter((s) => s.status == status)
    if(total.length >= 0){
      this.totalServicosOpen += total.length
    }
  }

  getServicosClose(response: any[]){
    var status: string = 'FINALIZADO'
    const total = response.filter((s) => s.status == status)
    if(total.length >= 0){
      this.totalServicosClose += total.length
    }
  }
}
