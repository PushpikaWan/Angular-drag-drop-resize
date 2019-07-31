import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DashboardControlComponent } from './dashboard-control/dashboard-control.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TestCodeComponent } from './test-code/test-code.component';
import { TestCodeMultisizeComponent } from './test-code-multisize/test-code-multisize.component';
import { TestCodeMultisizeDashboardComponent } from './test-code-multisize/test-code-multisize-dashboard/test-code-multisize-dashboard.component';
import { MinPipe } from './test-code-multisize/test-code-multisize-dashboard/min.pipe';

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
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
