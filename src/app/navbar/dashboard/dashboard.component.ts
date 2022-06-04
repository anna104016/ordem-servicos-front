import { Component, OnInit } from '@angular/core';
import { Client, ReportClients } from 'src/app/models/client.model';
import { ClientsService } from 'src/app/client/clients.service';
import { ReportServices, ServiceModel } from 'src/app/models/service.model';
import { ServicesService } from 'src/app/services/services.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  totalServicos:number = 0
  totalServicosOpen:number = 0
  totalServicosClose:number = 0
  totalClientes:number = 0
  clientsWithService: number = 0
  clientsWithoutService: number = 0

  constructor(
    private readonly clientService: ClientsService,
    private readonly servicesService: ServicesService,
    private readonly spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getReportServices()
    this.getReportClients()
  }

  getReportServices(){
    this.servicesService.reportService().subscribe((response: ReportServices) => {
      this.totalServicos= response.servicos
      this.totalServicosClose = response.servicos_fechados
      this.totalServicosOpen = response.servicos_abertos
    })
  }

  getReportClients(){
    this.clientService.reportClients().subscribe(
      (response : ReportClients) => {
        this.clientsWithService = response.clientes_com_servico
        this.clientsWithoutService = response.clientes_sem_servicos
        this.totalClientes = response.clientes
      }
    )
  }
}
