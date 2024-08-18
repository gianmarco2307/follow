import { Component, computed, DoCheck, Input, OnDestroy, OnInit, signal } from '@angular/core';
import { FirestoreService } from '../../servizi/firestore.service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { MapComponent } from '../map/map.component';
import { Checkpoint } from '../../models/Checkpoint';
import { Percorso } from '../../models/Percorso';
import { DatePipe, NgIf } from '@angular/common';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-tracking',
  standalone: true,
  imports: [MapComponent, NgIf, DatePipe, TagModule],
  templateUrl: './tracking.component.html',
  styleUrl: './tracking.component.css'
})
export class TrackingComponent implements OnInit, OnDestroy {
  id = signal<string>('');
  private idSubject = new BehaviorSubject<string>('');
  private routeSub!: Subscription;
  lastPosition = computed<Checkpoint>(() => {
    let lP: Checkpoint = {} as Checkpoint;
    for (let i = this.percorso().checkpoint.length - 1; i >= 0; i--) {
      if (this.percorso().checkpoint[i].orarioPassaggioPrevisto && this.percorso().checkpoint[i].orarioPassaggioEffettivo) {
        //@ts-ignore
        if(this.percorso().checkpoint[i].orarioPassaggioEffettivo?.getHours() > 0 && this.percorso().checkpoint[i].orarioPassaggioEffettivo?.getMinutes() > 0){
          lP = this.percorso().checkpoint[i];
          break
        }
      } else if(this.percorso().checkpoint[i].orarioArrivoPrevisto && this.percorso().checkpoint[i].orarioArrivoEffettivo){
        //@ts-ignore
        if(this.percorso().checkpoint[i].orarioArrivoEffettivo?.getHours() > 0 && this.percorso().checkpoint[i].orarioArrivoEffettivo?.getMinutes() > 0){
          lP = this.percorso().checkpoint[i];
          break
        }
      } else if(this.percorso().checkpoint[i].orarioPartenzaPrevisto && this.percorso().checkpoint[i].orarioPartenzaEffettivo){
        //@ts-ignore
        if(this.percorso().checkpoint[i].orarioPartenzaEffettivo?.getHours() > 0 && this.percorso().checkpoint[i].orarioPartenzaEffettivo?.getMinutes() > 0){
          lP = this.percorso().checkpoint[i];
          break
        }
      }
      if (i === 0) {
        lP = this.percorso().checkpoint[0];
      }
    }
    return lP;
  });
  percorso = signal<Percorso>({} as Percorso);
  readyToShow = signal<boolean>(false);
  lastTime = computed<Date>(() => {
    let lT: Date = new Date();
    if(this.lastPosition().orarioPartenzaPrevisto && this.lastPosition().orarioArrivoPrevisto){
      //@ts-ignore
      if(this.lastPosition().orarioPartenzaEffettivo?.getHours() >= 0 && this.lastPosition().orarioPartenzaEffettivo?.getMinutes() >= 0){
        lT = this.lastPosition().orarioPartenzaEffettivo || new Date();
      } else {
        lT = this.lastPosition().orarioArrivoEffettivo || new Date();
      }
    } else {
      if(this.lastPosition().orarioPartenzaPrevisto) lT = this.lastPosition().orarioPartenzaEffettivo || new Date();
      if(this.lastPosition().orarioArrivoPrevisto) lT = this.lastPosition().orarioArrivoEffettivo || new Date();
      if(this.lastPosition().orarioPassaggioPrevisto) lT = this.lastPosition().orarioPassaggioEffettivo || new Date();
    }
    return lT;
  });

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
      this.readyToShow.set(false);
      this.percorso.set(percorsi.filter((percorso: any) => percorso.id === this.id())[0]);
      this.percorso.update((percorso) => {
        let newPercorso = percorso;
        for (let i = 0; i < percorso.checkpoint.length; i++) {
          if(newPercorso.checkpoint[i].orarioPassaggioPrevisto){
            //@ts-ignore
            newPercorso.checkpoint[i].orarioPassaggioPrevisto = newPercorso.checkpoint[i].orarioPassaggioPrevisto.toDate();
            //@ts-ignore
            newPercorso.checkpoint[i].orarioPassaggioEffettivo = newPercorso.checkpoint[i].orarioPassaggioEffettivo.toDate();
          }
          if(newPercorso.checkpoint[i].orarioArrivoPrevisto){
            //@ts-ignore
            newPercorso.checkpoint[i].orarioArrivoPrevisto = newPercorso.checkpoint[i].orarioArrivoPrevisto.toDate();
            //@ts-ignore
            newPercorso.checkpoint[i].orarioArrivoEffettivo = newPercorso.checkpoint[i].orarioArrivoEffettivo.toDate();
          }
          if(newPercorso.checkpoint[i].orarioPartenzaPrevisto){
            //@ts-ignore
            newPercorso.checkpoint[i].orarioPartenzaPrevisto = newPercorso.checkpoint[i].orarioPartenzaPrevisto.toDate();
            //@ts-ignore
            newPercorso.checkpoint[i].orarioPartenzaEffettivo = newPercorso.checkpoint[i].orarioPartenzaEffettivo.toDate();
          }
        }
        return newPercorso;
      });
      // console.log('percorso ',this.percorso());
      // console.log('ultima posizione ',this.lastPosition());
      this.readyToShow.set(true);
      //Per formattare la data
      //console.log(percorsi.filter((percorso: any) => percorso.id === this.id())[0].checkpoint[0].orarioPassaggioPrevisto.toDate());
    });
  }

  is00(data: Date): boolean {
    return data.getHours() === 0 && data.getMinutes() === 0;
  }

  state(): string {
    let difference: number = 0;
    if(this.lastPosition() === this.percorso().checkpoint[0]){
      if(this.lastPosition().orarioPartenzaEffettivo?.getHours() === 0 && this.lastPosition().orarioPartenzaEffettivo?.getMinutes() === 0){
        return 'NON PARTITO'
      }
    }
    if(this.lastPosition().orarioPartenzaPrevisto && this.lastPosition().orarioArrivoPrevisto){
      //@ts-ignore
      if(this.lastPosition().orarioPartenzaEffettivo?.getHours() >= 0 && this.lastPosition().orarioPartenzaEffettivo?.getMinutes() >= 0){
        //@ts-ignore
        let diffInMs = this.lastPosition().orarioPartenzaEffettivo.getTime() - this.lastPosition().orarioPartenzaPrevisto.getTime();
        difference = Math.floor(diffInMs / (1000 * 60));
      } else {
        //@ts-ignore
        let diffInMs = this.lastPosition().orarioArrivoEffettivo.getTime() - this.lastPosition().orarioArrivoPrevisto.getTime();
        difference = Math.floor(diffInMs / (1000 * 60));
      }
    } else {
      if(this.lastPosition().orarioPartenzaPrevisto){
        //@ts-ignore
        let diffInMs = this.lastPosition().orarioPartenzaEffettivo.getTime() - this.lastPosition().orarioPartenzaPrevisto.getTime();
        difference = Math.floor(diffInMs / (1000 * 60));
      }
      if(this.lastPosition().orarioArrivoPrevisto){
        //@ts-ignore
        let diffInMs = this.lastPosition().orarioArrivoEffettivo.getTime() - this.lastPosition().orarioArrivoPrevisto.getTime();
        difference = Math.floor(diffInMs / (1000 * 60));
      }
      if(this.lastPosition().orarioPassaggioPrevisto){
        //@ts-ignore
        let diffInMs = this.lastPosition().orarioPassaggioEffettivo.getTime() - this.lastPosition().orarioPassaggioPrevisto.getTime();
        difference = Math.floor(diffInMs / (1000 * 60));
      }
    }
    if (difference < 0) {
      return difference.toString() + ' MIN';
    }
    if (difference > 0) {
      return '+' + difference.toString() + ' MIN';
    }
    if (difference === 0) {
      return 'IN ORARIO';
    }
    return 'NON PARTITO';
  }
}
