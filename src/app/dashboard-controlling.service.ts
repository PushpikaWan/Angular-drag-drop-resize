import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { DashboardItem } from './app.component';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DashboardControllingService {

  items: Map<number, DashboardItem> = new Map();
  private dragSrcEl: HTMLDivElement = null;
  private overTarget: HTMLDivElement = null;
  private gridClientX: number;
  private gridClientY: number;
  private maxColumnsCount = 8; // this is static can only change by css
  private maxRowsCount = 0;
  private renderer: Renderer2;
  public dashboardItemsDataChanged = new Subject();

  private static isConflictingItem(resizingItem: DashboardItem, item: DashboardItem): boolean {
    // console.log('is conflicting',resizingItem,item);
    return (item.xStart === resizingItem.xStart || item.xEnd === resizingItem.xEnd ||
            (item.xStart < resizingItem.xEnd && item.xEnd > resizingItem.xStart)) &&
           item.yStart < resizingItem.yEnd && item.yEnd > resizingItem.yStart && item.id !== resizingItem.id;
  }

  private static toInt(val: any, fallbackValue: number = 0): number {
    const normalized = String(val).replace(/[\D]/g, '');
    const v = Number(normalized);
    return isNaN(v) ? fallbackValue : v;
  }

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  public updateCols(index: number, newColumnValue: any) {
    const resizingElement: DashboardItem = this.items.get(index);
    resizingElement.xEnd = this.items.get(index).xStart + DashboardControllingService.toInt(newColumnValue);
    this.updateDashboardItems(index, resizingElement);
    this.moveConflictingColumns(this.items.get(index));
  }

  public updateRows(index: number, newRowValue: any) {
    const resizingElement: DashboardItem = this.items.get(index);
    resizingElement.yEnd = this.items.get(index).yStart + DashboardControllingService.toInt(newRowValue);
    this.updateDashboardItems(index, resizingElement);
    this.moveConflictingRows(this.items.get(index));
  }

  public loadDashboard(dashboardItems: Map<number, DashboardItem>) {
    this.items = dashboardItems;
    this.dashboardItemsDataChanged.next(this.items);
  }

  public handleDrop(event) {
    if (event.stopPropagation) {
      event.stopPropagation(); // Stops some browsers from redirecting.
    }
    event.preventDefault();
    // const data = event.dataTransfer.getData('text');
  }

  public handleDragOver(event) {
    event.preventDefault();
    // const data = event.dataTransfer.getData('text');
    event.dataTransfer.dropEffect = 'move';
  }

  public handleDragEnter(event) {
    event.preventDefault();
    // this.overTarget = event.target;
    // if (this.overTarget && this.dragSrcEl && this.items.get(this.toInt(this.overTarget.id))
    // !== undefined && this.items.get(this.toInt(this.overTarget.id)) !== undefined) {
    //   const dragSrcElement: DashboardItem = this.items.get(this.toInt(this.dragSrcEl.id));
    //   const dragOverElement: DashboardItem = this.items.get(this.toInt(this.overTarget.id));
    //
    //   const colDiff = dragSrcElement.xEnd - dragSrcElement.xStart;
    //   const rowDiff = dragSrcElement.yEnd - dragSrcElement.yStart;
    //   const isRowSpecificChange =
    //   Math.abs(dragSrcElement.xStart - dragOverElement.xStart) < Math.abs(dragSrcElement.yStart - dragOverElement.yStart);
    //   dragSrcElement.xStart = dragOverElement.xStart;
    //   dragSrcElement.xEnd =  dragOverElement.xStart + colDiff;
    //   dragSrcElement.yStart = dragOverElement.yStart;
    //   dragSrcElement.yEnd = dragOverElement.yStart + rowDiff;
    //
    //   this.updateDashboardItems(this.toInt(this.dragSrcEl.id), dragSrcElement);
    //   if (isRowSpecificChange) {
    //     this.moveConflictingRows(dragSrcElement);
    //   } else {
    //     this.moveConflictingColumns(dragSrcElement);
    //   }
    // }
  }

  public handleDragLeave(event) {
    event.preventDefault();
    this.overTarget = null;
  }

  public handleDragStart(event) {
    this.renderer.setStyle(event.target, 'opacity', '0.4');
    this.dragSrcEl = event.target;
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text', event.target.id);
  }

  public handleDragEnd(event) {
    this.renderer.setStyle(event.target, 'opacity', '1.0');
    // todo check column is enough to drop there and add extra logic to move others
    if (this.dragSrcEl && this.items.get(DashboardControllingService.toInt(this.dragSrcEl.id)) !== undefined) {
      this.updatePreDropping();
      const movingElement: DashboardItem = this.items.get(DashboardControllingService.toInt(this.dragSrcEl.id));
      const colDiff = movingElement.xEnd - movingElement.xStart;
      const rowDiff = movingElement.yEnd - movingElement.yStart;
      movingElement.xStart = Math.ceil(event.clientX / (this.gridClientX / this.maxColumnsCount));
      movingElement.xEnd = movingElement.xStart + colDiff;
      movingElement.yStart = Math.ceil(event.clientY / (this.gridClientY / this.maxRowsCount));
      movingElement.yEnd = movingElement.yStart + rowDiff;

      console.log('client y', event.clientY, 'grid y', this.gridClientY, 'max rows', this.maxRowsCount);
      this.updateDashboardItems(DashboardControllingService.toInt(this.dragSrcEl.id), movingElement);
      if (rowDiff > colDiff) {
        this.moveConflictingRows(movingElement);
      } else {
        this.moveConflictingColumns(movingElement);
      }
    }
  }

  /**
   * This function is used to arrange other conflicting blocks when resizing columns of elements
   * @param resizingItem - item that changed positions
   */
  private moveConflictingColumns(resizingItem: DashboardItem) {
    Array.from(this.items.values())
      .filter(item => DashboardControllingService.isConflictingItem(resizingItem, item))
      .forEach((val) => {
        const diff = resizingItem.xEnd - val.xStart;
        const changingItem: DashboardItem = this.items.get(val.id);
        changingItem.xStart += diff;
        changingItem.xEnd += diff;
        this.updateDashboardItems(val.id, changingItem);
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
      .filter(item => DashboardControllingService.isConflictingItem(resizingItem, item))
      .forEach((val) => {
        const diff = resizingItem.yEnd - val.yStart;
        const changingItem: DashboardItem = this.items.get(val.id);
        changingItem.yStart += diff;
        changingItem.yEnd += diff;
        this.updateDashboardItems(val.id, changingItem);
        // recursion
        return this.moveConflictingRows(changingItem);
      });
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
        if (value.yEnd - 1 > this.maxRowsCount) {
          this.maxRowsCount = value.yEnd - 1;
        }
      });
  }

  private updateDashboardItems(id: number, dashboardItem: DashboardItem) {
    this.items.set(id, dashboardItem);
    this.dashboardItemsDataChanged.next(this.items);
  }
}
