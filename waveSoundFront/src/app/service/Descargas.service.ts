import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class DescargasService {

    constructor(private http: HttpClient) { }

    listVideos(userId:string) {
        return this.http.get<string[]>('http://localhost:3000/listVideos?userId='+userId);
    }

    listAudios(userId:string) {
        return this.http.get<string[]>('http://localhost:3000/listAudios?userId='+userId);
    }

    downloadVideo(videoName: string,userId:string) {
        window.location.href = `http://localhost:3000/downloadVideo?videoName=${videoName}&userId=${userId}`;
    }

    downloadAudio(audioName: string,userId:string) {
        window.location.href = `http://localhost:3000/downloadAudio?audioName=${audioName}&userId=${userId}`;
    }
}