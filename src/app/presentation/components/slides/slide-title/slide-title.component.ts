import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-slide-title',
  template: `
    <div class="slide">
      <h1 class="my-5">{{content.title}}</h1>
      <h2 class="my-5">{{content.subtitle}}</h2>
        <ul class="my-5">
            <li *ngFor="let item of content.optionalList"> <h2 class="my-5"> {{item}}</h2> </li>
        </ul>
    </div>
  `,
})
export class SlideTitleComponent {

  @Input() content

}
