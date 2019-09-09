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
    console.log(this.items[index], newColumnValue);
    let xEndOld =  this.items[index].xEnd ;
    let xEndNew =  this.items[index].xStart + this.toInt(newColumnValue);
    this.moveConflictingColumns(xEndOld, xEndNew, this.items[index]);
    //todo index use may introduce error use id instead of
    this.items[index].xEnd = xEndNew;
  }

  /**
   * todo - simplify this logic
   * This function is used to arrange other conflicting blocks when resizing elements
   * @param xEndOld
   * @param xEndNew
   * @param resizingItem
   */
  private moveConflictingColumns(xEndOld: number, xEndNew: number, resizingItem: DashboardItem) {
    this.items
      .filter(val => !(val.xStart < resizingItem.xEnd || val.yEnd <= resizingItem.yStart || val.yStart >= resizingItem.yEnd))
      .sort((n1,n2) => n1.xStart - n2.xStart)
      .forEach((val,index) => {
        if(xEndNew > val.xStart){
           let diff = xEndNew - val.xStart;
           val.xStart += diff;
           val.xEnd += diff;
           //recursion
           return this.moveConflictingColumns(val.xEnd - diff, val.xEnd,val);
        }
        else{
          return;
        }
      })
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
