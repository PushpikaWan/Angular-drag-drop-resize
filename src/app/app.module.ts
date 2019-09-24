import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {UiModule} from "./ui/ui.module";
import {AppRoutingModule} from "./app-routing.module";
import { FigureDragSimpleComponent } from './figures/figure-drag-simple/figure-drag-simple.component';

@NgModule({
  declarations: [
    AppComponent,
    FigureDragSimpleComponent
  ],
  imports: [
    BrowserModule,
    UiModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
