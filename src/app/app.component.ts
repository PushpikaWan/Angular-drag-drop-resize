import {Component, HostListener, Renderer2} from '@angular/core';
import { DashboardControllingService } from './dashboard-controlling.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'angular-drag-drop-resize';
  items: Map<number, DashboardItem> = new Map();
  private dragSrcEl: HTMLDivElement = null;
  private overTarget: HTMLDivElement = null;
  private gridClientX: number;
  private gridClientY: number;
  private maxColumnsCount: number = 8; //this is static can only change by css
  private maxRowsCount: number = 0;

  constructor(private dashboardControllingService: DashboardControllingService, private renderer: Renderer2) {
    this.items.set(1, {id: 1, xStart: 1, xEnd: 2, yStart: 1, yEnd: 2});
    this.items.set(2, {id: 2, xStart: 2, xEnd: 4, yStart: 1, yEnd: 3});
    this.items.set(3, {id: 3, xStart: 4, xEnd: 5, yStart: 1, yEnd: 2});
    this.items.set(4, {id: 4, xStart: 1, xEnd: 2, yStart: 2, yEnd: 5});
    this.items.set(5, {id: 5, xStart: 2, xEnd: 3, yStart: 3, yEnd: 5});
    this.items.set(6, {id: 6, xStart: 3, xEnd: 4, yStart: 3, yEnd: 5});
  }

  updateCols(index: number, newColumnValue: any) {
    const resizingElement: DashboardItem = this.items.get(index);
    resizingElement.xEnd = this.items.get(index).xStart + this.toInt(newColumnValue);
    this.items.set(index, resizingElement);
    this.moveConflictingColumns(this.items.get(index));
  }

  updateRows(index: number, newRowValue: any) {
    const resizingElement: DashboardItem = this.items.get(index);
    resizingElement.yEnd = this.items.get(index).yStart + this.toInt(newRowValue);
    this.items.set(index, resizingElement);
    this.moveConflictingRows(this.items.get(index));
  }

  /**
   * This function is used to arrange other conflicting blocks when resizing columns of elements
   * @param resizingItem - item that changed positions
   */
  private moveConflictingColumns(resizingItem: DashboardItem) {
    Array.from(this.items.values())
      .filter(item => this.isConflictingItem(resizingItem, item))
      .forEach((val) => {
        const diff = resizingItem.xEnd - val.xStart;
        const changingItem: DashboardItem = this.items.get(val.id);
        changingItem.xStart += diff;
        changingItem.xEnd += diff;
        this.items.set(val.id, changingItem);
        // recursion
        return this.moveConflictingColumns(changingItem);
      });
  }

  /**
   * This function is used to arrange other conflicting blocks when resizing rows of elements
   * @param resizingItem - item that changed positions
   */
  private moveConflictingRows(resizingItem: DashboardItem) {
    Array.from(this.items.values())
      .filter(item => this.isConflictingItem(resizingItem, item))
      .forEach((val) => {
        const diff = resizingItem.yEnd - val.yStart;
        const changingItem: DashboardItem = this.items.get(val.id);
        changingItem.yStart += diff;
        changingItem.yEnd += diff;
        this.items.set(val.id, changingItem);
        // recursion
        return this.moveConflictingRows(changingItem);
      });
  }

  handleDrop(ev) {
    if (ev.stopPropagation) {
      ev.stopPropagation(); // Stops some browsers from redirecting.
    }
    ev.preventDefault();
    // const data = ev.dataTransfer.getData('text');
  }

  handleDragOver(ev) {
    ev.preventDefault();
    // const data = ev.dataTransfer.getData('text');
    ev.dataTransfer.dropEffect = 'move';
  }

  handleDragEnter(ev) {
    ev.preventDefault();
    // this.overTarget = ev.target;
    // if (this.overTarget && this.dragSrcEl && this.items.get(this.toInt(this.overTarget.id)) !== undefined && this.items.get(this.toInt(this.overTarget.id)) !== undefined) {
    //   const dragSrcElement: DashboardItem = this.items.get(this.toInt(this.dragSrcEl.id));
    //   const dragOverElement: DashboardItem = this.items.get(this.toInt(this.overTarget.id));
    //
    //   const colDiff = dragSrcElement.xEnd - dragSrcElement.xStart;
    //   const rowDiff = dragSrcElement.yEnd - dragSrcElement.yStart;
    //   const isRowSpecificChange = Math.abs(dragSrcElement.xStart - dragOverElement.xStart) < Math.abs(dragSrcElement.yStart - dragOverElement.yStart);
    //   dragSrcElement.xStart = dragOverElement.xStart;
    //   dragSrcElement.xEnd =  dragOverElement.xStart + colDiff;
    //   dragSrcElement.yStart = dragOverElement.yStart;
    //   dragSrcElement.yEnd = dragOverElement.yStart + rowDiff;
    //
    //   this.items.set(this.toInt(this.dragSrcEl.id), dragSrcElement);
    //   if (isRowSpecificChange) {
    //     this.moveConflictingRows(dragSrcElement);
    //   } else {
    //     this.moveConflictingColumns(dragSrcElement);
    //   }
    // }
  }

  handleDragLeave(event) {
    event.preventDefault();
    this.overTarget = null;
  }

  handleDragStart(event) {
    this.renderer.setStyle(event.target, 'opacity', '0.4');
    this.dragSrcEl = event.target;
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text', event.target.id);
  }

  /**
   * update window client data, rows and columns count
   */
  private updatePreDropping() {
    const gridElement = document.getElementById('grid');
    this.gridClientX = gridElement.clientWidth;
    this.gridClientY = gridElement.clientHeight;
    this.maxRowsCount = 0;
    Array.from(this.items.values())
      .forEach(value => {
        if(value.yEnd - 1 > this.maxRowsCount){
          this.maxRowsCount = value.yEnd - 1;
        }
      });
  }

  handleDragEnd(event) {
    this.renderer.setStyle(event.target, 'opacity', '1.0');
    // todo check column is enough to drop there and add extra logic to move others
    if( this.dragSrcEl && this.items.get(this.toInt(this.dragSrcEl.id)) != undefined){
      this.updatePreDropping();
      let movingElement: DashboardItem = this.items.get(this.toInt(this.dragSrcEl.id));
      const colDiff = movingElement.xEnd - movingElement.xStart;
      const rowDiff = movingElement.yEnd - movingElement.yStart;
      movingElement.xStart = Math.ceil(event.clientX / (this.gridClientX / this.maxColumnsCount));
      movingElement.xEnd = movingElement.xStart + colDiff;
      movingElement.yStart = Math.ceil(event.clientY / (this.gridClientY / this.maxRowsCount));
      movingElement.yEnd = movingElement.yStart + rowDiff;

      console.log('client y',event.clientY,'grid y', this.gridClientY,'max rows',this.maxRowsCount);
      this.items.set(this.toInt(this.dragSrcEl.id), movingElement);
      if(rowDiff > colDiff){
        this.moveConflictingRows(movingElement);
      }
      else{
        this.moveConflictingColumns(movingElement);
      }
    }
  }

  private isConflictingItem(resizingItem: DashboardItem, item: DashboardItem): boolean {
    // console.log('is conflicting',resizingItem,item);
    return ( item.xStart === resizingItem.xStart || item.xEnd === resizingItem.xEnd || (item.xStart < resizingItem.xEnd && item.xEnd > resizingItem.xStart)) &&
      item.yStart < resizingItem.yEnd && item.yEnd > resizingItem.yStart && item.id !== resizingItem.id;
  }

  private toInt(val: any, fallbackValue: number = 0): number {
    const normalized = String(val).replace(/[\D]/g, '');
    const v = Number(normalized);
    return isNaN(v) ? fallbackValue : v;
  }
}


export class DashboardItem {
  id: number;
  xStart: number;
  xEnd: number;
  yStart: number;
  yEnd: number;
  content?: string;
}
