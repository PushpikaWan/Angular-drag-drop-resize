import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'
import { PresentationComponent } from './container/presentation/presentation.component';
import { SlidesService } from './services/slides.service';
import { SlideComponent } from './components/common/slide/slide.component';
import { SlideListComponent } from './components/slides/slide-list/slide-list.component';
import { SlideTitleComponent } from './components/slides/slide-title/slide-title.component';
import { SlideImageComponent } from './components/slides/slide-image/slide-image.component';
import { SlideCodeComponent } from './components/slides/slide-code/slide-code.component';
import { SlideHtmlComponent } from './components/slides/slide-html/slide-html.component';
import { AbstractSlideComponent } from './components/common/abstract-slide/abstract-slide.component';
import { SlideYoutubeComponent } from './components/slides/slide-youtube/slide-youtube.component'
import {SlideThankyouComponent} from "./components/slides/slide-thankyou/slide-thankyou.component";

const routes: Routes = [
  { path: '', component: PresentationComponent },
  { path: ':slideId', component: PresentationComponent },
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    PresentationComponent,
    SlideComponent,
    SlideListComponent,
    SlideTitleComponent,
    SlideImageComponent,
    SlideCodeComponent,
    SlideHtmlComponent,
    AbstractSlideComponent,
    SlideYoutubeComponent,
    SlideThankyouComponent
  ],
  providers: [SlidesService]
})
export class PresentationModule { }
