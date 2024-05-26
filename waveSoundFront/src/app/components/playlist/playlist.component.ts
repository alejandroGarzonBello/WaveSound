import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { playlistService } from '../../service/Playlist.service';
import { Playlist } from '../../models/Playlist';
import { Route, Router } from '@angular/router';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { TokenService } from '../../service/Token.service';
import { AuthService } from '../../service/Auth.service';
import { Organizacion } from '../../models/Organizacion';
import { Cancion } from '../../models/Cancion';
import { CancionService } from '../../service/Canciones.service';
import { OrganizacionService } from '../../service/Organizacion.service';

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
  public playlistAddSongForm: FormGroup;
  public newPlaylist: Playlist | undefined;
  public playlistAddSong?: Playlist;
  cancionEvento?: Cancion;
  public playlistSongs?: Cancion[];
  @Output() playListCancionEvento = new EventEmitter<Cancion[]>();
  @ViewChild('closeModal') closeModal:
    | ElementRef<HTMLButtonElement>
    | undefined;
  @ViewChild('closeModalAddSong') closeModalAddSong:
    | ElementRef<HTMLButtonElement>
    | undefined;

  constructor(
    private servicePlaylist: playlistService,
    private serviceOrganizacion: OrganizacionService,
    private formBuilder: FormBuilder,
    private serviceCancion: CancionService,
    private router: Router,
    private service: AuthService,
    private tokenService: TokenService
  ) {
    this.addPlaylist = this.formBuilder.group({
      nombre: [''],
      portada: [''],
      descripcion: [''],
    });
    this.playlistAddSongForm = this.formBuilder.group({
      idCancion: [''],
    });
  }

  async ngOnInit(): Promise<void> {
    this.servicePlaylist.updateUserId();
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

  /**
   * Metodo que se ejecuta al enviar el formulario de subida de playlist
   */
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
          .then(() => {
            this.ngOnInit(); // Actualizar la lista de playlists después de agregar una nueva
            this.addPlaylist.reset(); // Resetear el formulario
          })
          .catch((error: any) => {
            console.error('Error al agregar la playlist:', error);
          });
      }

      this.closeModal?.nativeElement.click();
    }
  }

  /**
   * Metodo para eliminar una playlist
   * @param id
   */
  deletePlaylist(id: number) {
    this.servicePlaylist.deletePlaylist(id).then((response: any) => {
      console.log('Playlist eliminada exitosamente', response);
      this.ngOnInit();
    });
  }

  /**
   * Metodo para seleccionar una playlist
   * @param id
   */
  addPlalistSong(playList: Playlist) {
    this.playlistAddSong = playList;
  }

  /**
   * Metodo para agregar una cancion selecionada a una playlist seleccionada
   * @param id
   */
  onSubmitAddSong() {
    this.serviceOrganizacion
      .saveOrganizacion(this.cancionEvento?.id, this.playlistAddSong?.id)
      .then((response: any) => {
        console.log('Organización guardada:', response);
      })
      .catch((error: any) => {
        console.error('Error al guardar organización:', error);
      });
    this.closeModalAddSong?.nativeElement.click();
  }

  /**
   * Metodo que se ejecuta al recibir una respuesta del servidor
   * @param response
   */
  receiveMessage($event: string) {
    console.log('prueba' + $event);
    this.cancionEvento = JSON.parse($event);
  }

  /**
   * Metodo que recarga las canciones de una playlist a canciones
   * @param response
   */
  cargarCanciones(id: number) {
    this.servicePlaylist.getPlaylistSongs(id).then((response: any) => {
      this.playlistSongs = response;
    });
    this.playListCancionEvento.emit(this.playlistSongs);
  }
}
