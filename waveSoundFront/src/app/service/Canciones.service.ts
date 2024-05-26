import { Injectable } from '@angular/core';
import { env } from '../envs/envs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cancion } from '../models/Cancion';

@Injectable({providedIn: 'root'})
export class CancionService {

    private baseurl = env.url;
    private baseUrl2 = env.url2;
    
    headers = new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('access_token')})

    constructor(private httpClient:HttpClient) { }

    //Devuelve todas las canciones
    getAllCanciones=async(): Promise<Cancion[]> => {
        return this.httpClient.get(`${this.baseurl}/canciones/listar`,{headers: this.headers}).toPromise() as Promise<Cancion[]>
    } 

    //Devuelve las canciones de un usuario
    getCancionesPorUsuarioId=async(id:number): Promise<Cancion[]> => {
        return this.httpClient.get(`${this.baseurl}/canciones/usuario/${id}`,{headers: this.headers}).toPromise() as Promise<Cancion[]>
    }

    //Devuelve las canciones que no estan en una playlist
    getPlaylistNoCanciones(id:number): Promise<Cancion[]> {
        return this.httpClient.get(`${this.baseurl}/canciones/noPlaylist/${id}`,{headers: this.headers}).toPromise() as Promise<Cancion[]>
    }

    //Devuelve las canciones por id
    getCancionById=async(id:number): Promise<Cancion> => {
        return this.httpClient.get(`${this.baseurl}/canciones/${id}`,{headers: this.headers}).toPromise() as Promise<Cancion>
    }

    //Crea una cancion
    saveCancion=(cancion:Cancion): any => {
        return this.httpClient.post(`${this.baseurl}/canciones`,cancion,{headers: this.headers, responseType: 'text'}).toPromise() as Promise<string>
      }

    //Actualiza una cancion
    uploadCancion=(formData: FormData, id: string) => {
        return this.httpClient.post(`${this.baseUrl2}/upload/${id}`, formData);
    }
    
}