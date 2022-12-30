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
  jwtHelperService: JwtHelperService = new JwtHelperService()

  private userLog: BehaviorSubject<UserModel> =  new BehaviorSubject<UserModel>(new UserModel())

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  create(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.baseUrl}/user`, user)
  }

  generateToken(user:{email:string, password:string}): Observable<UserModel>{
    const params = new HttpParams()
    .set('email', user.email)
    .set('password', user.password)
    const url = `${this.baseUrl}/auth/login`
    return this.http.post<UserModel>(url, params)
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
    localStorage.clear()
    this.router.navigate([''])
  }

  finduser(): Observable<UserModel>{
    return this.http.get<UserModel>(`${this.baseUrl}/user/infos`);
  }

  updatePhoto(userId: number, body: { photo: string}): Observable<object> {
    return this.http.put(`${this.baseUrl}/user/update-photo/${userId}`, body);
  }


  public getUser(){
    return this.userLog.asObservable()
  }

  public changeUser(user:UserModel){
    this.userLog.next(user)
  }
}
