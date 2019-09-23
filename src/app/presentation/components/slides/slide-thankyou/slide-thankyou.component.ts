import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'
import { AbstractSlideComponent } from '../../common/abstract-slide/abstract-slide.component'

@Component({
  selector: 'app-slide-thankyou',
  template: `
      .heart ❤
      .text
      p T
      p H
      p A
      p N
      p K
      p &nbsp;
      p Y
      p 0
      p U
  `,
  styles: []
})
export class SlideThankyouComponent extends AbstractSlideComponent implements OnInit {
  public trustedUrl
  constructor(private sanitizer: DomSanitizer) {
    super()
  }
  ngOnInit() {
    this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.content.url)
  }
}
