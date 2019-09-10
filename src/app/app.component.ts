import { Component, Renderer2 } from '@angular/core';
import { DashboardControllingService } from './dashboard-controlling.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

// todo - heights are difference when for same row sizes

export class AppComponent {
  title = 'angular-drag-drop-resize';
  items: DashboardItem[];
  dragSrcEl = null;
  private innerHTML: string;

  constructor(private dashboardControllingService: DashboardControllingService, private renderer: Renderer2) {
    this.items = [
      {id: 1, xStart: 1, xEnd: 2, yStart: 1, yEnd: 2},
      {id: 2, xStart: 2, xEnd: 4, yStart: 1, yEnd: 3},
      {id: 3, xStart: 4, xEnd: 5, yStart: 1, yEnd: 2},
      {id: 4, xStart: 1, xEnd: 2, yStart: 2, yEnd: 5},
      {id: 5, xStart: 2, xEnd: 3, yStart: 3, yEnd: 5},
      {id: 6, xStart: 3, xEnd: 4, yStart: 3, yEnd: 5}
    ];
  }

  updateCols(index: number, newColumnValue: any) {
    // todo index use may introduce error, use id instead of
    this.items[index].xEnd = this.items[index].xStart + this.toInt(newColumnValue);
    this.moveConflictingColumns(this.items[index]);
  }

  updateRows(index: number, newRowValue: any) {
    // todo index use may introduce error, use id instead of
    this.items[index].yEnd = this.items[index].yStart + this.toInt(newRowValue);
    this.moveConflictingRows(this.items[index]);
  }

  /**
   * This function is used to arrange other conflicting blocks when resizing columns of elements
   * @param resizingItem - item that changed positions
   */
  private moveConflictingColumns(resizingItem: DashboardItem) {
    this.items
      .filter(item => this.isConflictingItem(resizingItem, item))
      .forEach((val) => {
        const diff = resizingItem.xEnd - val.xStart;
        val.xStart += diff;
        val.xEnd += diff;
        // recursion
        return this.moveConflictingColumns(val);
      });
  }

  /**
   * This function is used to arrange other conflicting blocks when resizing rows of elements
   * @param resizingItem - item that changed positions
   */
  private moveConflictingRows(resizingItem: DashboardItem) {
    this.items
      .filter(item => this.isConflictingItem(resizingItem, item))
      .forEach((val) => {
        const diff = resizingItem.yEnd - val.yStart;
        val.yStart += diff;
        val.yEnd += diff;
        // recursion
        return this.moveConflictingRows(val);
      });
  }

  handleDragStart(event) {
    console.log('drag start');
    this.renderer.setStyle(event.target, 'opacity', '0.4');
    this.dragSrcEl = this;

    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text', this.innerHTML);
  }

  handleDragEnd(event) {
    console.log('drag stop');
    this.renderer.setStyle(event.target, 'opacity', '1.0');
  }

  handleDragOver(event) {
    if (event.preventDefault) {
      console.log('drag over', event);
      event.preventDefault(); // Necessary. Allows us to drop.
    }
    event.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
    return false;
  }

  handleDragEnter(event) {
    console.log('drag enter');
    // this / e.target is the current hover target.
    // this.classList.add('over');
  }

  handleDragLeave(event) {
    console.log('drag leave');
   // this / e.target is previous target element.
    // this.classList.remove('over');
  }

  handleDrop(e) {
    // this/e.target is current target element.

    if (e.stopPropagation) {
      e.stopPropagation(); // Stops some browsers from redirecting.
    }

    // Don't do anything if dropping the same column we're dragging.
    if (this.dragSrcEl !== this) {
      // Set the source column's HTML to the HTML of the column we dropped on.
      this.dragSrcEl.innerHTML = this.innerHTML;
      this.innerHTML = e.dataTransfer.getData('text');
      console.log('drop into');
    }

    return false;
  }

  drop(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    console.log('data',data);
    console.log('id',document.getElementById(data));
    ev.target.appendChild(document.getElementById(data));
    // ev.target.replaceChild(document.getElementById(data));
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
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
