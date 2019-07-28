import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DashboardControllingService {

  counter = 0;
  horizontalLists = [];

  dashboardComponentListChanged = new Subject;

  constructor() {
  }

  addVerticalItem(id: number) {
    if (id > this.horizontalLists.length) {
      return;
    }
    let element = this.horizontalLists[id];
    element.cardList.push({ id: this.counter, name: 'card_' + this.counter });
    this.horizontalLists[id] = element;
    this.updateAfterItemAdded();
  }

  addHorizontalItem() {
    this.horizontalLists.push(
      {
        id: 'list_' + this.counter,
        cardList: [{ id: this.counter, name: 'card_' + this.counter }]
      }
    );
    this.updateAfterItemAdded();
  }

  private updateAfterItemAdded() {
    this.counter++;
    this.dashboardComponentListChanged.next(this.horizontalLists);
  }

}
