import { SidebarModule } from './../sidebar/sidebar.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FindClientsComponent } from './find-clients/find-clients.component';
import { ClientFormComponent  } from './create-form/client-form.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { ClientRoutingModule } from './cliente.routing.module';
import { ClientDetailsComponent } from './client-details/client-details.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatDialogModule} from "@angular/material/dialog";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatMenuModule} from "@angular/material/menu";
import { TokenInterceptor } from 'src/app/auth/token.interceptor';
import { OneClienteGuard } from 'src/app/resolver/client.guard';
import { ClientesGuard } from 'src/app/resolver/clientes.guard';
import { ClientsService } from 'src/app/services/clients.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { TableModule } from 'src/app/components/table/table.module';

@NgModule({
  declarations: [
    FindClientsComponent,
      ClientDetailsComponent,
      ClientFormComponent
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
        MatDatepickerModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatTooltipModule,
        MatMenuModule,
        SidebarModule,
        TableModule
    ],
    exports: [ClientDetailsComponent],
  providers: [
    ClientsService,
    ClientesGuard,
    OneClienteGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
  ]
})
export class ClientModule { }
