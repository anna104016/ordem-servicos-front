import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserModel } from '../models/user.model';
import { JwtHelperService } from '@auth0/angular-jwt'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: String = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  create(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.baseUrl}/user`, user)
  }

  finduser(): Observable<UserModel>{
    return this.http.get<UserModel>(`${this.baseUrl}/user/infos`);
  }

  updatePhoto(userId: number, body: { photo: string}): Observable<object> {
    return this.http.put(`${this.baseUrl}/user/update-photo/${userId}`, body);
  }
}
