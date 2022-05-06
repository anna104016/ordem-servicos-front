import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client.model';
import { ClientsService } from 'src/app/client/clients.service';
import { ServiceModel } from 'src/app/models/service.model';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  cliente: Client[] = []
  servicos: ServiceModel[] = []

  totalServicos:number = 0
  totalServicosOpen:number = 0
  totalServicosClose:number = 0
  totalClientes:number = 0
  clientsWithService: number = 0
  clientsWithoutService: number = 0

  constructor(
    private clientService: ClientsService,
    private servicesService: ServicesService,
  ) { }

  ngOnInit(): void {
    this.getReportServices()
    this.getReportClients()
  }

  getReportServices(){
    this.servicesService.reportService().subscribe(response => {
      this.totalServicos= response.servicos
      this.totalServicosClose = response.servicos_fechados
      this.totalServicosOpen = response.servicos_abertos
    })
  }

  getReportClients(){
    this.clientService.reportClients().subscribe(
      response => {
        this.clientsWithService = response.clientes_com_servico
        this.clientsWithoutService = response.clientes_sem_servicos
        this.totalClientes = response.clientes
      }
    )
  }
}
