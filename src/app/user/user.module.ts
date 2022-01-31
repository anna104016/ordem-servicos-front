import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { TokenInterceptor } from '../auth/token.interceptor';
import { SharedModule } from '../shared/shared.module';
import { UserIdComponent } from './user-id/user-id.component';
import { UserRoutingModule } from './user.routing.module';
import { UserService } from './user.service';

@NgModule({
  declarations: [
    UserIdComponent
  ],
  exports: [
    UserIdComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
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
  ],
  providers: [
    UserService,
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
export class UserModule { }
