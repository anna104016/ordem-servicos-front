import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {Client, IRespGetClients, ReportClients} from '../models/client.model';
import {IQuery} from "../models/query.model";

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  baseUrl: String = environment.baseUrl;

  constructor(private http: HttpClient) { }

  findOne(id: number): Observable<Client>{
    return this.http.get<Client>(`${this.baseUrl}/clientes/${id}`);
  }

  find(query?: IQuery): Observable<IRespGetClients> {
    let params = new HttpParams()
    if (query?.page) params = params.set('page', String(query.page))
    if (query?.take) params = params.set('take', String(query.take))
    return this.http.get<IRespGetClients>(`${this.baseUrl}/clientes`, {params});
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
    return this.http.post<Client>(`${this.baseUrl}/clientes`,cliente);
  }

  update(id: number, client: Client): Observable<void>{
    return this.http.put<void>(`${this.baseUrl}/clientes/${id}`,client)
  }

  delete(id: number):Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/clientes/${id}`);
  }

  reportClients(): Observable<ReportClients> {
    return this.http.get<ReportClients>(`${this.baseUrl}/clientes/servicos/relatorios`);
  }
}
