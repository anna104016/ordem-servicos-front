import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserModel } from './model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: String = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  create(user: UserModel): Observable<UserModel> {
    const url = `${this.baseUrl}/user`
    return this.http.post<UserModel>(url, user)
  }

  generateToken(email:string, password:string){
    const parametros = new HttpParams()
    .set('email', email)
    .set('password', password)
    const url = `${this.baseUrl}/auth/login`
    return this.http.post<any>(url, parametros)
  }

  getToken(){
    const token = localStorage.getItem('access_token')
    if(token){
      const tokenJSON = JSON.parse(JSON.stringify(token))
      return tokenJSON
    }
    return null //token não existe
  }
}
