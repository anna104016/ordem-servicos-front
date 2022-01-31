import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client, ReportClients } from './client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  baseUrl: String = environment.baseUrl;

  constructor(private http: HttpClient, private snack: MatSnackBar) { }

  findOne(id: string): Observable<Client>{
    const url = `${this.baseUrl}/clientes/${id}`
    return this.http.get<Client>(url);
  }

  find(): Observable<Client[]> {
    const url = `${this.baseUrl}/clientes`;
    return this.http.get<Client[]>(url);
  }

  // OBTENDO TOKEN NO LOCAL STORAGE E LANÇANDO NA REQUISIÇÃO
  // find(): Observable<Client[]> {
  //   const token = localStorage.getItem('access_token')
  //   const headers = {
  //     'Authorization': 'Bearer ' + token
  //   }
  //   const url = `${this.baseUrl}/clientes`;
  //   return this.http.get<Client[]>(url, {headers});
  // }

  create(cliente: Client): Observable<Client>{
    const url = `${this.baseUrl}/clientes`;
    return this.http.post<Client>(url,cliente);
  }

  update(client: Client): Observable<void>{
    const url = `${this.baseUrl}/clientes/${client.client_id}`;
    return this.http.put<void>(url,client)
  }

  delete(id: string):Observable<void>{
    const url = `${this.baseUrl}/clientes/${id}`;
    return this.http.delete<void>(url);
  }

  reportClients(): Observable<ReportClients> {
    const url = `${this.baseUrl}/clientes/servicos/relatorios`;
    return this.http.get<ReportClients>(url);
  }

  findByCpf(cpf:string): Observable<boolean> {
    const url = `${this.baseUrl}/clientes/buscar/${cpf}`;
    return this.http.get<boolean>(url);
  }

  message(string: String): void{
    this.snack.open(`${string}`, 'OK', 
    {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    });
  }
}
