import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatToolbarModule, MatMenuModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  share() {
    if (navigator.share) {
      navigator
        .share({
          title: 'Segui Santa Lucia',
          text: 'Descrizione della piattaforma',
          url: 'https://www.tuapiattaforma.com',
        })
        .then(() => {
          console.log('Condivisione avvenuta con successo');
        })
        .catch((error) => {
          console.error('Errore nella condivisione', error);
        });
    } else {
      console.log('API Web Share non supportata nel browser');
    }
  }
}
