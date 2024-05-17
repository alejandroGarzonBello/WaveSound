import { Component, SimpleChanges } from '@angular/core';
import { AuthService } from '../../service/Auth.service';
import { TokenService } from '../../service/Token.service';
import { Route, Router } from '@angular/router';
import { Cancion } from '../../models/Cancion';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private tokenService:TokenService,private router:Router) { }
  desactivada=true
  storageSub: Subscription | undefined;
  cancionData = localStorage.getItem('cancion');
  cancion: Cancion = this.cancionData ? JSON.parse(this.cancionData) : {};
  
  ngOnInit(): void {
    if(Object.keys(this.cancion).length === 0){
      this.cancion.titulo="Seleccione una cancion";
    }
  }

  receiveMessage($event: string) {
    console.log("prueba" + $event);
    this.cancion = JSON.parse($event);
  }


    musica(){
      if(this.cancion.titulo==="Seleccione una cancion"){
        alert("Seleccione una cancion")
        return
      }
      let musica = document.getElementById('notas')
      let disco = document.getElementById('disco')
      let group = document.getElementById('group')
      if(this.desactivada){
        musica?.classList.add('music')
        disco?.classList.add('giro')
        group?.classList.add('playing')
        this.desactivada=false
      }else{
        musica?.classList.remove('music')
        disco?.classList.remove('giro')
        group?.classList.remove('playing')
        this.desactivada=true
      }
    }

}
