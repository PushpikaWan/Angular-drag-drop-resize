import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DashboardControllingService {

  counter = 3;
  horizontalLists = [];

  dashboardComponentListChanged = new Subject;

  constructor() { 
    this.addInitialElement();
  }

  addInitialElement() {
    this.horizontalLists = [
      {
        id: 'list_0',
        cardList: ["card_01", "card_02", "card_03"]
      },
      {
        id: 'list_1',
        cardList: ["card_11", "card_12", "card_13"]
      },
      {
        id: 'list_2',
        cardList: ["card_21", "card_22", "card_23"]
      }
    ];
  }

  addItem(){
   this.addHorizontalList();
    this.dashboardComponentListChanged.next(this.horizontalLists);
  }

  private addVerticalItem(){

  }

  private addHorizontalList() {
    this.horizontalLists.push(
      {
        id: 'list_'+this.counter,
        cardList: ['card_'+this.counter+'1','card_'+this.counter+'2','card_'+this.counter+'3']
      }
      );
    this.counter++;
  }

}
