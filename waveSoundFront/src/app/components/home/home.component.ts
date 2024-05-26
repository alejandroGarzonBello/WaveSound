import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { AuthService } from '../../service/Auth.service';
import { TokenService } from '../../service/Token.service';
import { Route, Router } from '@angular/router';
import { Cancion } from '../../models/Cancion';
import { Subscription } from 'rxjs';
import { Usuario } from '../../models/Usuario';
import { CancionService } from '../../service/Canciones.service';
declare const Swal: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  public playPause: String = 'play_arrow';
  public desactivada = true;
  public mostrarMenu = true;
  public storageSub: Subscription | undefined;
  public cancionData = localStorage.getItem('cancion');
  public cancion: Cancion = this.cancionData
    ? JSON.parse(this.cancionData)
    : {};
  public usuario: Usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
  public cancionSrc = ``;
  public canciones: Cancion[] = [];
  public cancionActual: number = 0;
  @ViewChild('audioElement') audioElement: ElementRef | undefined;

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private servicio: CancionService
  ) {}

  async ngOnInit(): Promise<void> {
    this.canciones = await this.servicio.getCancionesPorUsuarioId(
      this.usuario.id
    );
  }

  /**
   * Metodo1 que recibe un evento de la cancion seleccionada
   * @param $event
   */
  receiveMessage($event: string) {
    console.log('prueba' + $event);
    this.cancion = JSON.parse($event);
    this.cancionActual = this.canciones.findIndex(
      (c) => c.id === this.cancion.id
    );
    this.setAudioSource(
      `http://localhost:3000/subidas/${
        this.usuario.id
      }/${this.cancion.titulo.replace(/\s/g, '%20')}.m4a`
    );
    if (this.audioElement) {
      //this.audioElement.nativeElement.src = this.cancionSrc;
    }
  }

  /**
   * Metodo2 que recibe un evento de la cancion seleccionada
   * @param $event
   */
  recieveMessage2($event: string) {
    this.canciones = JSON.parse($event);
  }

  /**
   * Metodo3 que recibe un evento de la cancion seleccionada
   * @param $event
   */
  async recieveMessage3($event: Cancion[]) {
    this.canciones = [...$event];
  }

  /**
   * Metodo para la animacion del reproductor
   */
  musica(s?: string) {
    if (!this.cancion.titulo) {
      this.noCancion();
      return;
    }
    let musica = document.getElementById('notas');
    let disco = document.getElementById('disco');
    let group = document.getElementById('group');
    if (s === 'prueba') {
      if (this.audioElement) {
        this.audioElement.nativeElement.play();
      }
      musica?.classList.add('music');
      disco?.classList.add('giro');
      group?.classList.add('playing');
      this.desactivada = false;
      return;
    }
    if (this.desactivada) {
      if (this.audioElement && this.audioElement.nativeElement) {
        this.audioElement.nativeElement.play();
      }
      musica?.classList.add('music');
      disco?.classList.add('giro');
      group?.classList.add('playing');
      this.desactivada = false;
    } else {
      if (this.audioElement) {
        this.audioElement.nativeElement.pause();
      }
      musica?.classList.remove('music');
      disco?.classList.remove('giro');
      group?.classList.remove('playing');
      this.desactivada = true;
    }
    if (this.desactivada) {
      this.playPause = 'play_arrow';
    } else this.playPause = 'pause';
  }

  /**
   * Metodo para pasar a la siguiente cancion
   */
  nextAudio() {
    if (!this.cancion.titulo) {
      this.noCancion();
      return;
    }
    if (this.cancionActual < this.canciones.length - 1) {
      this.cancionActual++;
      const cancionSiguiente = this.canciones[this.cancionActual];
      this.setAudioSource(
        `http://localhost:3000/subidas/${
          this.usuario.id
        }/${cancionSiguiente.titulo.replace(/\s/g, '%20')}.m4a`
      );
      this.cancion = cancionSiguiente;
      this.playPause = 'pause';
      this.musica('prueba');
    } else {
      Swal.fire({
        title: 'Ya estás en la última canción',
        icon: 'info',
      });
    }
  }

  /**
   * Metodo para pasar a la anterior cancion
   */
  previousAudio() {
    if (!this.cancion.titulo) {
      this.noCancion();
      return;
    }
    if (this.cancionActual > 0) {
      this.cancionActual--;
      const cancionAnterior = this.canciones[this.cancionActual];
      this.setAudioSource(
        `http://localhost:3000/subidas/${
          this.usuario.id
        }/${cancionAnterior.titulo.replace(/\s/g, '%20')}.m4a`
      );
      this.cancion = cancionAnterior;
      this.playPause = 'pause';
      this.musica('prueba');
    } else {
      Swal.fire({
        title: 'Ya estás en la primera canción',
        icon: 'info',
      });
    }
  }

  /**
   * Metodo para cambiar la cancion
   */
  setAudioSource(src: string) {
    if (this.audioElement) {
      this.audioElement.nativeElement.src = src;
    }
  }

  /**
   * Metodo para mostrar un mensaje de error
   */
  noCancion() {
    Swal.fire({
      title: 'No hay canciones seleccionadas',
      text: 'Seleccione una cancion',
      icon: 'warning',
    });
  }

  /**
   * Metodo para mostrar u ocultar el menu lateral
   */
  esconderMenu() {
    if (this.mostrarMenu) {
      this.mostrarMenu = false;
    } else {
      this.mostrarMenu = true;
    }
  }
}
