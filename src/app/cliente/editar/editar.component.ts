import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../cliente.model';
import { ClientesService } from '../clientes.service';
import { map, switchMap } from 'rxjs/operators'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarClienteComponent implements OnInit {

  form: FormGroup
  id:string

  constructor(
    private activatedRouter: ActivatedRoute,
    private formBuilder: FormBuilder,
    private service: ClientesService,
    private route: ActivatedRoute,
     private router: Router) { }

  ngOnInit(): void {
    this.findOne();
    this.createFornm()
  }

  findOne(): void {
    this.activatedRouter.params
    .pipe(
      map((params:any) => params['id']),
      switchMap(id => this.service.findById(id))
    ).subscribe(cliente => {
      this.id = cliente.id
      this.updateForm(cliente)
    })
  } 

  updateForm(cliente: Cliente) {
    this.form.patchValue({
      id: cliente.id,
      nome:cliente.nome,
      telefone:cliente.telefone,
      cpf: cliente.cpf
    })
  }

  createFornm(){
    this.form = this.formBuilder.group({
      id:null,
      nome: new FormControl(null, [
        Validators.required
      ]),
      telefone: new FormControl(null, [
        Validators.required,
        Validators.minLength(9)
      ]),
      cpf: new FormControl(null, [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11)
      ])
    })
  }

  cancelar(){
    this.router.navigate([`/clientes/dados/${this.id}`])
  }

  editar(): void {
    this.service.editar(this.form.value)
      .subscribe(response =>{
        this.sucesso()
      }, err => {
        this.error()
      })
  }

  sucesso(){
    Swal.fire({
      icon: 'success',
      title: 'Sucesso!',
      text: 'Cliente atualizado com sucesso',
      position: 'center',
      showConfirmButton: true,
    }).then((result) => {
      if(result.isConfirmed){
        this.router.navigate([`/clientes/dados/${this.id}`])
      }
    }) 
  }

  error(){
    Swal.fire({
      icon: 'error',
      title: 'Oppess...!',
      text: 'Erro ao atualizar cliente',
      showConfirmButton: true,
    }).then((result) => {
      if(result.isConfirmed){
        this.router.navigate([`/clientes/dados/${this.id}`])
      }
    }) 
  }
}
