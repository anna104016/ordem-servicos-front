import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NovoservicoComponent } from './novoservico/novoservico.component';
import { DetalhesServicosComponent } from './detalhes/detalhes.component';
import { EditarservicosComponent } from './editarservicos/editarservicos.component';
import { ListarservicosComponent } from './listarservicos/listarservicos.component';
import { ServicosService } from './servicos.service';
import { ServicoRoutingModule } from './servicos.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    NovoservicoComponent,
    DetalhesServicosComponent,
    EditarservicosComponent,
    ListarservicosComponent
  ],
  exports: [
    NovoservicoComponent,
    DetalhesServicosComponent,
    EditarservicosComponent,
    ListarservicosComponent
  ],
  imports: [
    CommonModule,
    ServicoRoutingModule,
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
    ServicosService
  ]
})
export class ServicosModule { }
