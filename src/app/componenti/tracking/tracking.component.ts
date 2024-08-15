import { Component, Input, OnInit } from '@angular/core';
import { FirestoreService } from '../../servizi/firestore.service';

@Component({
  selector: 'app-tracking',
  standalone: true,
  imports: [],
  templateUrl: './tracking.component.html',
  styleUrl: './tracking.component.css'
})
export class TrackingComponent implements OnInit {

  @Input({required: true}) giorno!: string;

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit(): void {
    this.firestoreService.getPercorsi().subscribe((percorsi) => {
      console.log(percorsi);
    });
  }

}
