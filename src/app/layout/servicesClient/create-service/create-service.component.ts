import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/models/client.model';
import { ClientsService } from 'src/app/services/clients.service';
import Swal from 'sweetalert2';
import { take } from 'rxjs/operators';
import { StatusService } from 'src/app/services/status.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogTypeEnum } from 'src/app/models/dialogType.enum';
import { ServiceModel, Status } from 'src/app/models/service.model';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.component.html',
  styleUrls: ['./create-service.component.scss']
})
export class CreateServiceComponent implements OnInit {
  clientControl = new FormControl('', Validators.required);
  statusControl = new FormControl('', Validators.required);

  loading: boolean = false;
  loadingSumit: boolean = false;

  clients: Client[] = [];
  status: Status[] = [];
  form: FormGroup;

  constructor(
    private readonly clientService: ClientsService,
    private readonly formBuilder: FormBuilder,
    private readonly statusService: StatusService,
    private readonly dialogRef: MatDialogRef<CreateServiceComponent>,
    @Inject(MAT_DIALOG_DATA)
    public readonly data: { service_id: number; type: DialogTypeEnum },
    private readonly service: ServicesService
  ) {}

  ngOnInit(): void {
    this.getStatus();
    if (this.data.type === DialogTypeEnum.CREATE) this.getClients();
    this.createForm();
    if (this.data.type === DialogTypeEnum.UPDATE) this.getService();
  }

  getStatus() {
    this.statusService
      .findAll()
      .pipe(take(1))
      .subscribe({
        next: (resp) => {
          this.status = resp;
        }
      });
  }

  getService() {
    this.loading = true;
    this.service
      .findOne(this.data.service_id)
      .pipe(take(1))
      .subscribe({
        next: (service: ServiceModel) => {
          this.statusControl.setValue(service.status.status_id);
          this.clientControl.setValue(service.client.client_id);
          this.updateForm(service);
          this.loading = false;
        }
      });
  }

  updateForm(service: ServiceModel) {
    this.form = this.formBuilder.group({
      description: [
        service.description,
        [Validators.required, Validators.minLength(10)]
      ],
      price: [service.price, [Validators.required]],
      client: this.clientControl,
      status: this.statusControl,
      closing_date: [service.closing_date],
      opening_date: [service.opening_date]
    });
  }

  getClients(): void {
    this.clientService
      .find()
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.clients = response.users;
        }
      });
  }

  update(data: any): void {
    this.service
      .update(this.data.service_id, data)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.successModel('Serviço atualizado com sucesso!');
          this.loadingSumit = false;
        },
        error: () => {
          this.errorModel('Não foi possível atualizar este serviço');
        }
      });
  }

  submitForm() {
    this.loadingSumit = true;
    const data = this.form.getRawValue();
    if (this.data.type === DialogTypeEnum.UPDATE) {
      this.update(data);
    } else {
      this.save();
    }
  }

  save(): void {
    const service = this.createServiceObject();
    this.service.create(service).subscribe({
      next: () => {
        this.successModel('Serviço criado com sucesso!');
        this.loadingSumit = false;
      },
      error: () => {
        this.loading = false;
        this.errorModel('Não foi pissível criar este serviço');
      }
    });
  }

  createServiceObject() {
    const service: ServiceModel = {
      description: this.form.get('description').value,
      price: this.form.get('price').value,
      client: this.form.get('client').value
    };
    return service;
  }

  successModel(text: string): void {
    Swal.fire({
      icon: 'success',
      title: 'Sucesso!',
      text: `${text}`,
      showConfirmButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.dialogRef.close(true);
      }
    });
  }

  errorModel(text: string): void {
    Swal.fire({
      icon: 'error',
      title: 'Oppss.!',
      text: `${text}`,
      showConfirmButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.dialogRef.close();
      }
    });
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: ['', [Validators.required]],
      client: this.clientControl,
      status: this.statusControl,
      closing_date: [''],
      opening_date: ['']
    });
  }
}
