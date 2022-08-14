import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TokenInterceptor } from '../auth/token.interceptor';
import { UserGuard } from '../resolver/user.guard';
import { SharedModule } from '../shared/shared.module';
import { UserIdComponent } from './user-id/user-id.component';
import { UserRoutingModule } from './user.routing.module';
import { UserService } from '../services/user.service';

@NgModule({
  declarations: [
    UserIdComponent,
  ],
  exports: [
    UserIdComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    SharedModule,
  ],
  providers: [
    UserService,
    UserGuard,
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
