
import { CdkDropList, CdkDragDrop, CdkDragEnter, moveItemInArray } from '@angular/cdk/drag-drop';
import { Breakpoints, BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, ViewChildren, QueryList, ChangeDetectorRef, OnInit, OnDestroy, AfterViewInit, SimpleChanges } from '@angular/core';
import { map } from 'rxjs/operators';
//todo try to remoe this
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-test-code-multisize-dashboard',
  templateUrl: './test-code-multisize-dashboard.component.html',
  styleUrls: ['./test-code-multisize-dashboard.component.css']
})
export class TestCodeMultisizeDashboardComponent implements OnInit, OnDestroy {
  responsiveColumns: number;

  @Output() orderChanged: EventEmitter<any[]> = new EventEmitter();

  @Input() cols: number = 3;
  @Input() cardMaxRows: number = 2;
  @Input() cards: any[] = [];

  constructor(
    private changeDetector: ChangeDetectorRef,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    /* Responsive breakpoints */
    this.observeBreakpoint(Breakpoints.TabletPortrait, () => 2);
    this.observeBreakpoint(Breakpoints.HandsetPortrait, () => 1);
  }

  /* Required by: untilDestroyed() */
  ngOnDestroy(): void {}

  entered(e: CdkDragEnter): void {
    moveItemInArray(this.cards, e.item.data, e.container.data);
    this.changeDetector.markForCheck();
  }

  dropped(e: CdkDragEnter): void {
    this.orderChanged.emit(this.cards);
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
    this.cards[index].cols = val;
    console.log(this.cards);
    console.log("val:",val);
    this.orderChanged.emit(this.cards);
  }

  updateRows(index: number ,val: any): void {
    // this.cards[index].rows = this.toInt(val, this.cardMaxRows) || this.cardMaxRows;
    this.cards[index].rows = val;
    console.log(this.cards);
    this.orderChanged.emit(this.cards);
  }

}
