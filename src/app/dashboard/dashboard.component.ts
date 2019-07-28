import { Component, OnInit, OnDestroy } from '@angular/core';

import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag} from '@angular/cdk/drag-drop';
import { DashboardControllingService } from '../services/dashboard-controlling.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  connectedTo = [];
  horizontalLists = [];

  constructor(private dashBoardService: DashboardControllingService)
  {}

  ngOnInit(): void {
    this.dashBoardService.dashboardComponentListChanged.subscribe(
      (items: Object[]) => {
        this.horizontalLists = items;
        this.initaliseDashboard(items); 
      }
    );
  }

  ngOnDestroy(): void {
    this.dashBoardService.dashboardComponentListChanged.unsubscribe();
  }

  private initaliseDashboard(items: any[])
  {
    for (let cardList of items) {
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

}
