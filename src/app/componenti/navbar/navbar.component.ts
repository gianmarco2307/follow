import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
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
