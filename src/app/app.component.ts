import { Component } from '@angular/core';

import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag} from '@angular/cdk/drag-drop';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
/**
 * @title Drag&Drop enter predicate
 */
export class AppComponent {
  title = 'angular-drag-drop-resize';


  counter = 12;
  horizontalLists = [];
  connectedTo = [];

  constructor()
  {
    this.initaliseDashboard();
  }

  private initaliseDashboard()
  {
    this.horizontalLists = [
      {
        id:'list_0',
        cardList:[
          "card_01",
          "card_02",
          "card_03"
        ]
      },
      {
        id:'list_1',
        cardList:[
          "card_11",
          "card_12",
          "card_13"
        ]
      },
      {
        id:'list_2',
        cardList:[
          "card_21",
          "card_22",
          "card_23"
        ]
      }
    ];

    for (let cardList of this.horizontalLists) {
      this.connectedTo.push(cardList.id);
    };
  }



  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  addHorizontalList(){
    this.horizontalLists.push([this.counter]);
    this.counter++;
  }

}
