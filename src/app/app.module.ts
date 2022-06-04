import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ClientModule } from './client/client.module';
import { SharedModule } from './shared/shared.module';
import { NavbarModule } from './navbar/navbar.module';
import { ServicesModule } from './services/services.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './auth/token.interceptor';
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
    NavbarModule,
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
