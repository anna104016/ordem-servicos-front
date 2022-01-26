import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceModel } from '../service.model';
import { ServicesService } from '../services.service';
import { map, switchMap } from 'rxjs/operators'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-find-one-service',
  templateUrl: './find-one-service.component.html',
  styleUrls: ['./find-one-service.component.css']
})
export class FindOneServiceComponent implements OnInit {

  serviceModel: ServiceModel = new ServiceModel()

  constructor(
      private servicesService: ServicesService, 
      private activatedRoute: ActivatedRoute, 
      private router: Router) { }

  ngOnInit(): void {
    this.findOne();
  }

  wayBack(){
    this.router.navigate(['/main/servicos'])
  }

  findOne(): void {
    this.activatedRoute.params
    .pipe(
      map((params:any) => params['id']),
      switchMap(id => this.servicesService.findOne(id))
    ).subscribe(service => {
      this.serviceModel = service
    })
  }

  update(){
    this.router.navigate([`/main/servicos/atualizar/${this.serviceModel.service_id}`])
  }

  delete(){
    Swal.fire({
      title: 'Deletar serviço',
      icon:'question',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'SIM',
      cancelButtonText: 'NÃO'
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
      title: 'Oppess...!',
      text: 'Serviço não pode ser deletado',
      showConfirmButton: true,
    }).then((result) => {
      if(result.isConfirmed){
        this.router.navigate([`/main/servicos/dados/${this.serviceModel.service_id}`])
      }
    }) 
  }
}

