import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/templates/header/header.component';
import { AppRoutingModule } from './app-routing.module';

import {MatToolbarModule} from '@angular/material/toolbar';
import { FooterComponent } from './components/templates/footer/footer.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import { ListarComponent } from './components/pages/clientes/listar/listar.component';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { NovoComponent } from './components/pages/clientes/novo/novo.component';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { EditarComponent } from './components/pages/clientes/editar/editar.component';
import { DeletarComponent } from './components/pages/clientes/deletar/deletar.component';
import { ListarservicosComponent } from './components/pages/servicos/listarservicos/listarservicos.component';
import {MatCardModule} from '@angular/material/card';
import { DetalhesComponent } from './components/pages/servicos/detalhes/detalhes.component';
import { NovoservicoComponent } from './components/pages/servicos/novoservico/novoservico.component';
import {MatSelectModule} from '@angular/material/select';
import { EditarservicosComponent } from './components/pages/servicos/editarservicos/editarservicos.component';
import { HomeComponent } from './components/pages/home/home.component';
import { NotfoundComponent } from './components/pages/notfound/notfound.component';
import { EspacoComponent } from './components/pages/espaco/espaco.component';
import {MatPaginatorModule} from '@angular/material/paginator'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ListarComponent,
    NovoComponent,
    EditarComponent,
    DeletarComponent,
    ListarservicosComponent,
    DetalhesComponent,
    NovoservicoComponent,
    EditarservicosComponent,
    HomeComponent,
    NotfoundComponent,
    EspacoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatTableModule,
    HttpClientModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatSnackBarModule,
    MatCardModule,
    MatSelectModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
