import { Component, OnInit, ViewChild } from "@angular/core";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import { ActivatedRoute, Router } from "@angular/router";
import {  take } from "rxjs/operators";
import Swal from "sweetalert2";
import {IRespGetServices, ServiceModel, Status} from "../../models/service.model";
import { ServicesService } from "../../services/services.service";
import {MatDialog} from "@angular/material/dialog";
import {FindOneServiceComponent} from "../find-one-service/find-one-service.component";
import {IQuery} from "../../models/query.model";
import {CreateServiceComponent} from "../create-service/create-service.component";
import {DialogTypeEnum} from "../../models/dialogType.enum";

@Component({
  selector: "app-find-servicesClient",
  templateUrl: "./find-services.component.html",
  styleUrls: ["./find-services.component.css"],
})
export class FindServicesComponent implements OnInit {
  services: ServiceModel[] = []

  loading: boolean = true

  paginationDefault = {
    size: 12,
    totalElements: 0,
    page: 0
  }
  pageSizeOptions: number[] = [12, 24, 36, 48]

  displayedColumns: string[] = ["service_id", "description", "status", "data"];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private readonly service: ServicesService,
    private readonly activaredRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly dialog: MatDialog

  ) {}

  ngOnInit(): void {
    this.find(this.paginationDefault.page + 1, this.paginationDefault.size)
  }

  find(page: number, perPage: number): void {

    this.loading = true

    const query: IQuery = {
      page: page,
      take: perPage
    }

    this.service.findAll(query).pipe(
      take(1)
    ).subscribe({
    next:(resp : IRespGetServices) => {
      this.services = resp.services
      this.paginationDefault.totalElements = resp.totalSize
      this.loading = false
    }})
  }

  getNext (event: PageEvent): void {
    this.paginationDefault.size = event.pageSize
    this.paginationDefault.page = event.pageIndex
    console.log(event.pageIndex + 1, event.pageSize)

    this.find(event.pageIndex + 1, event.pageSize)
  }

  newService() {
    this.dialog.open(CreateServiceComponent, {
      width: '40rem',
      data: {
        type: DialogTypeEnum.CREATE
      }
    }).afterClosed().pipe(take(1)).subscribe({
      next: (resp: {data: boolean}) => {
        if(resp){
          if(resp.data) this.find(this.paginationDefault.page + 1, this.paginationDefault.size)
        }
    }})
  }

  update(id: number) {
    this.dialog.open(CreateServiceComponent, {
      width: '40rem',
      minHeight: '20rem',
      data: {
        service_id: id,
        type: DialogTypeEnum.UPDATE
      }
    }).afterClosed().pipe(take(1)).subscribe({
      next: (resp: {data: boolean}) => {
        if(resp){
          if(resp.data) this.find(this.paginationDefault.page + 1, this.paginationDefault.size)
        }
      }})
  }

  findOne(id: number) {
    this.dialog.open(FindOneServiceComponent,{
      width: '40rem',
      minHeight: '20rem',
        data: {
          service: id
        }
    }).afterClosed().pipe(take(1)).subscribe({
      next: (resp: {data: boolean}) => {
        if(resp){
            if(resp.data) this.find(this.paginationDefault.page + 1, this.paginationDefault.size)
        }
      }
    })
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
        this.find(this.paginationDefault.page + 1, this.paginationDefault.size)
      }
    });
  }
}
