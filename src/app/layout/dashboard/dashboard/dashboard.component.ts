import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientsService } from 'src/app/services/clients.service';
import { ServicesService } from 'src/app/services/services.service';
import { forkJoin } from 'rxjs';
import { take } from 'rxjs/operators';
import {
  ApexChart,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ChartComponent
} from 'ng-apexcharts';
import { Notify } from 'notiflix';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  totalServices: number = 0;
  totalServicesOpen: number = 0;
  totalServicesClose: number = 0;
  totalClients: number = 0;
  clientsWithService: number = 0;
  clientsWithoutService: number = 0;

  series: number[] = [];

  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  @ViewChild('chart') chartClients: ChartComponent;
  public chartOptionsClients: Partial<ChartOptions>;

  constructor(
    private readonly clientService: ClientsService,
    private readonly servicesService: ServicesService
  ) {}

  ngOnInit(): void {
    this.configChart();
    this.configChartClients();
    this.getReport();
  }

  configChart() {
    this.chartOptions = {
      series: [
        this.totalServices,
        this.totalServicesOpen,
        this.totalServicesClose
      ],
      chart: {
        width: 380,
        type: 'pie',
        toolbar: {
          show: true,
          offsetX: 0,
          offsetY: 0,
          tools: {
            download: true
          },
          export: {
            csv: {
              filename: undefined,
              columnDelimiter: ',',
              headerCategory: 'category',
              headerValue: 'value',
              dateFormatter(timestamp) {
                return new Date(timestamp).toDateString();
              }
            },
            svg: {
              filename: undefined
            },
            png: {
              filename: undefined
            }
          },
          autoSelected: 'zoom'
        }
      },
      labels: ['Serviços', 'Serviços abertos', 'Serviços finalizados'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ]
    };
  }

  configChartClients() {
    this.chartOptionsClients = {
      series: [
        this.totalClients,
        this.clientsWithService,
        this.clientsWithoutService
      ],
      chart: {
        width: 380,
        type: 'pie',
        toolbar: {
          show: true,
          offsetX: 0,
          offsetY: 0,
          tools: {
            download: true
          },
          export: {
            csv: {
              filename: undefined,
              columnDelimiter: ',',
              headerCategory: 'category',
              headerValue: 'value',
              dateFormatter(timestamp) {
                return new Date(timestamp).toDateString();
              }
            },
            svg: {
              filename: undefined
            },
            png: {
              filename: undefined
            }
          },
          autoSelected: 'zoom'
        }
      },
      labels: [
        'Total de clientes',
        'Clientes com serviços',
        'Clientes sem serviços'
      ],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'center'
            }
          }
        }
      ]
    };
  }

  getReport() {
    forkJoin([this.getReportClients(), this.getReportServices()])
      .pipe(take(1))
      .subscribe({
        next: (resp) => {
          this.totalClients = resp[0].clientes;
          this.clientsWithoutService = resp[0].clientes_sem_servicos;
          this.clientsWithService = resp[0].clientes_com_servico;
          this.totalServices = resp[1].servicos;
          this.totalServicesClose = resp[1].servicos_fechados;
          this.totalServicesOpen = resp[1].servicos_abertos;

          this.configChartClients();
          this.configChart();
        },
        error: () => {
          Notify.failure('Falha ao retornar os dados');
        }
      });
  }

  getReportServices() {
    return this.servicesService.reportService();
  }

  getReportClients() {
    return this.clientService.reportClients();
  }
}
