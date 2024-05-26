import { Component, EventEmitter, Output } from '@angular/core';
import { Cancion } from '../../models/Cancion';
import { CancionService } from '../../service/Canciones.service';
import { Route, Router } from '@angular/router';
import { Usuario } from '../../models/Usuario';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  menuSelected: string = 'canciones';
  usuario: Usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
  public reload = false;
  public canciones: Promise<Cancion[]> | undefined =
    this.serviceCancion.getCancionesPorUsuarioId(this.usuario.id);
  public canciones10: Promise<Cancion[]> | undefined;
  public cancionArray?: Cancion[];
  @Output() cancionEvento = new EventEmitter<string>();
  @Output() cancionEventoAlPadre = new EventEmitter<string>();
  @Output() cancionEventoAlPadre2 = new EventEmitter<Cancion[]>();

  constructor(private serviceCancion: CancionService, private router: Router) {}

  ngOnInit(): void {
    this.canciones = this.serviceCancion.getCancionesPorUsuarioId(
      this.usuario.id
    );
    this.canciones10 = this.canciones?.then((canciones: Cancion[]) => {
      return canciones.slice(0, 10);
    });
  }

  /**
   * Recargar el componente padre
   */
  handleUpdate() {
    this.reload = true;
    this.reloadComponent();
  }

  /**
   * Cualquier otra logica de reinicio del componente
   */
  reloadComponent() {
    this.reload = false;
  }

  /**
   * Reproduce una cancion
   * @param cancion
   */
  reproducir(cancion: Cancion) {
    this.cancionEvento.emit(JSON.stringify(cancion));
  }

  /**
   * Cambia el menu a playlist
   */
  playlist() {
    this.menuSelected = 'playlist';
  }

  /**
   * Cambia el menu a canciones
   */
  setCanciones() {
    this.menuSelected = 'canciones';
  }

  /**
   * Cambia el menu a descargas
   */
  reciboCancionPlaylist($event: Cancion[]) {
    this.cancionArray = $event;
    this.cancionEventoAlPadre.emit(JSON.stringify($event));
  }

  /**
   * Cambia la lista de canciones
   */
  async recargar() {
    const cancionesRecargar =
      await this.serviceCancion.getCancionesPorUsuarioId(this.usuario.id);
    this.cancionArray = cancionesRecargar;
    this.cancionEventoAlPadre2.emit(cancionesRecargar);
  }
}
