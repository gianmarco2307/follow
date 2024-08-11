import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MenubarModule,
    BadgeModule,
    AvatarModule,
    InputTextModule,
    RippleModule,
    CommonModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] | undefined;

  constructor(private router: Router) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Segui Santa Lucia',
        icon: 'pi pi-map-marker',
        url: '/home',
      },
      {
        label: 'Contatti',
        icon: 'pi pi-address-book',
        url: '/contatti',
      },
      {
        label: 'Codividi',
        icon: 'pi pi-share-alt',
      },
    ];
  }

  navigate(url?: string) {
    this.router.navigate([url]);
  }
  
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
