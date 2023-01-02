import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import {Client, IRespGetClients, ReportClients} from '../models/client.model';
import {IQuery} from "../models/query.model";

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  baseUrl: String = environment.baseUrl;

  constructor(private http: HttpClient) {
   }

  findOne(clientId: number): Observable<Client>{
    return this.http.get<Client>(`${this.baseUrl}/clientes/${clientId}`);
  }

  find(query?: IQuery): Observable<IRespGetClients> {
    let params = new HttpParams()
    if (query?.page) params = params.set('page', String(query.page))
    if (query?.take) params = params.set('take', String(query.take))
    return this.http.get<IRespGetClients>(`${this.baseUrl}/clientes`, { params });
  }

  create(client: Client): Observable<Client>{
    return this.http.post<Client>(`${this.baseUrl}/clientes`, client);
  }

  update(clientId: number, client: Client): Observable<void>{
    return this.http.put<void>(`${this.baseUrl}/clientes/${clientId}`, client )
  }

  delete(clientId: number):Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/clientes/${clientId}`);
  }

  reportClients(): Observable<ReportClients> {
    return this.http.get<ReportClients>(`${this.baseUrl}/clientes/servicos/relatorios`);
  }
}
