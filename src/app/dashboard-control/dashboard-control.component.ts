import { Component, OnDestroy, OnInit } from '@angular/core';
import { DashboardControllingService } from 'projects/angular-drag-drop-rearrange/src/lib/services/dashboard-controlling.service';
import { Dashboard } from 'projects/angular-drag-drop-rearrange/src/lib/dashboard.model';
import { DashboardItem } from 'angular-drag-drop-rearrange/lib/dashboard-item.model';

@Component({
  selector: 'app-dashboard-control',
  templateUrl: './dashboard-control.component.html',
  styleUrls: ['./dashboard-control.component.css']
})
export class DashboardControlComponent implements OnInit, OnDestroy {

  cols = 3;
  cardMaxRows = 2;

  dashboards: Dashboard[];
  selectedTemplate = 0;

  constructor(private dashboardService: DashboardControllingService) { }

  ngOnInit() {
    this.initialiseTemplates();
  }

  private initialiseTemplates() {
    const itemsMap1: Map<number, DashboardItem> = new Map();
    itemsMap1.set(1, { id: 1, xStart: 1, xEnd: 2, yStart: 1, yEnd: 2 });
    itemsMap1.set(2, { id: 2, xStart: 2, xEnd: 4, yStart: 1, yEnd: 3 });
    itemsMap1.set(3, { id: 3, xStart: 4, xEnd: 5, yStart: 1, yEnd: 2 });
    itemsMap1.set(4, { id: 4, xStart: 1, xEnd: 2, yStart: 2, yEnd: 5 });
    itemsMap1.set(5, { id: 5, xStart: 2, xEnd: 3, yStart: 3, yEnd: 5 });
    itemsMap1.set(6, { id: 6, xStart: 3, xEnd: 4, yStart: 3, yEnd: 5 });

    const itemsMap2: Map<number, DashboardItem> = new Map();
    itemsMap2.set(1, { id: 1, xStart: 1, xEnd: 2, yStart: 1, yEnd: 2 });
    itemsMap2.set(2, { id: 2, xStart: 2, xEnd: 4, yStart: 1, yEnd: 3 });
    itemsMap2.set(3, { id: 3, xStart: 4, xEnd: 5, yStart: 1, yEnd: 2 });
    this.dashboards = [
      {
        counter: itemsMap1.size,
        dashboardItems: itemsMap1
      },
      {
        counter: itemsMap2.size,
        dashboardItems: itemsMap2
      }
    ];
  }

  ngOnDestroy(): void {
    this.dashboardService.dashboardItemsDataChanged.unsubscribe();
  }

  addItem(cols: any, rows: any) {
    // this.dashboardService.addItem(cols.toInt32(cols,1),rows.toInt32(rows,1));
    this.dashboardService.addItem(+cols, +rows);
  }

  dashboardTemplateChangeListener(event: any) {
    this.selectedTemplate = event.target.value;
  }

  setTemplate() {
    this.dashboardService.loadDashboard(this.dashboards[this.selectedTemplate]);
  }

  resetPanel() {
    this.dashboardService.resetBoard();
  }

  counter(i: number) {
    return new Array(i);
  }
}
