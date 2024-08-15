import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TabItem, tabItems } from '../../configs/tabItems';
import { NgForOf } from '@angular/common';
import { TabMenuModule } from 'primeng/tabmenu';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.tabs = tabItems;
    this.activeItem = this.whatActiveItem();
    this.router.navigate([`home/${this.activeItem.option}`]);
  }

  whatActiveItem(): TabItem {
    const now = new Date();
    if(now.getDate() <= 24){
      return this.tabs[0];
    } else if(now.getDate() === 25){
      if(now.getHours() <= 18){
        return this.tabs[1];
      }
      return this.tabs[2];
    }
    return this.tabs[3];
  }

  onActiveItemChange(event: any) {
    this.activeItem = event;
    this.router.navigate([`home/${this.activeItem.option}`]);
  }
}
