import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AngularDragDropRearrangeModule } from 'projects/angular-drag-drop-rearrange/src/public-api';
import { DashboardControlComponent } from './dashboard-control/dashboard-control.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardControlComponent
  ],
  imports: [
    BrowserModule,
    AngularDragDropRearrangeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
