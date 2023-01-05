import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Status } from '../models/service.model';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  private baseURL: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  findAll(): Observable<Status[]> {
    return this.http.get<Status[]>(`${this.baseURL}/status`);
  }
}
