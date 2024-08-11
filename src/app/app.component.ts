import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TabComponent } from './componenti/tab/tab.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './componenti/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FollowSantaLucia';
}
