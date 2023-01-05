import { AlertService } from 'src/app/services/alert.service';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { ErrorsType } from 'src/app/models/error.enum';
import { Notify } from 'notiflix';
import { Client } from 'src/app/models/client.model';
import { DialogTypeEnum } from 'src/app/models/dialogType.enum';
import { ClientsService } from 'src/app/services/clients.service';
import { SideNavbarService } from '../../sidebar/services/sidenavbar.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit, OnChanges, OnDestroy {
  loading: boolean = false;
  loadingSumit: boolean = false;
  form: FormGroup;
  modaIsOpen: boolean = false;

  @Input() clientId: number;

  @Input() formType: DialogTypeEnum;

  @Output() closeSidebarClientForm = new EventEmitter();

  constructor(
    private readonly _service: ClientsService,
    private readonly _formBuilder: FormBuilder,
    private readonly _sidebarService: SideNavbarService,
    private readonly _alertService: AlertService
  ) {}

  ngOnDestroy(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.modaIsOpen == true && changes.clientId && changes.formType) {
      this.getClient();
    }
  }

  ngOnInit(): void {
    this.createForm();
    this.getSeidebarState();
  }

  getSeidebarState() {
    this._sidebarService.getSidebarClientFormIsOpen().subscribe({
      next: (isOpen) => {
        this.modaIsOpen = isOpen;
      }
    });
  }

  getClient(): void {
    if (this.formType === DialogTypeEnum.UPDATE) {
      this.loading = true;
      this._service
        .findOne(this.clientId)
        .pipe(take(1))
        .subscribe({
          next: (res: Client) => {
            this.updateForm(res);
            this.loading = false;
          }
        });
    }
  }

  updateForm(client) {
    this.form.patchValue({
      name: client.name,
      cpf: client.cpf,
      cell_phone: client.cell_phone
    });
  }

  submitForm() {
    if (this.form.invalid) return;

    if (this.formType === DialogTypeEnum.CREATE) {
      this.create();
    } else {
      this.update();
    }
  }
  create() {
    this._service.create(this.form.value).subscribe({
      next: () => {
        this.loadingSumit = false;
        this.successModel('Cliente adicionado com sucesso!');
      },
      error: (error) => {
        this.loadingSumit = false;
        if (error.error.error === ErrorsType.CPF_ALREDY_REGISTERED) {
          Notify.info('CPF já cadastrado');
        } else {
          this.errorModel('Não foi possilve adicionar este cliente');
        }
      }
    });
  }

  update() {
    const body = this.form.getRawValue();
    this._service
      .update(this.clientId, body)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.loadingSumit = false;
          this.successModel('Cliente atualizado com sucesso!');
        },
        error: (error) => {
          this.loadingSumit = false;
          if (error.error.error === ErrorsType.CPF_ALREDY_REGISTERED) {
            Notify.info('CPF já cadastrado');
          } else {
            this.errorModel('Não foi possível atualizar os dados do cliente');
          }
        }
      });
  }

  successModel(text: string) {
    this._alertService.showSweetAlert({
      icon: 'success',
      title: 'Sucesso!',
      text: `${text}`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.closeModal(true);
      }
    });
  }

  errorModel(text: string) {
    this._alertService.showSweetAlert({
      icon: 'error',
      title: 'Oppss.!',
      text: `${text}`,
    });
  }

  createForm() {
    this.form = this._formBuilder.group({
      name: ['',[
          Validators.required,
          Validators.pattern('[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$'),
          Validators.minLength(5)
        ]
      ],
      cell_phone: [ '',[
          Validators.required,
          Validators.pattern('[0-9]+$'),
          Validators.minLength(9),
          Validators.maxLength(20)
        ]
      ],
      cpf: ['',[
          Validators.required,
          Validators.pattern('[0-9]+$'),
          Validators.minLength(11),
          Validators.maxLength(11)
        ]
      ]
    });
  }

  closeModal(reaload: boolean) {
    this.closeSidebarClientForm.emit({ reaload: reaload });
  }
}
