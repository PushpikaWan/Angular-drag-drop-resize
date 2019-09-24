import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-figure-drag-drop-cdk',
  templateUrl: './figure-drag-drop-cdk.component.html',
  styleUrls: ['./figure-drag-drop-cdk.component.css']
})
export class FigureDragDropCdkComponent implements OnInit {

  items = [
    'Carrots',
    'Tomatoes',
    'Onions',
    'Apples',
    'Avocados'
  ];

  basket = [
    'Oranges',
    'Bananas',
    'Cucumbers'
  ];

  constructor() { }

  ngOnInit() {
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log('item dropped within same list : from - ',event.previousContainer,' to - ',event.container);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      console.log('item dropped : from - ',event.previousContainer,' to - ',event.container);
    }
  }


}
