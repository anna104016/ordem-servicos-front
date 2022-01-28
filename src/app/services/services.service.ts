import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReportServices, ServiceModel } from './service.model';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  baseUrl: String = environment.baseUrl;

  constructor(private http: HttpClient, private snack: MatSnackBar) { }


  findAll(): Observable<ServiceModel[]>{
    const url = `${this.baseUrl}/servicos`;
    return this.http.get<ServiceModel[]>(url);
  }

  reportService(): Observable<ReportServices> {
    const url = `${this.baseUrl}/servicos/todos/report`;
    return this.http.get<ReportServices>(url);
  }

  findOne(id: string): Observable<ServiceModel>{
    const url = `${this.baseUrl}/servicos/${id}`;
    return this.http.get<ServiceModel>(url);
  }

  create(novoservico: ServiceModel): Observable<ServiceModel>{
    const url = `${this.baseUrl}/servicos`;
    return this.http.post<ServiceModel>(url, novoservico);
  }

  update(service: ServiceModel): Observable<ServiceModel>{
    const url = `${this.baseUrl}/servicos/${service.service_id}`;
    return this.http.put<ServiceModel>(url, service);
  }

  delete(id: string): Observable<void>{
    const url = `${this.baseUrl}/servicos/${id}`;
    return this.http.delete<void>(url);
  }

  message(string: String): void{
    this.snack.open(`${string}`, 'OK', 
    {
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      duration: 3000
    });
  }
}
