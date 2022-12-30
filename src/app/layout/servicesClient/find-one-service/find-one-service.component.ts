import {Component, Inject, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { take } from 'rxjs/operators';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CreateServiceComponent} from "../create-service/create-service.component";
import { DialogTypeEnum } from 'src/app/models/dialogType.enum';
import { ServiceModel } from 'src/app/models/service.model';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-find-one-service',
  templateUrl: './find-one-service.component.html',
  styleUrls: ['./find-one-service.component.scss']
})
export class FindOneServiceComponent implements OnInit {
  loading: boolean = false
  serviceModel: ServiceModel;

  constructor(
      private readonly servicesService: ServicesService,
      private readonly router: Router,
      private readonly  dialog: MatDialog,
      private readonly dialogRef: MatDialogRef<FindOneServiceComponent>,
      @Inject(MAT_DIALOG_DATA) private readonly data: {
        service: number}
      ) {}

  ngOnInit(): void {
    this.findOne();
  }

  wayBack(): void{
    this.router.navigate(['/main/servicos'])
  }

  findOne(): void {
    this.loading = true
    this.servicesService.findOne(this.data.service).pipe(take(1)).subscribe({
      next: (resp) => this.serviceModel = resp,
      complete: () => {
          this.loading = false
      }
    })
  }

  update(){
    this.dialogRef.close()
    this.dialog.open(CreateServiceComponent, {
      width: '40rem',
      minHeight: '20rem',
      data: {
        service_id: this.data.service,
        type: DialogTypeEnum.UPDATE
      }
    })
  }

  delete(){
    Swal.fire({
      title: 'Deletar serviço',
      icon:'question',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if(result.isConfirmed){
        this.servicesService.delete(this.serviceModel.service_id).subscribe({
          next: ()  =>{
          this.dialogRef.close({data: true})
          this.successModel()
        } ,
        error: () => {
          this.errorModel()
        }
      } )
      }
    })
  }

  successModel(){
    Swal.fire({
      icon: 'success',
      title: 'Sucesso!',
      text: 'Serviço deletado com sucesso',
      showConfirmButton: true,
    }).then((result) => {
      if(result.isConfirmed){
        this.router.navigate([`/main/servicos`])
      }
    })
  }

  errorModel(){
    Swal.fire({
      icon: 'error',
      title: 'Opss...!',
      text: 'Serviço não pode ser deletado',
      showConfirmButton: true,
    }).then((result) => {
      if(result.isConfirmed){
        this.router.navigate([`/main/servicos/dados/${this.serviceModel.service_id}`])
      }
    })
  }
}

