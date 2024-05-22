import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { env } from '../envs/envs';
import { Playlist } from '../models/Playlist';


@Injectable({
    providedIn: 'root'
})
export class playlistService {

    private baseurl = env.url;
    headers = new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('access_token')})
    userId: string | null = localStorage.getItem('id');
    

    constructor(private httpClient: HttpClient) { 
        console.log("id: " + this.userId);

    }

    getPlaylist = async (): Promise<any> => {
        return this.httpClient.get(`${this.baseurl}/playlists`, { headers: this.headers }).toPromise() as Promise<Playlist[]>;
    }

    getUserPlaylist = async (): Promise<any> => {
        return this.httpClient.get(`${this.baseurl}/playlists/usuario/${this.userId}`, { headers: this.headers }).toPromise() as Promise<Playlist[]>;
    }

    addPlaylist = (playlist: any): Promise<string> => {
        delete playlist.id;
        return this.httpClient.post(`${this.baseurl}/playlists`, playlist, { headers: this.headers }).toPromise() as Promise<string>;
    }

    deletePlaylist = (id: number): any => {
        return this.httpClient.delete(`${this.baseurl}/playlists/${id}`, { headers: this.headers }).toPromise();
    }


}