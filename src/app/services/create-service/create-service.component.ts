import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/models/client.model';
import { ClientsService } from 'src/app/client/clients.service';
import Swal from 'sweetalert2';
import { ServiceModel, Status } from '../../models/service.model';
import { ServicesService } from '../services.service';
import { take } from 'rxjs/operators';
import { StatusService } from 'src/app/status/status.service';

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.component.html',
  styleUrls: ['./create-service.component.css']
})
export class CreateServiceComponent implements OnInit {

  clients: Client[] = [];
  status:any
  form: FormGroup
  service_id: string

  constructor(
      private readonly router: Router, 
      private readonly clientService: ClientsService, 
      private readonly formBiulder: FormBuilder,
      private readonly statusService: StatusService,
      private readonly activatedRouter: ActivatedRoute,
      private readonly service: ServicesService) { 
        this.service_id =  this.activatedRouter?.snapshot?.params['id'];
      }

  ngOnInit(): void {
    this.getSttatus()
    this.getClients();
    this.createForm(new ServiceModel())
    if(this.service_id) this.getService()
  }

  getSttatus(){
    this.statusService.findAll().subscribe(resp => {
      this.status = resp
    })
  }

  getService(){
    this.service.findOne(parseInt(this.service_id)).pipe(take(1)).subscribe((res: ServiceModel) => {
      this.form.patchValue({
        description: res.description,
        client: res.client,
        opening_date: res.opening_date,
        closing_date: res.closing_date,
        price: res.price,
        status: res.status
      })
    })
  }

  getClients(): void {
    this.clientService.find().subscribe(
      response => {
        this.clients = response;
      }
    )
  }

  update(): void {
    const form = this.form.getRawValue()
    form.service_id = parseInt(this.service_id)
    this.service.update(form).pipe(take(1)).subscribe(res => {
      this.successModel('Serviço atualizado com sucesso!')
    }, error => {
      this.errorModel('Não foi possível atualizar este serviço')
    })
  }

  save(): void {
    const form = this.form.getRawValue()
    this.service.create(form).subscribe(
      response => {
        this.successModel('Serviço criado com sucesso!')
      },err => {
        this.errorModel('Não foi pissível criar este serviço')
      })
  }

  successModel(text:string): void{
    Swal.fire({
      icon: 'success',
      title: 'Sucesso!',
      text: `${text}`,
      showConfirmButton: true,
    }).then((result) => {
      if(result.isConfirmed){
        this.router.navigate(['/main/servicos'])
      }
    }) 
  }

  errorModel(text:string): void{
    Swal.fire({
      icon: 'error',
      title: 'Oppss.!',
      text: `${text}`,
      showConfirmButton: true,
    }).then((result) => {
      if(result.isConfirmed){
        this.router.navigate(['/main/servicos'])
      }
    }) 
  }

  wayBack(): void{
    this.router.navigate(['/main/servicos']);
  }

  createForm(service: ServiceModel): void{
    if(this.service_id){
      this.form = this.formBiulder.group({
        service_id: service.service_id,
        description: new FormControl(service.description, [
          Validators.required,
          Validators.minLength(10)
        ]),
        price: new FormControl(service.price, [
          Validators.required
        ]),
        closing_date: ({value: service.closing_date}),
        opening_date: ({value: service.opening_date, disabled:true}),
        status: ({value: service.status}),
      })
    }else{
      this.form = this.formBiulder.group({
        description: new FormControl(service.description, [
          Validators.required,
          Validators.minLength(10)
        ]),
        price: new FormControl(service.price, [
          Validators.required,
        ]),
        client: new FormControl(service.client, [
          Validators.required
        ])
      })
    }
  }
}
