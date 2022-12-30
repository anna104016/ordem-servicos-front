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
export class AuthService{

    baseUrl: String = environment.baseUrl;
    jwtHelperService: JwtHelperService = new JwtHelperService()
  
    private userLog: BehaviorSubject<UserModel> =  new BehaviorSubject<UserModel>(new UserModel())

    constructor(
        private http: HttpClient,
        private router: Router
    ){}

    loginByCredentials(user:{email:string, password:string}): Observable<UserModel>{
        const params = new HttpParams()
        .set('email', user.email)
        .set('password', user.password)
        const url = `${this.baseUrl}/auth/login`
        return this.http.post<UserModel>(url, params)
      }

      validateUser(){
        return this.http.post(`${this.baseUrl}/auth/validation`)
      }
    
      getToken(){
        const token = localStorage.getItem('access_token')
        if(token){
          const tokenJSON = JSON.parse(JSON.stringify(token))
          return tokenJSON
        }
        return null
      }
    
      checkIfTheUserIsAuthenticated(): boolean {
        const token = this.getToken()
        if(token){
          const expiredToken = this.jwtHelperService.isTokenExpired(token) 
          return !expiredToken
        }
        return false
      }
    
      logOut(){
        localStorage.clear()
        this.router.navigate([''])
      }

      public getUser(){
        return this.userLog.asObservable()
      }
    
      public changeUser(user:UserModel){
        this.userLog.next(user)
      }
}