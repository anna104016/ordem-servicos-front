import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Client } from '../client.model';
import { ClientsService } from '../clients.service';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {

  form: FormGroup
  client: boolean

  constructor(
    private router: Router, 
    private service: ClientsService,
    private formBiulder: FormBuilder) { }

  ngOnInit(): void {
    this.createForm(new Client())
  }

  create() {
    this.service.create(this.form.value)
      .subscribe(response => {
        this.successModel()
      }, error => {
        if(error.error.error == 'cpf'){
          this.service.message('CPF já cadastrado.')
        }else{
          this.errorModel()
        }
      })
  }
  
  successModel(){
    Swal.fire({
      icon: 'success',
      title: 'Sucesso!',
      text: 'Cliente adicionado com sucesso.',
      showConfirmButton: true,
    }).then((result) => {
      if(result.isConfirmed){
        this.router.navigate(['/main/clientes'])
      }
    }) 
  }

  errorModel(){
    Swal.fire({
      icon: 'error',
      title: 'Oppss.!',
      text: 'Erro ao adicionar cliente',
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
