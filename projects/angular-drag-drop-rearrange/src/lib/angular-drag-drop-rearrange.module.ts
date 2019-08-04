import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule, MatCardModule, MatGridListModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import {MinPipe} from './dashboard/min.pipe';



@NgModule({
  declarations: [DashboardComponent,MinPipe],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    DragDropModule,
    MatGridListModule,
    LayoutModule
  ],
  exports: [DashboardComponent]
})
export class AngularDragDropRearrangeModule { }
