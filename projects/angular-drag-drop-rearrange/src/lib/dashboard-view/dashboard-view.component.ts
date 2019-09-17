import { ChangeDetectionStrategy, Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { DashboardControllingService } from '../services/dashboard-controlling.service';
import { DashboardItem } from '../dashboard-item.model';

@Component({
  // changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.css']
})
export class DashboardViewComponent {
  dashboardItems: Map<number, DashboardItem> = new Map();
  columnCountPerRow = 8; // 1 -> (0 -540) 2-> (541- 900) 8 -> (900>)

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.triggerResizeWindow(event.target.innerWidth, event.target.innerHeight);
  }

  constructor(private dashboardControllingService: DashboardControllingService, private renderer: Renderer2) {
    this.registerListeners();
    // this.dashboardControllingService.triggerResizeWindow(window.innerWidth, window.innerHeight);
  }

  private registerListeners() {
    this.dashboardControllingService.dashboardItemsDataChanged.subscribe(
      (data: Map<number, DashboardItem>) => {
        this.dashboardItems = data;
      }
    );
  }

  private triggerResizeWindow(width: number, height: number) {
    // todo check height and update resize event at initial time
    if (width <= 540) {
      this.columnCountPerRow = 1;
    } else if (width <= 1100) {
      this.columnCountPerRow = 2;
    } else {
      this.columnCountPerRow = 8;
    }
    console.log('col count', this.columnCountPerRow, 'check', this.columnCountPerRow !== 8);
    this.dashboardControllingService.updateMaxColumnCountWhenResize(this.columnCountPerRow);
  }
  getFloorAfterDividedByTwo( value: number): number {
    return Math.floor(value / 2);
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
