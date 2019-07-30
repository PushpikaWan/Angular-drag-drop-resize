import { Component, OnInit } from '@angular/core';
import { DashboardControllingService } from 'projects/angular-drag-drop-rearrange/src/lib/services/dashboard-controlling.service';
import { Dashboard } from 'projects/angular-drag-drop-rearrange/src/lib/dashboard.model';

@Component({
  selector: 'app-dashboard-control',
  templateUrl: './dashboard-control.component.html',
  styleUrls: ['./dashboard-control.component.css']
})
export class DashboardControlComponent implements OnInit {

  availableColumns: number = 0;
  selectedColumn: number = 0;

  dashboards: Dashboard[];
  selectedTemplate: number = 0;

  constructor(private dashboardService: DashboardControllingService) { }

  ngOnInit() {
    this.dashboardService.dashboardComponentListChanged.subscribe(
      (items: Object[]) => {
        this.availableColumns = items.length;
      }
    );
    this.initialiseTemplates();
  }

  private initialiseTemplates() {
    this.dashboards = [
      { counter: 3,
        dashboardItemLists: [
          {id: '1',
          dashboardItems: [
              {
                id: 1,
                content: 'check 01'
              },
              {
                id: 2,
                content: 'check 02'
              },
              {
                id: 3,
                content: 'check 03'
              }
            ]
          }
        ]
      },
      {counter: 0,
      dashboardItemLists: []
      }
    ];
  }

  ngOnDestroy(): void {
    this.dashboardService.dashboardComponentListChanged.unsubscribe();
  }

  addVerticalPanel() {
    this.dashboardService.addVerticalItem(this.selectedColumn);
  }

  addHorizontalPanel() {
    this.dashboardService.addHorizontalItem();
  }

  veritvalPanelChangeListener(event: any) {
    this.selectedColumn = event.target.value;
  }

  dashboardTemplateChangeListener(event: any) {
    this.selectedTemplate = event.target.value;
  }

  setTemplate() {
    this.dashboardService.loadDashBoradItemsByList(this.dashboards[this.selectedTemplate]);
  }

  removeEmptyCells() {
    this.dashboardService.removeAllUnusedLists();
  }

  resetPanel() {
    this.dashboardService.resetPanel();
  }

  counter(i: number) {
    return new Array(i);
  }

}
