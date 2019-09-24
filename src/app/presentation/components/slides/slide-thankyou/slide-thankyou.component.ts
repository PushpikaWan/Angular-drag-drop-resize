import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'
import { AbstractSlideComponent } from '../../common/abstract-slide/abstract-slide.component'

@Component({
  selector: 'app-slide-thankyou',
  template: `<div class="jumbotron text-center">
      <h1 class="display-3">Thank You!</h1>
<!--      <p class="lead"><strong>Please check your email</strong> for further instructions on how to complete your account setup.</p>-->
<!--      <hr>-->
<!--      <p>-->
<!--          Having trouble? <a href="">Contact us</a>-->
<!--      </p>-->
<!--      <p class="lead">-->
<!--          <a class="btn btn-primary btn-sm" href="https://bootstrapcreative.com/" role="button">Continue to homepage</a>-->
<!--      </p>-->
  </div>
  `,
  styles: []
})
export class SlideThankyouComponent extends AbstractSlideComponent implements OnInit {
  public trustedUrl
  constructor(private sanitizer: DomSanitizer) {
    super();
  }
  ngOnInit() {
    this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.content.url)
  }
}
