/* eslint-disable sort-imports */
/* eslint-disable prettier/prettier */
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  IRespGetServices,
  ReportServices,
  ServiceModel,
} from '../models/service.model';
import { IQuery } from '../models/query.model';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  baseUrl: String = environment.baseUrl;

  constructor(private readonly _httpClient: HttpClient) {}

  findAll(query: IQuery): Observable<IRespGetServices> {
    let params = new HttpParams();
    if (query?.page) params = params.set('page', String(query.page));
    if (query?.take) params = params.set('take', String(query.take));
    if (query?.filter) params = params.set('filter', String(query.filter));
    return this._httpClient.get<IRespGetServices>(`${this.baseUrl}/servicos`, {
      params,
    });
  }

  reportService(): Observable<ReportServices> {
    return this._httpClient.get<ReportServices>(
      `${this.baseUrl}/servicos/todos/report`
    );
  }

  findOne(serviceId: number): Observable<ServiceModel> {
    return this._httpClient.get<ServiceModel>(
      `${this.baseUrl}/servicos/${serviceId}`
    );
  }

  create(service: ServiceModel): Observable<ServiceModel> {
    return this._httpClient.post<ServiceModel>(
      `${this.baseUrl}/servicos`,
      service
    );
  }

  update(serviceId: number, service: ServiceModel): Observable<ServiceModel> {
    return this._httpClient.put<ServiceModel>(
      `${this.baseUrl}/servicos/${serviceId}`,
      service
    );
  }

  delete(serviceId: number): Observable<void> {
    return this._httpClient.delete<void>(
      `${this.baseUrl}/servicos/${serviceId}`
    );
  }
}
