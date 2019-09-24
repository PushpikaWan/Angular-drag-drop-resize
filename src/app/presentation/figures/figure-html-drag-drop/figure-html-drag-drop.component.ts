import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-figure-html-drag-drop',
  templateUrl: './figure-html-drag-drop.component.html',
  styleUrls: ['./figure-html-drag-drop.component.css']
})
export class FigureHtmlDragDropComponent implements OnInit {

  items = [];

  handleDrop(event) {
    console.log("dropped :", event.target.id);
  }
  handleDragOver(event) {
    console.log("dragged over :", event.target.id);
  }
  handleDragEnter(event) {
    console.log("drag enter :", event.target.id);
  }
  handleDragExit(event) {
    console.log("drag exit :", event.target.id);
  }
  handleDragLeave(event) {
    console.log("drag leave :",event.target.id);
  }
  handleDragStart(event) {
    console.log("drag start :",event.target.id);
  }
  handleDragEnd(event) {
    console.log("drag end :",event.target.id);
  }

  ngOnInit(): void {
    this.items = [
      {id: ' element - 1'},
      {id: ' element - 2'}
    ];
  }

}
