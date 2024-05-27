import { Injectable } from '@angular/core';
import { Organizacion } from '../models/Organizacion';
import { env } from '../envs/envs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class OrganizacionService {
    private baseurl = env.url;
    headers = new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('access_token')})

    constructor(private httpClient: HttpClient) { }
    
    //Inserta una organizacion con los id de la cancion y la playlist
    saveOrganizacion=(idCancion?:number, idPlaylist?:number): any => {
        return this.httpClient.post(`${this.baseurl}/organizaciones/${idCancion}/${idPlaylist}`,{headers: this.headers, responseType: 'text'}).toPromise() as Promise<string>
      }
}