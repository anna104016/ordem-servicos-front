import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import { SharedRoutingModule } from './shared.routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SelectUserPhotoComponent } from './select-user-photo/select-user-photo.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import {HeaderComponent} from "./header/header.component";
import {PageHeaderComponent} from "./page-header/page-header.component";
import {MenuButtomComponent} from "./menu-buttom/menu-buttom.component";
import {MatListModule} from "@angular/material/list";
import { HomeComponent } from '../pages/home/home.component';
import { TableComponent } from '../components/table/table.component';
import { LoginFormComponent } from '../pages/login-form/login-form.component';
import {MatTooltipModule} from "@angular/material/tooltip";

@NgModule({
  declarations: [
    HomeComponent,
    FooterComponent,
    LoginFormComponent,
    SelectUserPhotoComponent,
    HeaderComponent,
    PageHeaderComponent,
    MenuButtomComponent,
    TableComponent,
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
        MatIconModule,
        MatMenuModule,
        MatProgressSpinnerModule,
        MatDividerModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatListModule,
        MatIconModule,
        MatSidenavModule,
        MatTooltipModule
    ],
  exports: [
    SelectUserPhotoComponent,
    HeaderComponent,PageHeaderComponent,TableComponent,
  ]
})
export class SharedModule { }
