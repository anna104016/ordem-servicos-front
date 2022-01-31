import { CommonModule } from '@angular/common';
import { StatusService } from './status.service'
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    StatusService
  ] 
})
export class StatusModule { }
