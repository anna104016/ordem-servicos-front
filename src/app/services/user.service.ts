import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: String = environment.baseUrl;

  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _authService: AuthService
  ) {}

  create(user: UserModel): Observable<UserModel> {
    return this._httpClient.post<UserModel>(`${this.baseUrl}/user`, user);
  }

  finduser(): Observable<UserModel> {
    return this._httpClient.get<UserModel>(`${this.baseUrl}/user/infos`);
  }

  updatePhoto(userId: number, body: { photo: string }) {
    let newUser;
    return this._httpClient
      .put<UserModel>(`${this.baseUrl}/user/update-photo/${userId}`, body)
      .pipe(
        map((user) => (newUser = user)),
        map(() => this._authService.changeUser(newUser)),
        mergeMap(() => this._authService.getUser())
      );
  }
}
