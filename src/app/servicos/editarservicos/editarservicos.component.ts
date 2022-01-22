import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Cliente } from 'src/app/cliente/cliente.model';
import { ClientesService } from 'src/app/cliente/clientes.service';
import Swal from 'sweetalert2';
import { ServicoModel } from '../servico.model';
import { ServicosService } from '../servicos.service';

@Component({
  selector: 'app-editarservicos',
  templateUrl: './editarservicos.component.html',
  styleUrls: ['./editarservicos.component.css']
})
export class EditarservicosComponent implements OnInit {
  
  listCliente: Cliente[] = [];
  form: FormGroup
  servico: ServicoModel = new ServicoModel()

  constructor(
      private formBuilder: FormBuilder,
      private activatedRoute: ActivatedRoute, 
      private cliService: ClientesService, 
      private service: ServicosService,
      private router: Router
      ) { }

  ngOnInit(): void {
    this.getAllClientes();
    this.getServicoById();
    this.createForm(this.servico)
  }

  voltar(){
    this.router.navigate(['/servicos'])
  }

  getAllClientes(): void {
    this.cliService.findAllClientes().subscribe(
      response => {
        this.listCliente = response;
      }
    );
  }

  getServicoById(): void{
   this.activatedRoute.params
   .pipe(
     map((params:any) => params['id']),
     switchMap(id => this.service.finById(id))
   ).subscribe(servicos => {
     this.servico = servicos
     this.updateForm(servicos)
   })
  }

  editar(): void {
    this.service.atualizar(this.form.value).subscribe(
      response => {
        this.sucesso()
      },err => {
        this.error()
      }
    )
  }

  updateForm(servico: ServicoModel) {
    this.form.patchValue({
      id: servico.id,
      descricao: servico.descricao,
      cliente: servico.cliente,
      dataAbertura: servico.dataAbertura,
      dataFechamento: servico.dataFechamento,
      valor: servico.valor,
      status: servico.status
    })
  }

  createForm(servico: ServicoModel){
    this.form = this.formBuilder.group({
      id: this.servico.id,
      descricao: new FormControl(servico.descricao, [
        Validators.required,
        Validators.minLength(10)
      ]),
      valor: new FormControl(servico.valor, [
        Validators.required
      ]),
      cliente: new FormControl(servico.cliente, [
        Validators.required
      ]),
      dataFechamento: ({value: servico.dataFechamento, disabled:true}),
      dataAbertura: ({value: servico.dataAbertura, disabled:true}),
      status: new FormControl(servico.status, [
        Validators.required
      ])
    })
  }

  sucesso(){
    Swal.fire({
      title: 'Sucesso!',
      text: 'Serviço atualizado.',
      icon: 'success',
      showConfirmButton: true,
      confirmButtonText: 'Fechar'
    }).then((result => {
      if(result.isConfirmed){
        this.router.navigate([`/servicos/dados/${this.servico.id}`])
      }
    }))
  }

  error(){
    Swal.fire({
      title: 'oppss..!',
      text: 'Falha ao atualizar serviço.',
      footer: 'Tesnte novamento mais tarde',
      icon: 'error',
      showConfirmButton: true,
      confirmButtonText: 'Fechar'
    }).then((result => {
      if(result.isConfirmed){
        this.router.navigate([`/servicos/dados/${this.servico.id}`])
      }
    }))
  }
}
