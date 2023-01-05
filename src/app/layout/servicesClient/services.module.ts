import { CommonModule } from '@angular/common';
import { CreateServiceComponent } from './create-service/create-service.component';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { FindServicesComponent } from './find-all-services/find-services.component';
import { ServiceRoutingModule } from './services.routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { LOCALE_ID, NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { TokenInterceptor } from 'src/app/auth/token.interceptor';
import { ServiceGuard } from 'src/app/resolver/service.guard';
import { ServicesService } from 'src/app/services/services.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { TableModule } from 'src/app/components/table/table.module';
registerLocaleData(localePt);

@NgModule({
  declarations: [
    CreateServiceComponent,
    ServiceDetailsComponent,
    FindServicesComponent
  ],
  exports: [
    CreateServiceComponent,
    ServiceDetailsComponent,
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
    MatDatepickerModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatMenuModule,
    TableModule
  ],
  providers: [
    MatDatepickerModule,
    ServicesService,
    ServiceGuard,
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR'
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class ServicesModule {}
