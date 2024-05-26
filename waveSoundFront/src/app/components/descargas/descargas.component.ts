import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DescargasService } from '../../service/Descargas.service';
import { Usuario } from '../../models/Usuario';

@Component({
  selector: 'app-descargas',
  templateUrl: './descargas.component.html',
  styleUrl: './descargas.component.css',
})
export class DescargasComponent {
  public form: FormGroup;
  videos: string[] = [];
  audios: string[] = [];
  usuario: Usuario = JSON.parse(localStorage.getItem('usuario') || '{}');

  constructor(
    private downloadService: DescargasService,
    private http: HttpClient,
    private builder: FormBuilder,
    private router: Router,
    private activaetedRoute: ActivatedRoute
  ) {
    this.form = this.builder.group({
      nombre: [''],
      url: [''],
    });
  }

  ngOnInit(): void {
    this.downloadService
      .listVideos(this.usuario.id.toString())
      .subscribe((videos) => (this.videos = videos));
    this.downloadService
      .listAudios(this.usuario.id.toString())
      .subscribe((audios) => (this.audios = audios));
  }

  
  /**
   * Descarga un video de youtube y lo convierte a video
   */
  onSubmit() {
    const videoName = this.form.get('nombre')?.value;
    const videoUrl = this.form.get('url')?.value;

    // Envia la peticion al servidor para descargar el video
    this.http
      .post(
        'http://localhost:3000/downloadVideo',
        { url: videoUrl, videoName: videoName, userId: this.usuario.id },
        { responseType: 'text' }
      )
      .subscribe((response) => {
        console.log('Video downloaded');
      });
    setTimeout(() => {
      this.downloadService
        .listVideos(this.usuario.id.toString())
        .subscribe((videos) => (this.videos = videos));
    }, 3000);
  }

  /**
   * Descarga un audio de youtube y lo convierte a audio
   */
  onSubmit2() {
    const audioName = this.form.get('nombre')?.value;
    const videoUrl = this.form.get('url')?.value;

    this.http
      .post(
        'http://localhost:3000/downloadAudio',
        { url: videoUrl, audioName: audioName, userId: this.usuario.id },
        { responseType: 'text' }
      )
      .subscribe((response) => {
        console.log('Audio downloaded');
      });
    setTimeout(() => {
      this.downloadService
        .listAudios(this.usuario.id.toString())
        .subscribe((audios) => (this.audios = audios));
    }, 3000);
  }

  /**
   * Descarga un video
   * @param videoName 
   * @param userId 
   */
  downloadVideo(videoName: string, userId: string) {
    this.downloadService.downloadVideo(videoName, userId);
  }

  /**
   * Descarga un audio
   * @param audioName 
   * @param userId 
   */
  downloadAudio(audioName: string, userId: string) {
    this.downloadService.downloadAudio(audioName, userId);
  }
}
