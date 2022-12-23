import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './auth/token.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import {MatButtonModule} from "@angular/material/button";
import { ClientModule } from './layout/client/client.module';
import { ServicesModule } from './layout/servicesClient/services.module';

@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent,
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        ClientModule,
        ServicesModule,
        SharedModule,
        NgxSpinnerModule,
        MatButtonModule,
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, //interceptor
      useClass: TokenInterceptor, //classe TokenInterceptor vai ser utilizada com interceptor da aplicação
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
