import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../client.model';
import { ClientsService } from '../clients.service';
import { map, switchMap } from 'rxjs/operators'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.css']
})
export class UpdateClientComponent implements OnInit {

  form: FormGroup
  id:string
  client: Client = new Client()

  constructor(
    private activatedRouter: ActivatedRoute,
    private formBuilder: FormBuilder,
    private service: ClientsService,
     private router: Router) { }

  ngOnInit(): void {
    this.findOne();
    this.createFornm(this.client)
  }

  findOne(): void {
    this.activatedRouter.params
    .pipe(
      map((params:any) => params['id']),
      switchMap(id => this.service.findOne(id))
    ).subscribe(client => {
      this.client = client
      this.updateForm(client)
    })
  } 

  updateForm(client: Client) {
    this.form.patchValue({
      cliente_id: client.client_id,
      name:client.name,
      cell_phone:client.cell_phone,
      cpf: client.cpf
    })
  }

  createFornm(client: Client){
    this.form = this.formBuilder.group({
      client_id: client.client_id,
      name: new FormControl(client.name, [
        Validators.required
      ]),
      cell_phone: new FormControl(client.cell_phone, [
        Validators.required,
        Validators.minLength(9)
      ]),
      cpf: new FormControl(client.cpf, [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11)
      ])
    })
  }

  cancel(){
    this.router.navigate([`/main/clientes/dados/${this.client.client_id}`])
  }

  update(): void {
    this.service.update(this.form.value)
      .subscribe(response =>{
        this.successModel()
      }, err => {
        this.errorModel()
      })
  }

  successModel(){
    Swal.fire({
      icon: 'success',
      title: 'Sucesso!',
      text: 'Cliente atualizado com sucesso',
      position: 'center',
      showConfirmButton: true,
    }).then((result) => {
      if(result.isConfirmed){
        this.router.navigate([`/main/clientes/dados/${this.client.client_id}`])
      }
    }) 
  }

  errorModel(){
    Swal.fire({
      icon: 'error',
      title: 'Oppess...!',
      text: 'Erro ao atualizar cliente',
      showConfirmButton: true,
    }).then((result) => {
      if(result.isConfirmed){
        this.router.navigate([`/main/clientes/dados/${this.client.client_id}`])
      }
    }) 
  }
}
