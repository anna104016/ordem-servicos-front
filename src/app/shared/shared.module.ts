import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import { SharedRoutingModule } from './shared.routing.module';
import { LoginComponent } from './login/login.component';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { LoginFormComponent } from './login-form/login-form.component';
import { LoginTextComponent } from './login-text/login-text.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { CreateAccountFormComponent } from './create-account-form/create-account-form.component';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    LoginFormComponent,
    LoginTextComponent,
    CreateAccountComponent,
    CreateAccountFormComponent
  ],
  exports: [
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    LoginFormComponent,
    LoginTextComponent,
    CreateAccountComponent,
    CreateAccountFormComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    SharedRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    HttpClientModule,
    MatTableModule,
    MatInputModule,
    MatIconModule
  ]
})
export class SharedModule { }
