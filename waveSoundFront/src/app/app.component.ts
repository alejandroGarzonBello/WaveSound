import { Component } from '@angular/core';
import { Cancion } from './models/Cancion';
import { Subscription } from 'rxjs';
import { TokenService } from './service/Token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'waveSoundFront';
  constructor(private tokenService:TokenService,private router:Router) { }
  desactivada=true
  storageSub: Subscription | undefined;
  cancionData = localStorage.getItem('cancion');
  cancion: Cancion = this.cancionData ? JSON.parse(this.cancionData) : {};
  
  receiveMessage($event: string) {
    console.log("prueba" + $event);
    this.cancion = JSON.parse($event);
  }

}
