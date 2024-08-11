import { Component, OnInit } from '@angular/core';
import { TabItem, tabItems } from '../../configs/tabItems';
import { NgForOf } from '@angular/common';
import { TabMenuModule } from 'primeng/tabmenu';

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [NgForOf, TabMenuModule],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.css',
})
export class TabComponent implements OnInit {
  protected tabs: TabItem[] = [];
  protected activeItem!: TabItem;

  ngOnInit(): void {
    this.tabs = tabItems;
    this.activeItem = this.tabs[0];
  }

  onActiveItemChange(event: any) {
    console.log(event);
    this.activeItem = event;
  }
}
