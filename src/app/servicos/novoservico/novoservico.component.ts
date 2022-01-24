import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/cliente/cliente.model';
import { ClientesService } from 'src/app/cliente/clientes.service';
import { StatusService } from 'src/app/status/status.service';
import Swal from 'sweetalert2';
import { ServicoModel, Status } from '../servico.model';
import { ServicosService } from '../servicos.service';

@Component({
  selector: 'app-novoservico',
  templateUrl: './novoservico.component.html',
  styleUrls: ['./novoservico.component.css']
})
export class NovoservicoComponent implements OnInit {

  listCliente: Cliente[] = [];
  form: FormGroup

  constructor(
      private router: Router, 
      private clienteService: ClientesService, 
      private formBiulder: FormBuilder,
      private service: ServicosService) { }

  ngOnInit(): void {
    this.getClients();
    this.createForm(new ServicoModel())
  }

  getClients(): void {
    this.clienteService.findAllClientes().subscribe(
      response => {
        this.listCliente = response;
      }
    )
  }

  salvar(): void {
    this.service.novo(this.form.value).subscribe(
      response => {
        this.sucesso()
      },err => {
        this.error()
      })
  }

  sucesso(){
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

  error(){
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

  voltar(){
    this.router.navigate(['/main/servicos']);
  }

  createForm(servico: ServicoModel){
    this.form = this.formBiulder.group({
      descricao: new FormControl(servico.descricao, [
        Validators.required,
        Validators.minLength(10)
      ]),
      valor: new FormControl(servico.valor, [
        Validators.required
      ]),
      cliente: new FormControl(servico.cliente, [
        Validators.required
      ])
    })
  }
}
