import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../servizi/authentication.service';

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
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] | undefined;

  constructor(private router: Router, private authService: AuthenticationService) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Segui Santa Lucia',
        icon: 'pi pi-map-marker',
        url: '/home',
      },
      {
        label: 'Condividi',
        icon: 'pi pi-share-alt',
      },
    ];
  }

  navigate(url?: string) {
    this.router.navigate([url]);
  }

  navigateToHome() {
    window.location.href = '/follow';
  }
  
  share() {
    if (navigator.share) {
      navigator
        .share({
          title: 'Segui Santa Lucia',
          text: 'Segui Santa Lucia',
          url: 'https://gianmarco2307.github.io/follow/home',
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

  isLogged(): boolean {
    return this.authService.isLogged();
  }

  logout() {
    this.authService.logout();
    window.open('/follow', '_self');
  }
}
