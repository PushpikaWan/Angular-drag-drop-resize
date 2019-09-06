import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { DashboardViewComponent } from './dashboard-view/dashboard-view.component';

@NgModule({
  declarations: [DashboardViewComponent],
  imports: [
    CommonModule,
    DragDropModule,
    LayoutModule
  ],
  exports: [DashboardViewComponent]
})
export class AngularDragDropRearrangeModule { }
