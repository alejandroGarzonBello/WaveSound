import { Injectable } from '@angular/core';
import { env } from '../envs/envs';
import { HttpClient } from '@angular/common/http';
import { AuthCredentials } from '../models/AuthCredentials';
import { UserRegister } from '../models/UserRegister';
import { Usuario } from '../models/Usuario';
import { TokenService } from './Token.service';

@Injectable({providedIn: 'root'})
export class AuthService {
    public url = env.url
    constructor(private httpClient:HttpClient,private tokenService:TokenService) { 
     }

     
    login(credentials:AuthCredentials){
        return this.httpClient.post(`${this.url}/login`,credentials)
    }

    register(user:UserRegister){
        return this.httpClient.post(`${this.url}/register`,user)
    }

}