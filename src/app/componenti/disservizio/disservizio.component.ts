import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-disservizio',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './disservizio.component.html',
  styleUrl: './disservizio.component.css'
})
export class DisservizioComponent implements OnChanges {

  @Input({required: true}) id!: string;

  ngOnChanges(changes: SimpleChanges): void {
    this.id = changes['id'].currentValue;
    console.log(this.id);
  }

}
