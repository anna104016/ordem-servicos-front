import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Client} from 'src/app/models/client.model';
import {ClientsService} from 'src/app/services/clients.service';
import Swal from 'sweetalert2';
import {ServiceModel} from '../../models/service.model';
import {ServicesService} from '../../services/services.service';
import {take} from 'rxjs/operators';
import {StatusService} from 'src/app/services/status.service';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogTypeEnum} from "../../models/dialogType.enum";

@Component({
    selector: 'app-create-service',
    templateUrl: './create-service.component.html',
    styleUrls: ['./create-service.component.css']
})
export class CreateServiceComponent implements OnInit {

    loading: boolean = false

    clients: Client[] = [];
    status: any
    form: FormGroup

    constructor(
        private readonly router: Router,
        private readonly clientService: ClientsService,
        private readonly formBiulder: FormBuilder,
        private readonly statusService: StatusService,
        private readonly activatedRouter: ActivatedRoute,
        private readonly dialogRef: MatDialogRef<CreateServiceComponent>,
        @Inject(MAT_DIALOG_DATA) public readonly data: {service_id: number,type: DialogTypeEnum},
        private readonly service: ServicesService) {
    }

    ngOnInit(): void {
        this.getStatus()
        this.getClients();
        this.createForm()
        if (this.data.type === DialogTypeEnum.UPDATE) this.getService()
    }

    getStatus() {
        this.statusService.findAll()
            .pipe(take(1))
            .subscribe({
                next: (resp) => {
                    this.status = resp
                }
            })
    }

    getService() {
        this.loading = true
        this.service.findOne(this.data.service_id).pipe(take(1)).subscribe({
        next: (res: ServiceModel) => {
            this.form.patchValue({
                description: res.description,
                client: res.client,
                opening_date: res.opening_date,
                closing_date: res.closing_date,
                price: res.price,
                status: res.status
            })
            this.loading = false
        }})
    }

    getClients(): void {
        this.clientService.find()
            .pipe(take(1))
            .subscribe({
            next: (response) =>{
            this.clients = response.users;
        }}
        )
    }

    update(data: any): void {
        this.service.update(this.data.service_id, data).pipe(take(1)).subscribe(res => {
            this.successModel('Serviço atualizado com sucesso!')
        }, error => {
            this.errorModel('Não foi possível atualizar este serviço')
        })
    }

    submitForm(){
        const data = this.form.getRawValue()
        if(this.data.type === DialogTypeEnum.UPDATE){
            this.update(data)
        }else{
            this.save()
        }
    }

    save(): void {
        const data = {
            description: this.form.get('description').value,
            price: this.form.get('price').value,
            client: this.form.get('client').value
        }
        this.service.create(data).subscribe({
            next: () => {
                this.successModel('Serviço criado com sucesso!')
            }, error: () => {
                this.errorModel('Não foi pissível criar este serviço')
            }})
    }

    successModel(text: string): void {
        Swal.fire({
            icon: 'success',
            title: 'Sucesso!',
            text: `${text}`,
            showConfirmButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                this.dialogRef.close({data: true})
            }
        })
    }

    errorModel(text: string): void {
        Swal.fire({
            icon: 'error',
            title: 'Oppss.!',
            text: `${text}`,
            showConfirmButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                this.dialogRef.close()
            }
        })
    }

    createForm(): void {
        this.form = this.formBiulder.group({
            description: new FormControl('', [
                Validators.required,
                Validators.minLength(10)
            ]),
            price: new FormControl('', [
                Validators.required,
            ]),
            client: new FormControl('', [
                Validators.required
            ]),
            status: new FormControl(''),
            closing_date: new FormControl(''),
            opening_date: new FormControl(''),
        })
    }
}
