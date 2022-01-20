import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarClienteComponent } from './listar/listar.component';
import { NovoClienteComponent } from './novo/novo.component';
import { EditarClienteComponent } from './editar/editar.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClientesService } from './clientes.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { ClienteRoutingModule } from './cliente.routing.module';
import { ClienteIdComponent } from './cliente-id/cliente-id.component';

@NgModule({
  declarations: [
    ListarClienteComponent,
    NovoClienteComponent,
    EditarClienteComponent,
    ClienteIdComponent
  ],
  exports: [
    ListarClienteComponent,
    NovoClienteComponent,
    EditarClienteComponent,
    ClienteIdComponent
  ],
  imports: [
    ClienteRoutingModule,
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
    MatPaginatorModule
  ],
  providers: [
    ClientesService
  ]
})
export class ClienteModule { }
