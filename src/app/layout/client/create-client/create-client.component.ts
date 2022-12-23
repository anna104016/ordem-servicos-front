import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {take} from 'rxjs/operators';
import {ErrorsType} from 'src/app/models/error.enum';
import Swal from 'sweetalert2';
import {Notify} from "notiflix";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { Client } from 'src/app/models/client.model';
import { DialogTypeEnum } from 'src/app/models/dialogType.enum';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {

  loading: boolean = false
  loadingSumit: boolean = false
  form: FormGroup
  clienteId: string

  constructor(
    private readonly service: ClientsService,
    private readonly dialogRef: MatDialogRef<CreateClientComponent>,
    private readonly formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public readonly data: {
      client: number
      type: DialogTypeEnum}
    ) {}

  ngOnInit(): void {
    this.createForm()
    if(this.data.type === DialogTypeEnum.UPDATE) this.getClient()
  }

  getClient(): void {
    this.loading = true
    this.service.findOne(this.data.client).pipe(take(1)).subscribe({next: (res: Client) => {
        this.updateForm(res)
        this.loading = false
    }})
  }

  updateForm(client){
    this.form.patchValue({
      name: client.name,
      cpf: client.cpf,
      cell_phone: client.cell_phone,
    })
  }

  submitForm(){
    if(this.form.invalid) return

    this.loadingSumit = true

    if(this.data.type === DialogTypeEnum.CREATE){
      this.create()
    }else{
      this.update()
    }
  }
  create() {
    this.service.create(this.form.value)
      .subscribe({
        next: () => { 
          this.loadingSumit = false
          this.successModel('Cliente adicionado com sucesso!')} ,
        error: (error) => {
          this.loadingSumit = false
          if (error.error.error === ErrorsType.CPF_ALREDY_REGISTERED) {
            Notify.info("CPF já cadastrado")
          } else {
            this.errorModel('Não foi possilve adicionar este cliente')
          }
        }
    })
  }


  update(){
    const body = this.form.getRawValue()
    this.service.update(this.data.client, body)
        .pipe(take(1))
        .subscribe({next: () => {
          this.loadingSumit = false
          this.successModel('Cliente atualizado com sucesso!')
        }, error: (error) => {
          this.loadingSumit = false
          if(error.error.error === ErrorsType.CPF_ALREDY_REGISTERED){
            Notify.info("CPF já cadastrado")
          }else{
            this.errorModel('Não foi possível atualizar os dados do cliente')
          }
        }})
  }

  successModel(text:string){
    Swal.fire({
      icon: 'success',
      title: 'Sucesso!',
      text: `${text}`,
      showConfirmButton: true,
    }).then((result) => {
      if(result.isConfirmed){
        this.dialogRef.close(true)
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
        this.dialogRef.close()
      }
    })
  }

  createForm(){
    this.form = this.formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.pattern('[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$'),
        Validators.minLength(5),
      ]],
      cell_phone: ['', [
        Validators.required,
        Validators.pattern('[0-9]+$'),
        Validators.minLength(9),
        Validators.maxLength(20)
      ]],
      cpf:['', [
        Validators.required,
        Validators.pattern('[0-9]+$'),
        Validators.minLength(11),
        Validators.maxLength(11)
      ]]
    })
  }
}
