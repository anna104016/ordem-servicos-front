import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Client } from '../../models/client.model';
import { ClientsService } from '../clients.service';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {

  form: FormGroup
  clienteId: string

  constructor(
    private readonly router: Router, 
    private readonly service: ClientsService,
    private readonly activatedRouter: ActivatedRoute,
    private readonly formBiulder: FormBuilder) {
      this.clienteId = this.activatedRouter?.snapshot?.params['id'];
     }

  ngOnInit(): void {
    if(this.clienteId) this.getClient()
    this.createForm(new Client())
  }

  getClient(): void {
    const id = parseInt(this.clienteId)
    this.service.findOne(id).pipe(take(1)).subscribe((res: Client) => {
      this.getForm(res)
    })
  }

  getForm(client: Client){
    this.form.patchValue({
      name: client.name,
      cpf: client.cpf,
      cell_phone: client.cell_phone,
    })
  }

  create() {
    const form = this.form.getRawValue()
    this.service.create(this.form.value)
      .subscribe(response => {
        this.successModel('Cliente adicionado com sucesso!')
      }, error => {
        if(error.error.error == 'cpf'){
          this.service.message('CPF já cadastrado.')
        }else{
          this.errorModel('Não foi possilve adicionar este cliente')
        }
      })
  }

  update(){
    const form = this.form.getRawValue()
    form._id = parseInt(this.clienteId)
    this.service.update(parseInt(this.clienteId), form).pipe(take(1)).subscribe(res => {
      this.successModel('Cliente atualizado com sucesso!')
    }, erro => {
      this.errorModel('Não foi possível atualizar os dados do cliente')
    })
  }
  successModel(text:string){
    Swal.fire({
      icon: 'success',
      title: 'Sucesso!',
      text: `${text}`,
      showConfirmButton: true,
    }).then((result) => {
      if(result.isConfirmed){
        this.router.navigate(['/main/clientes'])
      }
    }) 
  }

  errorModel(text:string){
    Swal.fire({
      icon: 'error',
      title: 'Oppss.!',
      text: `${text}`,
      showConfirmButton: true,
    }).then((result) => {
      if(result.isConfirmed){
        this.router.navigate(['/main/clientes'])
      }
    }) 
  }

  cancel(){
    this.router.navigate(['/main/clientes'])
  }

  createForm(client: Client){
    this.form = this.formBiulder.group({
      name: new FormControl(client.name, [
        Validators.required,
        Validators.pattern('[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$'),
        Validators.minLength(5),
      ]),
      cell_phone: new FormControl(client.cell_phone, [
        Validators.required,
        Validators.pattern('[0-9]+$'),
        Validators.minLength(9),
        Validators.maxLength(20)
      ]),
      cpf: new FormControl(client.cpf, [
        Validators.required,
        Validators.pattern('[0-9]+$'),
        Validators.minLength(11),
        Validators.maxLength(11)
      ])
    })
  }
}
