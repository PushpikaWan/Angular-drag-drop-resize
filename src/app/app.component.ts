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
      {id: 5, xStart: 2, xEnd: 3, yStart: 3, yEnd: 5},
      {id: 6, xStart: 3, xEnd: 4, yStart: 3, yEnd: 5}
    ];
  }

  updateCols(index: number, newColumnValue: any) {
    //todo index use may introduce error, use id instead of
    this.items[index].xEnd = this.items[index].xStart + this.toInt(newColumnValue);
    this.moveConflictingColumns(this.items[index]);
  }

  updateRows(index: number, newRowValue: any) {
    //todo index use may introduce error, use id instead of
    this.items[index].yEnd = this.items[index].yStart + this.toInt(newRowValue);
    this.moveConflictingRows(this.items[index]);
  }

  /**
   * This function is used to arrange other conflicting blocks when resizing columns of elements
   * @param resizingItem - item that changed positions
   */
  private moveConflictingColumns(resizingItem: DashboardItem) {
    this.items
      .filter(item => this.isConflictingItem(resizingItem, item))
      .forEach((val) => {
        const diff = resizingItem.xEnd - val.xStart;
        val.xStart += diff;
        val.xEnd += diff;
        // recursion
        return this.moveConflictingColumns(val);
      });
  }

  /**
   * This function is used to arrange other conflicting blocks when resizing rows of elements
   * @param resizingItem - item that changed positions
   */
  private moveConflictingRows(resizingItem: DashboardItem) {
    this.items
      .filter(item => this.isConflictingItem(resizingItem, item))
      .forEach((val) => {
        const diff = resizingItem.yEnd - val.yStart;
        val.yStart += diff;
        val.yEnd += diff;
        // recursion
        return this.moveConflictingColumns(val);
      });
  }

  private isConflictingItem(resizingItem: DashboardItem, item: DashboardItem): boolean {
    return item.xStart < resizingItem.xEnd && item.xEnd > resizingItem.xStart && item.yStart < resizingItem.yEnd && item.yEnd > resizingItem.yStart && item.id !== resizingItem.id;
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
