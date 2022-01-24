import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Cliente } from '../cliente.model';
import { ClientesService } from '../clientes.service';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html',
  styleUrls: ['./novo.component.css']
})
export class NovoClienteComponent implements OnInit {

  form: FormGroup

  constructor(
    private router: Router, 
    private service: ClientesService,
    private formBiulder: FormBuilder) { }

  ngOnInit(): void {
    this.createForm(new Cliente())
  }

  create() {
    this.service.novoCliente(this.form.value)
      .subscribe(response =>{
          this.sucesso()
      },error  => {
        this.error()
      })
  }
  
  sucesso(){
    Swal.fire({
      icon: 'success',
      title: 'Sucesso!',
      text: 'Cliente adicionado com sucesso',
      showConfirmButton: true,
    }).then((result) => {
      if(result.isConfirmed){
        this.router.navigate(['/main/clientes'])
      }
    }) 
  }

  error(){
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

  cancelar(){
    this.router.navigate(['/main/clientes'])
  }

  createForm(cliente: Cliente){
    this.form = this.formBiulder.group({
      nome: new FormControl(cliente.nome, [
        Validators.required,
        Validators.minLength(5)
      ]),
      telefone: new FormControl(cliente.telefone, [
        Validators.required,
        Validators.minLength(9)
      ]),
      cpf: new FormControl(cliente.cpf, [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11)
      ])
    })
  }
}
