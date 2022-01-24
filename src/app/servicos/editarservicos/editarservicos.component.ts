import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Cliente } from 'src/app/cliente/cliente.model';
import { ClientesService } from 'src/app/cliente/clientes.service';
import { StatusService } from 'src/app/status/status.service';
import Swal from 'sweetalert2';
import { ServicoModel, Status } from '../servico.model';
import { ServicosService } from '../servicos.service';

@Component({
  selector: 'app-editarservicos',
  templateUrl: './editarservicos.component.html',
  styleUrls: ['./editarservicos.component.css']
})
export class EditarservicosComponent implements OnInit {
  
  listCliente: Cliente[] = [];
  statusList: Status[] = []
  form: FormGroup
  servico: ServicoModel = new ServicoModel()

  constructor(
      private formBuilder: FormBuilder,
      private statusService: StatusService,
      private activatedRoute: ActivatedRoute, 
      private cliService: ClientesService, 
      private service: ServicosService,
      private router: Router
      ) { }

  ngOnInit(): void {
    this.getStatus()
    this.getClients();
    this.getServicoById();
    this.createForm(this.servico)
  }

  voltar(){
    this.router.navigate(['/main/servicos'])
  }

  getStatus(){
    this.statusService.findAll().subscribe(
      response => {
        this.statusList = response
      }
    )
  }
  
  getClients(): void {
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
      servico_id: servico.servico_id,
      descricao: servico.descricao,
      cliente: servico.cliente,
      data_abertura: servico.data_abertura,
      data_fechamento: servico.data_fechamento,
      valor: servico.valor,
      status: servico.status
    })
  }

  createForm(servico: ServicoModel){
    this.form = this.formBuilder.group({
      servico_id: this.servico.servico_id,
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
      data_fechamento: new FormControl(servico.cliente),
      data_abertura: ({value: servico.data_abertura, disabled:true}),
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
        this.router.navigate([`/main/servicos/dados/${this.servico.servico_id}`])
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
        this.router.navigate([`/main/servicos/dados/${this.servico.servico_id}`])
      }
    }))
  }
}
