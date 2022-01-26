import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateServiceComponent } from './create-service/create-service.component';
import { FindOneServiceComponent } from './find-one-service/find-one-service.component';
import { UpdateServiceComponent } from './update-service/update-service.component';
import { FindServicesComponent } from './find-all-services/find-services.component';
import { ServicesService } from './services.service';
import { ServiceRoutingModule } from './services.routing.module';
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
import { SharedModule } from '../shared/shared.module';
import {LOCALE_ID} from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
registerLocaleData(localePt);

@NgModule({
  declarations: [
    CreateServiceComponent,
    FindOneServiceComponent,
    UpdateServiceComponent,
    FindServicesComponent
  ],
  exports: [
    CreateServiceComponent,
    FindOneServiceComponent,
    UpdateServiceComponent,
    FindServicesComponent
  ],
  imports: [
    MatNativeDateModule,
    CommonModule,
    ServiceRoutingModule,
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
    MatDatepickerModule,
    ServicesService,
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR'
    }
  ]
})
export class ServicesModule { }
