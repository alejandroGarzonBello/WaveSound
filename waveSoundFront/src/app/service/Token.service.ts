import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class TokenService {
    constructor() { }
    handleToken(token:string){
        localStorage.setItem('access_token',token)
    }

    getToken(){
        return localStorage.getItem('access_token')
    }

    revokeToken(){
        localStorage.removeItem('access_token')
    }

    isAuthenticated():boolean{
        return this.getToken() != null
    }
}