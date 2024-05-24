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
  isLoggedOut = false;

  handleLogout() {
    this.isLoggedOut = true;
    // Recargar el componente padre
    this.reloadComponent();
  }

  reloadComponent() {
    this.isLoggedOut = false;
    // Cualquier otra lógica de reinicio del componente
  }
}
