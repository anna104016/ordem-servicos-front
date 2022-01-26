import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Client } from '../client.model';
import { ClientsService } from '../clients.service';

@Component({
  selector: 'app-find-clients',
  templateUrl: './find-clients.component.html',
  styleUrls: ['./find-clients.component.css']
})
export class FindClientsComponent implements AfterViewInit {

  clientes: Client[] = [];

  displayedColumns: string[] = ['client_id', 'name', 'cell_phone','actions'];
  dataSource = new MatTableDataSource<Client>(this.clientes);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: ClientsService, private router: Router) { }

  ngAfterViewInit(){
    this.find();
  }

  novoCliente(){
    this.router.navigate(['/main/clientes/novo-cliente'])
  }

  find(){
    this.service.find()
      .subscribe(response => {
        this.clientes = response;
        this.dataSource = new MatTableDataSource<Client>(this.clientes);
        this.dataSource.paginator = this.paginator;
    })
  }
}
