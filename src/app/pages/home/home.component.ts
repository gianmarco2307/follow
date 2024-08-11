import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TabComponent } from '../../componenti/tab/tab.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, TabComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
