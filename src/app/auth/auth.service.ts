import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, mergeAll, mergeMap} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import {UserModel} from '../models/user.model';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
  })
export class AuthService{

    baseUrl: String = environment.baseUrl;
    private userLog: BehaviorSubject<UserModel> =  new BehaviorSubject<UserModel>(new UserModel())

    constructor(
        private readonly _http: HttpClient,
        private readonly _router: Router,
    ){}

    loginByCredentials(user:{email:string, password:string}): Observable<UserModel>{
        const params = new HttpParams()
        .set('email', user.email)
        .set('password', user.password)
        const url = `${this.baseUrl}/auth/login`
        return this._http.post<UserModel>(url, params)
      }

      validateUser(){
        let newUser;
        return  this._http.post<UserModel>(`${this.baseUrl}/auth/validation`, {}).pipe(
          map(user => newUser = user),
          map(userGO => this.changeUser(newUser)),
          mergeMap(() => this.getUser()),
        )
      }

      getToken(){
        const token = localStorage.getItem('access_token')
        if(token){
            return JSON.parse(JSON.stringify(token))
        }
        return null
      }

      checkIfTheUserIsAuthenticated(): boolean {
        return true
      }

      logOut(){
        localStorage.clear()
        this._router.navigate([''])
      }

      public getUser(){
        return this.userLog.asObservable()
      }

      public changeUser(user:UserModel){
        this.userLog.next(user)
      }
}
