import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Client} from 'src/app/models/client.model';
import {ClientsService} from 'src/app/services/clients.service';
import Swal from 'sweetalert2';
import {ServiceModel, Status} from '../../models/service.model';
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

    clientControl = new FormControl('', Validators.required)
    statusControl = new FormControl('', Validators.required)

    loading: boolean = false
    loadingSumit: boolean = false

    clients: Client[] = [];
    status: Status[] = []
    form: FormGroup

    constructor(
        private readonly router: Router,
        private readonly clientService: ClientsService,
        private readonly formBuilder: FormBuilder,
        private readonly statusService: StatusService,
        private readonly activatedRouter: ActivatedRoute,
        private readonly dialogRef: MatDialogRef<CreateServiceComponent>,
        @Inject(MAT_DIALOG_DATA) public readonly data: {service_id: number,type: DialogTypeEnum},
        private readonly service: ServicesService) {
    }

    ngOnInit(): void {
        this.getStatus()
        if (this.data.type === DialogTypeEnum.CREATE) this.getClients();
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
            this.statusControl.setValue(res.status.status_id)
            this.clientControl.setValue(res.client.client_id)
            this.form = this.formBuilder.group({
                description: new FormControl(res.description, [
                    Validators.required,
                    Validators.minLength(10)
                ]),
                price: new FormControl(res.price, [
                    Validators.required,
                ]),
                client: this.clientControl,
                status: this.statusControl,
                closing_date: new FormControl(res.closing_date),
                opening_date: new FormControl(res.opening_date),
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
        this.service.update(this.data.service_id, data).pipe(take(1)).subscribe({
          next: () => {
              this.successModel('Serviço atualizado com sucesso!')
              this.loadingSumit = false
        }, error: () => {
            this.errorModel('Não foi possível atualizar este serviço')
        }})
    }

    submitForm(){
        this.loadingSumit = true
        const data = this.form.getRawValue()
        if(this.data.type === DialogTypeEnum.UPDATE){
            this.update(data)
        }else{
            this.save()
        }
    }

    save(): void {
        console.log("chegou aqui")
        const data = {
            description: this.form.get('description').value,
            price: this.form.get('price').value,
            client: this.form.get('client').value
        }
        this.service.create(data).subscribe({
            next: () => {
                this.successModel('Serviço criado com sucesso!')
                this.loadingSumit = false
            }, error: () => {
                this.loading = false
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
                this.dialogRef.close(true)
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
        this.form = this.formBuilder.group({
            description: new FormControl('', [
                Validators.required,
                Validators.minLength(10)
            ]),
            price: new FormControl('', [
                Validators.required,
            ]),
            client: this.clientControl,
            status: this.statusControl,
            closing_date: new FormControl(''),
            opening_date: new FormControl(''),
        })
    }
}
