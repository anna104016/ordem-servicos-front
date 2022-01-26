import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from 'src/app/client/client.model';
import { ClientsService } from 'src/app/client/clients.service';
import Swal from 'sweetalert2';
import { ServiceModel, Status } from '../service.model';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.component.html',
  styleUrls: ['./create-service.component.css']
})
export class CreateServiceComponent implements OnInit {

  clients: Client[] = [];
  form: FormGroup

  constructor(
      private router: Router, 
      private clientService: ClientsService, 
      private formBiulder: FormBuilder,
      private service: ServicesService) { }

  ngOnInit(): void {
    this.getClients();
    this.createForm(new ServiceModel())
  }

  getClients(): void {
    this.clientService.find().subscribe(
      response => {
        this.clients = response;
      }
    )
  }

  save(): void {
    this.service.create(this.form.value).subscribe(
      response => {
        this.successModel()
      },err => {
        this.errorModel()
      })
  }

  successModel(){
    Swal.fire({
      icon: 'success',
      title: 'Sucesso!',
      text: 'Servico adicionado com sucesso',
      showConfirmButton: true,
    }).then((result) => {
      if(result.isConfirmed){
        this.router.navigate(['/main/servicos'])
      }
    }) 
  }

  errorModel(){
    Swal.fire({
      icon: 'error',
      title: 'Oppss.!',
      text: 'Erro ao adicionar serviço',
      showConfirmButton: true,
    }).then((result) => {
      if(result.isConfirmed){
        this.router.navigate(['/main/servicos'])
      }
    }) 
  }

  wayBack(){
    this.router.navigate(['/main/servicos']);
  }

  createForm(service: ServiceModel){
    this.form = this.formBiulder.group({
      description: new FormControl(service.description, [
        Validators.required,
        Validators.minLength(10)
      ]),
      price: new FormControl(service.price, [
        Validators.required
      ]),
      client: new FormControl(service.client, [
        Validators.required
      ])
    })
  }
}
