import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


// todo remove height that get using view port
//todo add delete button to empty list
//todo add delete button to components
//todo add reset button
//todo can only one place to drag and go to angular cdk options and apply that can be applied


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
    console.log("cur length",this.horizontalLists.length);
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
  removeItem(id: number)
  {
    this.horizontalLists.forEach(function (value_list) {
      value_list.cardList.forEach(function(element, index) {
        if(id === element.id){
          value_list.cardList.splice(index, 1);
        }
      })
    }); 
  }

  removeAllUnusedLists(){
    this.horizontalLists = this.horizontalLists.filter(function (e) {
      return e.cardList.length > 0;
    });
    this.dashboardComponentListChanged.next(this.horizontalLists);
  }
  private updateAfterItemAdded() {
    this.counter++;
    this.dashboardComponentListChanged.next(this.horizontalLists);
    this.removeAllUnusedLists();
  }

}
