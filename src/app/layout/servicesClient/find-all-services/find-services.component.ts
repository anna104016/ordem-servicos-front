import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { take } from "rxjs/operators";
import { MatDialog } from "@angular/material/dialog";
import { ServiceDetailsComponent } from "../service-details/service-details.component";
import { CreateServiceComponent } from "../create-service/create-service.component";
import { DialogTypeEnum } from "src/app/models/dialogType.enum";
import { IQuery } from "src/app/models/query.model";
import { ServiceModel, IRespGetServices } from "src/app/models/service.model";
import { ServicesService } from "src/app/services/services.service";
import { AlertService } from "src/app/services/alert.service";

@Component({
    selector: "app-find-servicesClient",
    templateUrl: "./find-services.component.html",
    styleUrls: ["./find-services.component.scss"],
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

    displayedColumns: string[] = ["description", "status", "data"];

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private readonly service: ServicesService,
        private readonly dialog: MatDialog,
        private readonly alertService: AlertService
    ) {}

    ngOnInit(): void {
        this.find(this.paginationDefault.page + 1, this.paginationDefault.size)
    }

    find(page: number, perPage: number, filter?: string): void {
        this.loading = true
        const query: IQuery = {
            page: page,
            take: perPage
        }

        if(filter){
            query.filter = filter
        }
        this.service.findAll(query).pipe(
            take(1)
        ).subscribe({
            next: (resp: IRespGetServices) => {
                this.services = resp.services
                this.paginationDefault.totalElements = resp.count
                this.loading = false
            }
        })
    }

    getNext(event: PageEvent): void {
        this.paginationDefault.size = event.pageSize
        this.paginationDefault.page = event.pageIndex
        this.find(event.pageIndex + 1, event.pageSize)
    }

    newService() {
        this.dialog.open(CreateServiceComponent, {
            width: '40rem',
            data: {
                type: DialogTypeEnum.CREATE
            }
        }).afterClosed().pipe(take(1)).subscribe({
            next: (resp: boolean) => {
                if (resp) {
                    this.find(this.paginationDefault.page + 1, this.paginationDefault.size)
                }
            }
        })
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
            next: (resp: { data: boolean }) => {
                if (resp) {
                    this.find(this.paginationDefault.page + 1, this.paginationDefault.size)
                }
            }
        })
    }

    findOne(id: number) {
        this.dialog.open(ServiceDetailsComponent, {
            width: '40rem',
            minHeight: '20rem',
            data: {
                service: id
            }
        }).afterClosed().pipe(take(1)).subscribe({
            next: (resp: { data: boolean }) => {
                if (resp) {
                    if (resp.data) this.find(this.paginationDefault.page + 1, this.paginationDefault.size)
                }
            }
        })
    }

    deleteOne(id: number): void {
        this.alertService.showSweetAlert({
            icon: "question",
            text: "Você deseja deleatar este serviço?",
            title: "Deletar serviço",
            showCancelButton: true,
            }
        ).then((res) => {
            if (res.isConfirmed) {this.confirmDeleteService(id)}
        });
    }

    confirmDeleteService(id: number){
       this.service.delete(id).pipe(take(1)).subscribe({
            next: () => {
                this.successModel("Serviço deletado com sucesso!");
            },
            error: () => {
                this.successModel("Não foi possível deletar este serviço");
               }
            });
    }

    successModel(text: string) {
        this.alertService.showSweetAlert({
            icon: "success",
            title: "Sucesso!",
            text: `${text}`,
        }).then((result) => {
            if (result.isConfirmed) {
                this.find(this.paginationDefault.page + 1, this.paginationDefault.size)
            }
        });
    }
}
