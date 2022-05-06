import { CommonModule } from '@angular/common';
import { CreateServiceComponent } from './create-service/create-service.component';
import { FindOneServiceComponent } from './find-one-service/find-one-service.component';
import { FindServicesComponent } from './find-all-services/find-services.component';
import { ServicesService } from './services.service';
import { ServiceRoutingModule } from './services.routing.module';
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
import { SharedModule } from '../shared/shared.module';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { LOCALE_ID, NgModule } from '@angular/core';
import { TokenInterceptor } from '../auth/token.interceptor';
import { ServicesGuard } from '../resolver/services.guard';
registerLocaleData(localePt);

@NgModule({
  declarations: [
    CreateServiceComponent,
    FindOneServiceComponent,
    FindServicesComponent
  ],
  exports: [
    CreateServiceComponent,
    FindOneServiceComponent,
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
    ServicesGuard,
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR'
    },
    {
      provide: HTTP_INTERCEPTORS, //interceptor
      useClass: TokenInterceptor, //classe TokenInterceptor vai ser utilizada com interceptor da aplicação
      multi: true
    },
  ]
})
export class ServicesModule { }
