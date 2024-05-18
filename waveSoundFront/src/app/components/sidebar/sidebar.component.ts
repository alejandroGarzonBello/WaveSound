import { Component, EventEmitter, Output } from '@angular/core';
import { Cancion } from '../../models/Cancion';
import { CancionService } from '../../service/Canciones.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  menuSelected: string = 'canciones';
  constructor(private serviceCancion:CancionService,private router:Router) { }

  public canciones: Promise<Cancion[]> | undefined = this.serviceCancion.getAllCanciones();

  public canciones10: Promise<Cancion[]> | undefined
  @Output() cancionEvento = new EventEmitter<string>()

  ngOnInit(): void {
    this.canciones = this.serviceCancion.getAllCanciones();
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
}
