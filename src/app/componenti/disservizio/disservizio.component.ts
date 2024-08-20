import { Component, Input, OnChanges, signal, SimpleChanges } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DisserviziCollection } from '../../models/DisserviziCollection';
import { DisserviziService } from '../../servizi/disservizi.service';
import { NgIf } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-disservizio',
  standalone: true,
  imports: [ButtonModule, DialogModule, NgIf, DividerModule, InputTextareaModule, FormsModule, CheckboxModule],
  templateUrl: './disservizio.component.html',
  styleUrl: './disservizio.component.css'
})
export class DisservizioComponent implements OnChanges {
  protected disserviziModalVisible: boolean = false;
  protected newDisservizioModalVisible: boolean = false;

  protected disservizi: DisserviziCollection['disservizi'] = [];

  protected message = signal<string>('');
  protected activeDisservizio = signal<boolean>(true);

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

  hidingNewDisservizioModal() {
    this.message.set('');
    this.activeDisservizio.set(true);
  }
}
