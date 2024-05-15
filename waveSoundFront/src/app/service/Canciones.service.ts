import { Injectable } from '@angular/core';
import { env } from '../envs/envs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cancion } from '../models/Cancion';

@Injectable({providedIn: 'root'})
export class CancionService {

    private baseurl = env.url;
    
    headers = new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('access_token')})

    constructor(private httClient:HttpClient) { }

    getAllCanciones=async(): Promise<Cancion[]> => {
        return this.httClient.get(`${this.baseurl}/canciones/listar`,{headers: this.headers}).toPromise() as Promise<Cancion[]>
    } 

    getCancionById=async(id:number): Promise<Cancion> => {
        return this.httClient.get(`${this.baseurl}/canciones/${id}`,{headers: this.headers}).toPromise() as Promise<Cancion>
    }

    saveCancion=(cancion:Cancion): any => {
        return this.httClient.post(`${this.baseurl}/canciones`,cancion,{headers: this.headers}).toPromise() as Promise<Cancion>
    }

    uploadCancion(file: File, userId: string) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('userId', userId);
        return this.httClient.post(this.baseurl, formData, {headers: this.headers});
      }
    
}