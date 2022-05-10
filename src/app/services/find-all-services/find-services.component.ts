import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { take } from "rxjs/operators";
import Swal from "sweetalert2";
import { ServiceModel, Status } from "../../models/service.model";
import { ServicesService } from "../services.service";

@Component({
  selector: "app-find-services",
  templateUrl: "./find-services.component.html",
  styleUrls: ["./find-services.component.css"],
})
export class FindServicesComponent implements AfterViewInit {
  services: ServiceModel[] = this.activaredRoute.snapshot.data.servicos;

  displayedColumns: string[] = ["service_id", "description", "status", "data"];
  dataSource = new MatTableDataSource<ServiceModel>(this.services);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: ServicesService,
    private readonly activaredRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngAfterViewInit() {
    this.findAll();
  }

  findAll(): void {
    this.dataSource = new MatTableDataSource<ServiceModel>(this.services);
    this.dataSource.paginator = this.paginator;
  }

  newService() {
    this.router.navigate(["/main/servicos/create"]);
  }

  update(id: number) {
    this.router.navigate([`/main/servicos/update/${id}`]);
  }

  findOne(id: number) {
    this.router.navigate([`/main/servicos/dados/${id}`]);
  }

  deleteOne(id: number): void {
    Swal.fire({
      icon: "question",
      text: "Você deseja deleatar este serviço?",
      title: "Deletar serviço",
      showCancelButton: true,
      showConfirmButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        this.service
          .delete(id)
          .pipe(take(1))
          .subscribe(
            (res) => {
              this.successModel("Serviço deletado com sucesso!");
            },
            (error) => {
              this.successModel("Não foi possível deletar este serviço");
            }
          );
      } else {
        Swal.close();
      }
    });
  }

  successModel(text: string) {
    Swal.fire({
      icon: "success",
      title: "Sucesso!",
      text: `${text}`,
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.findAll();
      }
    });
  }

  errorModel(text: string) {
    Swal.fire({
      icon: "error",
      title: "Oppss.!",
      text: `${text}`,
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.findAll();
      }
    });
  }
}
