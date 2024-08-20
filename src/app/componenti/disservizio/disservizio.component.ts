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
import { Disservizio } from '../../models/Disservizio';
import { ListboxModule } from 'primeng/listbox';

@Component({
  selector: 'app-disservizio',
  standalone: true,
  imports: [ButtonModule, DialogModule, NgIf, DividerModule, InputTextareaModule, FormsModule, CheckboxModule, ListboxModule],
  templateUrl: './disservizio.component.html',
  styleUrl: './disservizio.component.css'
})
export class DisservizioComponent implements OnChanges {
  protected disserviziModalVisible: boolean = false;
  protected newDisservizioModalVisible: boolean = false;
  protected editDisservizioModalVisible: boolean = false;

  protected disservizi: DisserviziCollection['disservizi'] = [];

  protected message = signal<string>('');
  protected activeDisservizio = signal<boolean>(true);

  protected indexDisservizioToEdit = signal<number>(0);

  @Input({required: true}) id!: string;

  constructor(private disserviziService: DisserviziService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.id = changes['id'].currentValue;
    // console.log(this.id);
    this.disserviziService.getDisservizi().subscribe((res) => {
      //@ts-ignore
      this.disservizi = res.find((disservizio) => disservizio.id === this.id).disservizi;
      // console.log(this.disservizi);
    })
  }

  onClickOpenDisserviziModal(): void {
    this.disserviziModalVisible = true;
  }

  onClickOpenNewDisservizioModal(): void {
    this.newDisservizioModalVisible = true;
  }

  onClickOpenEditDisservizioModal(index: number): void {
    this.editDisservizioModalVisible = true;
    this.indexDisservizioToEdit.set(index);
    this.message.set(this.disservizi[index].descrizione);
    this.activeDisservizio.set(this.disservizi[index].attivo);
  }

  hidingNewDisservizioModal() {
    this.message.set('');
    this.activeDisservizio.set(true);
  }

  hidingEditDisservizioModal() {
    this.indexDisservizioToEdit.set(0);
    this.message.set('');
    this.activeDisservizio.set(true);
  }

  reportDisservizio() {
    let newDisservizio: Disservizio = {
      descrizione: this.message(),
      attivo: this.activeDisservizio()
    }
    let newDisservizi = [...this.disservizi, newDisservizio];
    let collection: DisserviziCollection = {
      id: this.id,
      disservizi: newDisservizi
    }
    this.disserviziService.updateDisservizio(this.id, collection).subscribe({
      next: (res) => {
        this.newDisservizioModalVisible = false;
      }
    })
  }

  editDisservizio() {
    let newDisservizi = [...this.disservizi];
    newDisservizi[this.indexDisservizioToEdit()].descrizione = this.message();
    newDisservizi[this.indexDisservizioToEdit()].attivo = this.activeDisservizio();
    let collection: DisserviziCollection = {
      id: this.id,
      disservizi: newDisservizi
    }
    this.disserviziService.updateDisservizio(this.id, collection).subscribe({
      next: (res) => {
        this.editDisservizioModalVisible = false;
      }
    })
  }
}
