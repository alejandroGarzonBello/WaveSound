import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../service/Token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
constructor(private tokenService:TokenService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.tokenService.isAuthenticated()){
      const toke = this.tokenService.getToken()
      req = req.clone({
        setHeaders:{
          Authorization: `Bearer ${toke}`
        }
      })
    }
    return next.handle(req);
  }
}