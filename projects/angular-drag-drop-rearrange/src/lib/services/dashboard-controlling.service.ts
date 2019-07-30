import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DashboardItem } from '../dashboard-item.model';
import { DashboardItemList } from '../dashboard-item-list.model';
import { Dashboard } from '../dashboard.model';

@Injectable({
  providedIn: 'root'
})

//todo create save functionlity
// todo create customizable width and height of dashboard
//todo can only one place to drag and go to angular cdk options and apply that can be applied


export class DashboardControllingService {

  counter = 0;
  horizontalLists: DashboardItemList[] = [];

  dashboardComponentListChanged = new Subject();

  constructor() {
  }

  addVerticalItem(id: number) {
    if (id > this.horizontalLists.length) {
      return;
    }
    let element = this.horizontalLists[id];
    element.dashboardItems.push({ id: this.counter, content: 'card_' + this.counter });
    this.horizontalLists[id] = element;
    this.updateAfterItemAdded();
  }

  addHorizontalItem() {
    this.horizontalLists.push(
      {
        id: 'list_' + this.counter,
        dashboardItems: [ { id: this.counter, content: 'card_' + this.counter }]
      }
    );
    this.updateAfterItemAdded();
  }

  resetPanel() {
    this.horizontalLists = [];
    this.counter = 0;
    this.dashboardComponentListChanged.next(this.horizontalLists);
  }

  /**
   * remove cardlist item of given id
   * @param id card list item id
   */
  removeItem(id: number) {
    this.horizontalLists.forEach( (valueList) => {
      valueList.dashboardItems.forEach( (element: DashboardItem, index: number) => {
        if (id === element.id) {
          valueList.dashboardItems.splice(index, 1);
        }
      });
    });
  }

  removeAllUnusedLists() {
    this.horizontalLists = this.horizontalLists.filter((e) => {
      return e.dashboardItems.length > 0;
    });
    this.dashboardComponentListChanged.next(this.horizontalLists);
  }

  private updateAfterItemAdded() {
    this.counter++;
    this.dashboardComponentListChanged.next(this.horizontalLists);
    this.removeAllUnusedLists();
  }

   loadDashBoradItemsByList(dashboard: Dashboard)
  {
    this.horizontalLists = dashboard.dashboardItemLists;
    this.dashboardComponentListChanged.next(this.horizontalLists);
    this.counter = dashboard.counter;
  }

  getCurrentDashboardToSave(): Dashboard {
    return {counter: this.counter, dashboardItemLists: this.horizontalLists};
  }

}
