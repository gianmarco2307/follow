import { Component, DoCheck, Input, OnDestroy, OnInit, signal } from '@angular/core';
import { FirestoreService } from '../../servizi/firestore.service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-tracking',
  standalone: true,
  imports: [],
  templateUrl: './tracking.component.html',
  styleUrl: './tracking.component.css'
})
export class TrackingComponent implements OnInit, OnDestroy {
  id = signal<string>('');
  private idSubject = new BehaviorSubject<string>('');
  private routeSub!: Subscription;

  constructor(private firestoreService: FirestoreService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      this.id.set(params['id']);
      this.idSubject.next(params['id']);
    });

    this.idSubject.subscribe((id) => {
      this.getPercorso();
    });
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  getPercorso(): void {
    this.firestoreService.getPercorsi().subscribe((percorsi) => {
      console.log(percorsi.filter((percorso: any) => percorso.id === this.id())[0]);
    });
  }

}
