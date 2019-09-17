import {Component, HostListener, OnInit, Renderer2} from '@angular/core';
import { DashboardControllingService } from '../services/dashboard-controlling.service';
import { DashboardItem } from '../dashboard-item.model';

@Component({
  selector: 'app-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.css']
})
export class DashboardViewComponent {
  dashboardItems: Map<number, DashboardItem> = new Map();
  isMinimized = false;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    console.log('resize event:', event.target.innerWidth);
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
    if (width <= 376) {
      this.dashboardControllingService.updateMaxColumnCountWhenResize(1);
      this.isMinimized = true;
      console.log('minimized');
    } else{
      this.dashboardControllingService.updateMaxColumnCountWhenResize(8);
      this.isMinimized = false;
      console.log('max', 'width', width);
    }
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
