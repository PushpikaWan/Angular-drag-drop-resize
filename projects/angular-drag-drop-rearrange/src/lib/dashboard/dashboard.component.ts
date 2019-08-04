import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';

import { Breakpoints, BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDragEnter } from '@angular/cdk/drag-drop';
import { map } from 'rxjs/operators';

import { DashboardControllingService } from '../services/dashboard-controlling.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { DashboardItem } from '../dashboard-item.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  @Output() orderChanged: EventEmitter<any[]> = new EventEmitter();
  
  @Input() cols: number = 3;
  @Input() cardMaxRows: number = 2;

  dashboardItems: DashboardItem[] = [];
  responsiveColumns: number;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private breakpointObserver: BreakpointObserver,
    private dashboardService: DashboardControllingService
  ) {}

  ngOnInit(): void {
    /* Responsive breakpoints */
    this.observeBreakpoint(Breakpoints.TabletPortrait, () => 2);
    this.observeBreakpoint(Breakpoints.HandsetPortrait, () => 1);
    this.dashboardService.dashboardComponentListChanged.subscribe(
      (items: any[]) => {
        this.dashboardItems = items;
      }
    );
  }


  ngOnDestroy(): void {
    this.dashboardService.dashboardComponentListChanged.unsubscribe();
  }

  entered(e: CdkDragEnter): void {
    moveItemInArray(this.dashboardItems, e.item.data, e.container.data);
    this.changeDetector.markForCheck();
  }

  dropped(e: CdkDragEnter): void {
    this.orderChanged.emit(this.dashboardItems);
  }

  private observeBreakpoint(bp: string | string[], cb: () => number): void {
    this.breakpointObserver
      .observe(bp)
      .pipe(
        map((result: BreakpointState) => result.matches),
        untilDestroyed(this)
      )
      .subscribe((result: boolean) => {
        this.responsiveColumns = result ? cb() : undefined;
        this.changeDetector.markForCheck();
      });
  }

  updateCols(index: number ,val: any): void {
    // this.cards[index].cols = this.toInt(val, this.cols) || this.cols;
    this.dashboardItems[index].columns = val;
    this.orderChanged.emit(this.dashboardItems);
  }

  updateRows(index: number ,val: any): void {
    // this.cards[index].rows = this.toInt(val, this.cardMaxRows) || this.cardMaxRows;
    this.dashboardItems[index].rows = val;
    this.orderChanged.emit(this.dashboardItems);
  }

  removeItem(id: number) {
    this.dashboardService.removeItem(id);
  }

}
