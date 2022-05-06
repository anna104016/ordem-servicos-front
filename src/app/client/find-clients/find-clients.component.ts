import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Client } from '../../models/client.model';
import { ClientsService } from '../clients.service';

@Component({
  selector: "app-find-clients",
  templateUrl: "./find-clients.component.html",
  styleUrls: ["./find-clients.component.css"],
})
export class FindClientsComponent implements AfterViewInit {
  clientes: Client[] = this.activatedRoute.snapshot.data.clientes;

  displayedColumns: string[] = ["client_id", "name", "cell_phone", "actions"];
  dataSource = new MatTableDataSource<Client>(this.clientes);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private readonly service: ClientsService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngAfterViewInit() {
    this.find();
  }

  novoCliente() {
    this.router.navigate(["/main/clientes/create"]);
  }

  getClient(_id: number) {
    this.router.navigate([`/main/clientes/dados/${_id}`]);
  }

  updateCliente(_id: number) {
    this.router.navigate([`/main/clientes/update/${_id}`]);
  }

  deleteClient(id: number): void {
    Swal.fire({
      text: "Você deseja deletar este cliente?",
      title: "Deletar cliente",
      showCancelButton: true,
      showConfirmButton: true,
      icon: "question",
      confirmButtonText: "Sim",
      cancelButtonText: "Não",
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(id).subscribe(
          (resp) => {
            Swal.fire("Cliente deleta com sucesso", "", "success");
            this.find();
          },
          () => {
            Swal.fire("Não foi possível deletar este cliente", "", "error");
          }
        );
      }
    });
  }

  find() {
    this.dataSource = new MatTableDataSource<Client>(this.clientes);
    this.dataSource.paginator = this.paginator;
  }
}
