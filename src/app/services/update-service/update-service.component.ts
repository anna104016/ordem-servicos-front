import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Client } from 'src/app/client/client.model';
import { StatusService } from 'src/app/status/status.service';
import Swal from 'sweetalert2';
import { ServiceModel, Status } from '../service.model';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-update-service',
  templateUrl: './update-service.component.html',
  styleUrls: ['./update-service.component.css']
})
export class UpdateServiceComponent implements OnInit {
  
  statusList: Status[] = []
  form: FormGroup
  serviceModel: ServiceModel = new ServiceModel()

  constructor(
      private formBuilder: FormBuilder,
      private statusService: StatusService,
      private activatedRoute: ActivatedRoute, 
      private serviceService: ServicesService,
      private router: Router
      ) { }

  ngOnInit(): void {
    this.getStatus()
    this.getServicoById();
    this.createForm(this.serviceModel)
  }

  cancel(){
    this.router.navigate(['/main/servicos'])
  }

  getStatus(){
    this.statusService.findAll().subscribe(
      response => {
        this.statusList = response
      }
    )
  }

  getServicoById(): void{
   this.activatedRoute.params
   .pipe(
     map((params:any) => params['id']),
     switchMap(id => this.serviceService.findOne(id))
   ).subscribe(service => {
     this.serviceModel = service
     this.updateForm(service)
   })
  }

  update(): void {
    this.serviceService.update(this.form.value).subscribe(
      response => {
        this.successModel()
      },err => {
        this.errorModel()
      }
    )
  }

  updateForm(servico: ServiceModel) {
    this.form.patchValue({
      service_id: servico.service_id,
      description: servico.description,
      client: servico.client.name,
      opening_date: servico.opening_date,
      closing_date: servico.closing_date,
      price: servico.price,
      status: servico.status
    })
  }

  createForm(service: ServiceModel){
    this.form = this.formBuilder.group({
      service_id: this.serviceModel.service_id,
      description: new FormControl(service.description, [
        Validators.required,
        Validators.minLength(10)
      ]),
      price: new FormControl(service.price, [
        Validators.required
      ]),
      client: ({value: service.client, disabled:true}),
      closing_date: new FormControl(service.closing_date),
      opening_date: ({value: service.opening_date, disabled:true}),
      status: new FormControl(service.status, [
        Validators.required
      ])
    })
  }

  successModel(){
    Swal.fire({
      title: 'Sucesso!',
      text: 'Serviço atualizado.',
      icon: 'success',
      showConfirmButton: true,
      confirmButtonText: 'Fechar'
    }).then((result => {
      if(result.isConfirmed){
        this.router.navigate([`/main/servicos/dados/${this.serviceModel.service_id}`])
      }
    }))
  }

  errorModel(){
    Swal.fire({
      title: 'oppss..!',
      text: 'Falha ao atualizar serviço.',
      footer: 'Tesnte novamento mais tarde',
      icon: 'error',
      showConfirmButton: true,
      confirmButtonText: 'Fechar'
    }).then((result => {
      if(result.isConfirmed){
        this.router.navigate([`/main/servicos/dados/${this.serviceModel.service_id}`])
      }
    }))
  }
}
