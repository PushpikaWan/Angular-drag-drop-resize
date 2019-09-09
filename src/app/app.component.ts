import { Component } from '@angular/core';
import { DashboardControllingService } from './dashboard-controlling.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-drag-drop-resize';
  items: DashboardItem[];

  constructor( dashboardControllingService: DashboardControllingService) {
    this.items = [
      {id: 1, xStart: 1, xEnd: 2, yStart: 1, yEnd: 2},
      {id: 2, xStart: 2, xEnd: 4, yStart: 1, yEnd: 3},
      {id: 3, xStart: 4, xEnd: 5, yStart: 1, yEnd: 2},
      {id: 4, xStart: 1, xEnd: 2, yStart: 2, yEnd: 5},
      {id: 5, xStart: 2, xEnd: 3, yStart: 3, yEnd: 5}
    ];
  }

  updateCols(index: number, newColumnValue: any) {
    console.log(this.items[index], newColumnValue);
    this.items[index].xEnd = this.items[index].xStart + this.toInt(newColumnValue);
  }

  private toInt(val: any, fallbackValue: number = 0): number {
    const normalized = String(val).replace(/[\D]/g, '');
    const v = Number(normalized);
    return isNaN(v) ? fallbackValue : v;
  }
}


export class DashboardItem {
  id: number;
  xStart: number;
  xEnd: number;
  yStart: number;
  yEnd: number;
  content?: string;
}
