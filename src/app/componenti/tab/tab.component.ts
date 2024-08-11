import { Component, OnInit } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { TabItem, tabItems } from '../../configs/tabItems';
import { NgForOf } from '@angular/common';


@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [MatTabsModule, NgForOf],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.css'
})
export class TabComponent implements OnInit {
  protected tabs: TabItem[] = [];

  ngOnInit(): void {
    this.tabs = tabItems;
  }
}
