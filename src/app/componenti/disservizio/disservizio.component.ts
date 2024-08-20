import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DisserviziCollection } from '../../models/DisserviziCollection';
import { DisserviziService } from '../../servizi/disservizi.service';
import { NgIf } from '@angular/common';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-disservizio',
  standalone: true,
  imports: [ButtonModule, DialogModule, NgIf, DividerModule],
  templateUrl: './disservizio.component.html',
  styleUrl: './disservizio.component.css'
})
export class DisservizioComponent implements OnChanges {
  protected disserviziModalVisible: boolean = false;
  protected newDisservizioModalVisible: boolean = false;

  protected disservizi: DisserviziCollection['disservizi'] = [];

  @Input({required: true}) id!: string;

  constructor(private disserviziService: DisserviziService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.id = changes['id'].currentValue;
    console.log(this.id);
    this.disserviziService.getDisservizi().subscribe((res) => {
      //@ts-ignore
      this.disservizi = res.find((disservizio) => disservizio.id === this.id).disservizi;
      console.log(this.disservizi);
    })
  }

  onClickOpenDisserviziModal(): void {
    this.disserviziModalVisible = true;
  }

  onClickOpenNewDisservizioModal(): void {
    this.newDisservizioModalVisible = true;
  }
}
