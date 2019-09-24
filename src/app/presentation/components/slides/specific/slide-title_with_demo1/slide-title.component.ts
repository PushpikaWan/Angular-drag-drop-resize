import { AfterViewInit, Component, Input } from '@angular/core';

@Component({
  selector: 'app-slide-title_demo1',
  template: `
    <div style="display: flex; grid-template-columns: 1fr 1fr">
        <div>
            <div class="slide">
                <h1 class="my-5">{{content.title}}</h1>
                <h2 class="my-5">{{content.subtitle}}</h2>
                <div style="display: inline">
                    <ul class="my-5">
                        <li *ngFor="let item of content.optionalList"> <h2 class="my-5"> {{item}}</h2> </li>
                    </ul>
                </div>
                <div [innerHtml]="content.html"></div>
            </div>
        </div>
        <div style="position: relative; top: 250px; left:200px">
            <app-figure-drag-simple></app-figure-drag-simple>
        </div>
    </div>
  `,
})
export class SlideTitleComponentDemo1 implements AfterViewInit {

  @Input() content;
  ngAfterViewInit() {
    console.clear();
    console.log('============ Notes ========');
    this.content.notes.forEach(
      x => console.log(x)
    );
    console.log('===========================');
  }
}
