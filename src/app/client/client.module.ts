import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FindClientsComponent } from './find-clients/find-clients.component';
import { CreateClientComponent } from './create-client/create-client.component';
import { UpdateClientComponent } from './update-client/update-client.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClientsService } from './clients.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { ClientRoutingModule } from './cliente.routing.module';
import { FineOneClientComponent } from './find-one-client/find-one-client.component';
import { SharedModule } from '../shared/shared.module';
import {MatDatepickerModule} from '@angular/material/datepicker';

@NgModule({
  declarations: [
    FindClientsComponent,
    CreateClientComponent,
    UpdateClientComponent,
    FineOneClientComponent
  ],
  exports: [
    FindClientsComponent,
    CreateClientComponent,
    UpdateClientComponent,
    FineOneClientComponent
  ],
  imports: [
    ClientRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    MatCardModule,
    MatSelectModule,
    MatPaginatorModule,
    SharedModule,
    MatDatepickerModule
  ],
  providers: [
    ClientsService
  ]
})
export class ClientModule { }
