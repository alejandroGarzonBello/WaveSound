import { Component } from '@angular/core';
import { playlistService } from '../../service/Playlist.service';
import { Playlist } from '../../models/Playlist';
import { Route, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TokenService } from '../../service/Token.service';
import { AuthService } from '../../service/Auth.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.css',
})
export class PlaylistComponent {
  public playlist: Promise<Playlist[]> | undefined =
    this.servicePlaylist.getUserPlaylist();

  public playlist10: Promise<Playlist[]> | undefined;
  public addPlaylist: FormGroup;
  public newPlaylist: Playlist | undefined;
  public song: boolean = false;

  constructor(
    private servicePlaylist: playlistService,
    private router: Router,
    private formBuilder: FormBuilder,
    private service: AuthService,
    private tokenService: TokenService
  ) {
    this.addPlaylist = this.formBuilder.group({
      nombre: [''],
      portada: [''],
      descripcion: [''],
    });
  }

  async ngOnInit(): Promise<void> {
    this.playlist = this.servicePlaylist.getUserPlaylist();

    console.log('palylist: ' + this.playlist);
    this.playlist10 = this.playlist?.then((playlist: Playlist[]) => {
      return playlist.slice(0, 10);
    });

    const resolvedPlaylist10 = await this.playlist10;
    if (resolvedPlaylist10) {
      resolvedPlaylist10.forEach((element: Playlist) => {
        console.log(element);
      });
    }

  }

  onSubmit() {
    if (this.addPlaylist.valid) {
      this.newPlaylist = {
        id: 0,
        nombre: this.addPlaylist.value.nombre,
        portada: this.addPlaylist.value.portada,
        descripcion: this.addPlaylist.value.descripcion,
        usuario: JSON.parse(localStorage.getItem('usuario') || '{}'),
      };
      console.log(this.newPlaylist);
      
      if (this.newPlaylist) {
        this.servicePlaylist
          .addPlaylist(this.newPlaylist)
          this.ngOnInit(); 
          this.addPlaylist.reset();
      }
    }
  }

  deletePlaylist(id: number) {
    this.servicePlaylist.deletePlaylist(id).then((response: any) => {
      console.log('Playlist eliminada exitosamente', response);
      this.ngOnInit(); 
    });
  }

  selectPlaylist(id:number){
    this.song=false
  }
}
