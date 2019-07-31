import { Component } from '@angular/core';
import { getColor } from './color-utils';

@Component({
  selector: 'app-test-code-multisize',
  templateUrl: './test-code-multisize.component.html',
  styleUrls: ['./test-code-multisize.component.css']
})
export class TestCodeMultisizeComponent {

  cols: number = 3;
  cardMaxRows: number = 2;

  cards: any[] = [
    { title: 'Card 1', cols: 2, rows: 2, color: getColor()},
    { title: 'Card 2', cols: 1, rows: 1, color: getColor() },
    { title: 'Card 3', cols: 3, rows: 1, color: getColor() },
    { title: 'Card 4', cols: 1, rows: 1, color: getColor() },
    { title: 'Card 5', cols: 1, rows: 1, color: getColor() },
    { title: 'Card 6', cols: 1, rows: 1, color: getColor() },
    { title: 'Card 7', cols: 1, rows: 1, color: getColor() },
    { title: 'Card 8', cols: 1, rows: 1, color: getColor() },
    { title: 'Card 9', cols: 1, rows: 3, color: getColor() },
    { title: 'Card 10', cols: 1, rows: 1, color: getColor() },
    { title: 'Card 11', cols: 1, rows: 1, color: getColor() },
    { title: 'Card 12', cols: 2, rows: 1, color: getColor() },
    { title: 'Card 13', cols: 1, rows: 1, color: getColor() },
    { title: 'Card 14', cols: 1, rows: 1, color: getColor() },
    { title: 'Card 15', cols: 1, rows: 2, color: getColor() },
    { title: 'Card 16', cols: 2, rows: 1, color: getColor() }
   ];

   orderChanged(e: any): void {
     console.log('Order changed: ', e);
   }

   updateCols(val: any): void {
     this.cols = this.toInt(val, 3) || 3;
   }

   updateCardMaxRows(val: any): void {
     this.cardMaxRows = this.toInt(val, 2) || 2;
   }

   private toInt(val: any, fallbackValue: number = 0): number {
     const normalized = String(val).replace(/[\D]/g, '');
     const v = Number(normalized);
     return isNaN(v) ? fallbackValue : v;
   }
}
