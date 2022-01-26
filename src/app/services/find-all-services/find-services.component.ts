import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ServiceModel, Status } from '../service.model';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-find-services',
  templateUrl: './find-services.component.html',
  styleUrls: ['./find-services.component.css']
})
export class FindServicesComponent implements AfterViewInit  {

  services: ServiceModel[] = [];

  displayedColumns: string[] = ['service_id', 'description','status', 'data'];
  dataSource = new MatTableDataSource<ServiceModel>(this.services);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor( 
      private service: ServicesService, 
      private router: Router) { }

      ngAfterViewInit() {
        this.findAll();
      }

      findAll(): void {
        this.service.findAll().subscribe(response => {
          this.services = response;
          this.dataSource = new MatTableDataSource<ServiceModel>(this.services);
          this.dataSource.paginator = this.paginator;
        })
      }

      newService(){
        this.router.navigate(['/main/servicos/novo-servico'])
      }

      findOne(id:string){
        this.router.navigate([`/main/servicos/dados/${id}`])
      }
  }
