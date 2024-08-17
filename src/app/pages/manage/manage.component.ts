import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { TabItem, tabItems } from '../../configs/tabItems';

@Component({
  selector: 'app-manage',
  standalone: true,
  imports: [DropdownModule, FormsModule],
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.css'
})
export class ManageComponent {
  selectedDay!: TabItem;
  tabItems: TabItem[] = tabItems;

  itemChanged(event: DropdownChangeEvent){
    console.log(this.selectedDay)
  }
}
