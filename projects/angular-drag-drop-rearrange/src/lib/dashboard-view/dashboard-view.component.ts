import { Component, OnInit } from '@angular/core';
import { DashboardControllingService } from '../services/dashboard-controlling.service';
import { DashboardItem } from '../dashboard-item.model';

@Component({
  selector: 'app-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.css']
})
export class DashboardViewComponent {
  dashboardItems: Map<number, DashboardItem> = new Map();

  constructor(private dashboardControllingService: DashboardControllingService) {
    this.registerListeners();
    // this.initialiseDashboard();
  }

  // private initialiseDashboard() {
  //   const items: Map<number, DashboardItem> = new Map();
  //   items.set(1, { id: 1, xStart: 1, xEnd: 2, yStart: 1, yEnd: 2 });
  //   items.set(2, { id: 2, xStart: 2, xEnd: 4, yStart: 1, yEnd: 3 });
  //   items.set(3, { id: 3, xStart: 4, xEnd: 5, yStart: 1, yEnd: 2 });
  //   items.set(4, { id: 4, xStart: 1, xEnd: 2, yStart: 2, yEnd: 5 });
  //   items.set(5, { id: 5, xStart: 2, xEnd: 3, yStart: 3, yEnd: 5 });
  //   items.set(6, { id: 6, xStart: 3, xEnd: 4, yStart: 3, yEnd: 5 });
  //   this.dashboardControllingService.loadDashboard(items);
  // }

  private registerListeners() {
    this.dashboardControllingService.dashboardItemsDataChanged.subscribe(
      (data: Map<number, DashboardItem>) => {
        this.dashboardItems = data;
        console.log(this.dashboardItems);
      }
    );
  }

  updateCols(index: number, newColumnValue: any) {
    this.dashboardControllingService.updateCols(index, newColumnValue);
  }
  updateRows(index: number, newRowValue: any) {
    this.dashboardControllingService.updateRows(index, newRowValue);
  }
  handleDrop(event) {
    this.dashboardControllingService.handleDrop(event);
  }
  handleDragOver(event) {
    this.dashboardControllingService.handleDragOver(event);
  }
  handleDragEnter(event) {
    this.dashboardControllingService.handleDragEnter(event);
  }
  handleDragLeave(event) {
    this.dashboardControllingService.handleDragLeave(event);
  }
  handleDragStart(event) {
    this.dashboardControllingService.handleDragStart(event);
  }
  handleDragEnd(event) {
    this.dashboardControllingService.handleDragEnd(event);
  }
}
