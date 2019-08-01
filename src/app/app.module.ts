import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MatIconModule, MatButtonModule, MatCardModule, MatGridListModule } from '@angular/material';

import { AppComponent } from './app.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DashboardControlComponent } from './dashboard-control/dashboard-control.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TestCodeComponent } from './test-code/test-code.component';
import { TestCodeMultisizeComponent } from './test-code-multisize/test-code-multisize.component';
import { TestCodeMultisizeDashboardComponent } from './test-code-multisize/test-code-multisize-dashboard/test-code-multisize-dashboard.component';
import { MinPipe } from './test-code-multisize/test-code-multisize-dashboard/min.pipe';
import { LayoutModule } from '@angular/cdk/layout';


@NgModule({
  declarations: [
    AppComponent,
    DashboardControlComponent,
    DashboardComponent,
    TestCodeComponent,
    TestCodeMultisizeComponent,
    TestCodeMultisizeDashboardComponent,
    MinPipe
  ],
  imports: [
    BrowserModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    DragDropModule,
    MatGridListModule,
    LayoutModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
