import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const tokenString = localStorage.getItem('access_token')
    if(tokenString){
      const tokenJSON = JSON.parse(JSON.stringify(tokenString))

      request = request.clone({ //adicinar o token nos headers das requisições
        setHeaders: {
          Authorization: 'Bearer ' + tokenJSON
        }
      })
    }

    return next.handle(request);
  }
}
