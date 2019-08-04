import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DashboardItem } from '../dashboard-item.model';
import { Dashboard } from '../dashboard.model';
import { Content } from '@angular/compiler/src/render3/r3_ast';

@Injectable({
  providedIn: 'root'
})

//todo create save functionlity
// todo create customizable width and height of dashboard
//todo can only one place to drag and go to angular cdk options and apply that can be applied


export class DashboardControllingService {

  counter = 0;
  maxcolumns: number = 3;
  maxRows: number = 2;
  dashboardItems: DashboardItem[] = [];

  dashboardComponentListChanged = new Subject();

  constructor() {
  }

  addItem(cols: number, rows: number) {
    this.dashboardItems.push({ id: this.counter, content: "Card "+this.counter, columns: cols, rows: rows });
    this.counter++;
    this.updateItemList();
  }

  resetPanel() {
    this.dashboardItems = [];
    this.counter = 0;
    this.updateItemList();
  }

  changeMaxColumns(maxcolumns: number) {
    this.maxcolumns = maxcolumns;
    this.updateItemList();
  }

  changeMaxRows(maxRows: number) {
    this.maxRows = maxRows;
    this.updateItemList();
  }

  /**
   * remove cardlist item of given id
   * @param id card list item id
   */
  removeItem(id: number) {
      this.dashboardItems.forEach((element: DashboardItem, index: number) => {
        if (id === element.id) {
          this.dashboardItems.splice(index, 1);
        }
      });
  }

  private updateItemList() {
    this.dashboardComponentListChanged.next(this.dashboardItems);
  }

  loadDashBoradItemsByList(dashboard: Dashboard) {
    this.dashboardItems = dashboard.dashboardItems;
    this.updateItemList();
    this.counter = dashboard.counter;
  }

  getCurrentDashboardToSave(): Dashboard {
    return { counter: this.counter, dashboardItems: this.dashboardItems };
  }

}
