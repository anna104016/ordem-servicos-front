import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResServicoResolve, ServiceModel } from '../../models/service.model';
import { ServicesService } from '../services.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, take } from 'rxjs/operators';

@Component({
  selector: 'app-find-one-service',
  templateUrl: './find-one-service.component.html',
  styleUrls: ['./find-one-service.component.css']
})
export class FindOneServiceComponent implements OnInit {

  serviceModel: ServiceModel;
  id: any
  constructor(
      private readonly servicesService: ServicesService, 
      private readonly activatedRoute: ActivatedRoute, 
      private readonly router: Router,
      private readonly spinner: NgxSpinnerService
      ) {
        this.id = this.activatedRoute?.snapshot?.params['id']
       }

  ngOnInit(): void {
    this.findOne();
  }

  wayBack(): void{
    this.router.navigate(['/main/servicos'])
  }

  findOne(): void {
    this.spinner.show()
    this.servicesService.findOne(this.id).pipe(
      finalize(() => this.spinner.hide()),
      take(1)
    ).subscribe((resp : ServiceModel) => {
      this.serviceModel = resp
    })
  }

  update(){
    this.router.navigate([`/main/servicos/update/${this.serviceModel.service_id}`])
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
        this.servicesService.delete(this.serviceModel.service_id).subscribe(
          result => {
            this.successModel()
          }, error => {
            this.errorModel()
          }
        )
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

