import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-slide-image',
  template: `
    <div class="slide" 
         style="
         background-position: center;
         background-repeat: no-repeat;
         background-size: cover;
         height: 100%;
         margin: 0;
         box-sizing: border-box;
         background-image: url('https://material-design.storage.googleapis.com/publish/v_2/material_ext_publish/0Bx4BSt6jniD7OVlEaXZ5YmU1Xzg/components_grids_usage2.png')">
      <h1 class="my-5" style="text-align: center; background-color: white; padding-bottom:50px">{{content.title}}</h1>
      <div class="my-5 text-center">
        <img class="img-fluid" [attr.src]="content.image" />
      </div>
    </div>
  `,
  styles: []
})
export class SlideImageComponent {

  @Input() content

}
