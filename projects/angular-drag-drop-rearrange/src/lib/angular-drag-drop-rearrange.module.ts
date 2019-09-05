import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule, MatCardModule, MatGridListModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { MinPipe } from './dashboard-customize/min.pipe';
import { DashboardCustomizeComponent } from './dashboard-customize/dashboard-customize.component';

@NgModule({
  declarations: [DashboardCustomizeComponent, MinPipe],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    DragDropModule,
    MatGridListModule,
    LayoutModule
  ],
  exports: [DashboardCustomizeComponent, MinPipe]
})
export class AngularDragDropRearrangeModule { }
