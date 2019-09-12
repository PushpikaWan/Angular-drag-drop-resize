import { Component, Renderer2 } from '@angular/core';
import { DashboardControllingService } from './dashboard-controlling.service';
import { Target } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

// todo - heights are difference when for same row sizes

export class AppComponent {
  title = 'angular-drag-drop-resize';
  items: Map<number, DashboardItem> = new Map();
  private dragSrcEl: Target = null;
  private innerHTML: string;
  private overTarget: Target = null;

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
        console.log(changingItem);
        this..detectChanges();
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
    const data = ev.dataTransfer.getData('text');
  }

  handleDragOver(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData('text');
    ev.dataTransfer.dropEffect = 'move';
  }

  handleDragEnter(ev) {
    ev.preventDefault();
    this.overTarget = ev.target;
    if (this.overTarget && this.dragSrcEl && this.items.get(this.toInt(this.overTarget.id)) !== undefined && this.items.get(this.toInt(this.overTarget.id)) !== undefined) {
      // console.log('drop in ', this.items.get(this.dragSrcEl.id), 'to', this.items.get(this.overTarget.id));
      const dragSrcElement: DashboardItem = this.items.get(this.toInt(this.dragSrcEl.id));
      const dragOverElement: DashboardItem = this.items.get(this.toInt(this.overTarget.id));

      const colDiff = dragSrcElement.xEnd - dragSrcElement.xStart;
      const rowDiff = dragSrcElement.yEnd - dragSrcElement.yStart;
      const isRowSpecificChange = Math.abs(dragSrcElement.xStart - dragOverElement.xStart) < Math.abs(dragSrcElement.yStart - dragOverElement.yStart);
      dragSrcElement.xStart = dragOverElement.xStart;
      dragSrcElement.xEnd =  dragOverElement.xStart + colDiff;
      dragSrcElement.yStart = dragOverElement.yStart;
      dragSrcElement.yEnd = dragOverElement.yStart + rowDiff;

      this.items.set(this.toInt(this.dragSrcEl.id), dragSrcElement);
      if (isRowSpecificChange) {
        this.moveConflictingRows(dragSrcElement);
      } else {
        this.moveConflictingColumns(dragSrcElement);
      }
    }
  }

  handleDragLeave(ev) {
    ev.preventDefault();
    this.overTarget = null;
  }

  handleDragStart(event) {
    this.renderer.setStyle(event.target, 'opacity', '0.4');
    this.dragSrcEl = event.target;

    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text', event.target.id);
  }

  handleDragEnd(event) {
    this.renderer.setStyle(event.target, 'opacity', '1.0');
  }

  private isConflictingItem(resizingItem: DashboardItem, item: DashboardItem): boolean {
    return item.xStart < resizingItem.xEnd && item.xEnd > resizingItem.xStart && item.yStart < resizingItem.yEnd && item.yEnd > resizingItem.yStart && item.id !== resizingItem.id;
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
