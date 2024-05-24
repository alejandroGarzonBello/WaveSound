import { Component, EventEmitter, Output } from '@angular/core';
import { Cancion } from '../../models/Cancion';
import { CancionService } from '../../service/Canciones.service';
import { Route, Router } from '@angular/router';
import { Usuario } from '../../models/Usuario';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  menuSelected: string = 'canciones';
  usuario:Usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
  constructor(private serviceCancion:CancionService,private router:Router) { }

  public canciones: Promise<Cancion[]> | undefined = this.serviceCancion.getCancionesPorUsuarioId(this.usuario.id);

  public canciones10: Promise<Cancion[]> | undefined
  public cancionArray?: Cancion[];
  @Output() cancionEvento = new EventEmitter<string>()
  @Output() cancionEventoAlPadre = new EventEmitter<string>()
  @Output() cancionEventoAlPadre2 = new EventEmitter<Cancion[]>()
  reload = false;

  handleUpdate() {
    this.reload = true;
    // Recargar el componente padre
    this.reloadComponent();
  }

  reloadComponent() {
    this.reload = false;
    // Cualquier otra lógica de reinicio del componente
  }

  ngOnInit(): void {
    this.canciones = this.serviceCancion.getCancionesPorUsuarioId(this.usuario.id);
    this.canciones10 = this.canciones?.then((canciones: Cancion[]) => {
      return canciones.slice(0, 10);
    });
  }

  reproducir(cancion: Cancion){
    this.cancionEvento.emit(JSON.stringify(cancion));
  }

  playlist(){
    this.menuSelected = 'playlist';
  }

  setCanciones(){
    this.menuSelected = 'canciones';
  }

  reciboCancionPlaylist($event: Cancion[]){
    this.cancionArray = $event;
    this.cancionEventoAlPadre.emit(JSON.stringify($event));
  }

  async recargar(){
    const cancionesRecargar = await this.serviceCancion.getCancionesPorUsuarioId(this.usuario.id);
    this.cancionArray = cancionesRecargar;
    this.cancionEventoAlPadre2.emit(cancionesRecargar);
  }
}
