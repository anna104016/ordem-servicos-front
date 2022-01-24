import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Cliente } from '../cliente.model';
import { ClientesService } from '../clientes.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarClienteComponent implements AfterViewInit {

  clientes: Cliente[] = [];

  displayedColumns: string[] = ['id', 'nome', 'cpf','acoes'];
  dataSource = new MatTableDataSource<Cliente>(this.clientes);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: ClientesService, private router: Router) { }

  ngAfterViewInit(){
    this.findAllCliente();
  }

  novoCliente(){
    this.router.navigate(['/main/clientes/novo-cliente'])
  }

  findAllCliente(){
    this.service.findAllClientes()
      .subscribe(response => {
        this.clientes = response;
        this.dataSource = new MatTableDataSource<Cliente>(this.clientes);
        this.dataSource.paginator = this.paginator;
    })
  }
}
