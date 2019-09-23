import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'
import { AbstractSlideComponent } from '../../common/abstract-slide/abstract-slide.component'

@Component({
  selector: 'app-slide-youtube',
  template: `
    <app-abstract-slide [content]="content">
      <div class="text-center vh-75">
        <iframe width="100%" height="100%" 
            [attr.src]="trustedUrl" allowfullscreen></iframe>
      </div>
    </app-abstract-slide>
  `,
  styles: []
})
export class SlideYoutubeComponent extends AbstractSlideComponent implements OnInit {
  public trustedUrl
  constructor(private sanitizer: DomSanitizer) {
    super()
  }
  ngOnInit() {
    this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.content.url)
  }
}
