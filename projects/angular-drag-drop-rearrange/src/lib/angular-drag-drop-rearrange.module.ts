import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DragDropModule
  ],
  exports: [DashboardComponent]
})
export class AngularDragDropRearrangeModule { }
