import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserModel } from '../models/user.model';
import { JwtHelperService } from '@auth0/angular-jwt'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: String = environment.baseUrl;
  jwtHelperService: JwtHelperService = new JwtHelperService()

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  create(user: UserModel): Observable<UserModel> {
    const url = `${this.baseUrl}/user`
    return this.http.post<UserModel>(url, user)
  }

  generateToken(email:string, password:string){
    const params = new HttpParams()
    .set('email', email)
    .set('password', password)
    const url = `${this.baseUrl}/auth/login`
    return this.http.post<any>(url, params)
  }

  getToken(){
    const token = localStorage.getItem('access_token')
    if(token){
      const tokenJSON = JSON.parse(JSON.stringify(token))
      return tokenJSON
    }
    return null //token não existe
  }

  checkIfTheUserIsAuthenticated(): boolean {
    const token = this.getToken() //obter o token
    if(token){
      const expiredToken = this.jwtHelperService.isTokenExpired(token) //verificar se o token está expirado
      return !expiredToken
    }
    return false //return false se não tiver o token no local storage
  }

  logOut(){
    localStorage.removeItem('access_token')
    this.router.navigate([''])
  }

  finduser(): Observable<UserModel>{
    const url = `${this.baseUrl}/user/infos`;
    return this.http.get<UserModel>(url);
  }
}
