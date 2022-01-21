import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ClientesService } from 'src/app/cliente/clientes.service';
import { ServicoModel } from '../servico.model';
import { ServicosService } from '../servicos.service';

@Component({
  selector: 'app-listarservicos',
  templateUrl: './listarservicos.component.html',
  styleUrls: ['./listarservicos.component.css']
})
export class ListarservicosComponent implements AfterViewInit  {

  listaServicos: ServicoModel[] = [];

  displayedColumns: string[] = ['id', 'descricao','status', 'dados'];
  dataSource = new MatTableDataSource<ServicoModel>(this.listaServicos);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor( 
      private service: ServicosService, 
      private router: Router,
      private clienteService: ClientesService) { }

      ngAfterViewInit() {
        this.findAllServicos();
      }

      findAllServicos(): void {
        this.service.findAllServicos().subscribe(response => {
          this.listaServicos = response;
          this.dataSource = new MatTableDataSource<ServicoModel>(this.listaServicos);
          this.dataSource.paginator = this.paginator;
        })
      }

      newService(){
        this.router.navigate(['/servicos/novo'])
      }
  }
