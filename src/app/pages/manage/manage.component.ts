import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { TabItem, tabItems } from '../../configs/tabItems';
import { TableModule } from 'primeng/table';
import { DatePipe, NgIf } from '@angular/common';
import { Percorso } from '../../models/Percorso';
import { FirestoreService } from '../../servizi/firestore.service';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';

@Component({
  selector: 'app-manage',
  standalone: true,
  imports: [
    DropdownModule,
    FormsModule,
    NgIf,
    TableModule,
    DatePipe,
    ButtonModule,
    InputMaskModule,
  ],
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.css',
})
export class ManageComponent {
  selectedDay!: TabItem;
  tabItems: TabItem[] = tabItems;
  percorso: Percorso = {} as Percorso;

  constructor(private firestoreService: FirestoreService) {}

  itemChanged(event: DropdownChangeEvent) {
    this.firestoreService.getPercorsi().subscribe({
      next: (percorsi) => {
        this.percorso = percorsi.filter(
          (percorso: any) => percorso.id === this.selectedDay.option,
        )[0];
        for (let i = 0; i < this.percorso.checkpoint.length; i++) {
          if (this.percorso.checkpoint[i].orarioArrivoPrevisto) {
            //@ts-ignore
            this.percorso.checkpoint[i].orarioArrivoPrevisto = this.percorso.checkpoint[i].orarioArrivoPrevisto.toDate();
            //@ts-ignore
            this.percorso.checkpoint[i].orarioArrivoEffettivo = this.percorso.checkpoint[i].orarioArrivoEffettivo.toDate();
          }
          if (this.percorso.checkpoint[i].orarioPartenzaPrevisto) {
            //@ts-ignore
            this.percorso.checkpoint[i].orarioPartenzaPrevisto = this.percorso.checkpoint[i].orarioPartenzaPrevisto.toDate();
            //@ts-ignore
            this.percorso.checkpoint[i].orarioPartenzaEffettivo = this.percorso.checkpoint[i].orarioPartenzaEffettivo.toDate();
          }
          if (this.percorso.checkpoint[i].orarioPassaggioPrevisto) {
            //@ts-ignore
            this.percorso.checkpoint[i].orarioPassaggioPrevisto = this.percorso.checkpoint[i].orarioPassaggioPrevisto.toDate();
            //@ts-ignore
            this.percorso.checkpoint[i].orarioPassaggioEffettivo = this.percorso.checkpoint[i].orarioPassaggioEffettivo.toDate();
          }
        }
        console.log(this.percorso);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  saveChanges(index: number) {
    if(this.percorso.checkpoint[index].orarioArrivoPrevisto) {
      //@ts-ignore
      let times = [this.percorso.checkpoint[index].orarioArrivoEffettivo.split(':')[0], this.percorso.checkpoint[index].orarioArrivoEffettivo.split(':')[1]];
      //@ts-ignore
      this.percorso.checkpoint[index].orarioArrivoEffettivo = new Date(this.percorso.checkpoint[index].orarioArrivoPrevisto);
      //@ts-ignore
      this.percorso.checkpoint[index].orarioArrivoEffettivo.setHours(times[0]);
      //@ts-ignore
      this.percorso.checkpoint[index].orarioArrivoEffettivo.setMinutes(times[1]);
    }
    if(this.percorso.checkpoint[index].orarioPartenzaPrevisto) {
      //@ts-ignore
      let times = [this.percorso.checkpoint[index].orarioPartenzaEffettivo.split(':')[0], this.percorso.checkpoint[index].orarioPartenzaEffettivo.split(':')[1]];
      //@ts-ignore
      this.percorso.checkpoint[index].orarioPartenzaEffettivo = new Date(this.percorso.checkpoint[index].orarioPartenzaPrevisto);
      //@ts-ignore
      this.percorso.checkpoint[index].orarioPartenzaEffettivo.setHours(times[0]);
      //@ts-ignore
      this.percorso.checkpoint[index].orarioPartenzaEffettivo.setMinutes(times[1]);
    }
    if(this.percorso.checkpoint[index].orarioPassaggioPrevisto) {
      //@ts-ignore
      let times = [this.percorso.checkpoint[index].orarioPassaggioEffettivo.split(':')[0], this.percorso.checkpoint[index].orarioPassaggioEffettivo.split(':')[1]];
      //@ts-ignore
      this.percorso.checkpoint[index].orarioPassaggioEffettivo = new Date(this.percorso.checkpoint[index].orarioPassaggioPrevisto);
      //@ts-ignore
      this.percorso.checkpoint[index].orarioPassaggioEffettivo.setHours(times[0]);
      //@ts-ignore
      this.percorso.checkpoint[index].orarioPassaggioEffettivo.setMinutes(times[1]);
    }
    this.firestoreService.updatePercorso(this.tabItems[0].option, this.percorso);
  }
}
