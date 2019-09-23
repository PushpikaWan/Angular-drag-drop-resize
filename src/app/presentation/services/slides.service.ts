import { Injectable } from '@angular/core';
import { of } from "rxjs";

const slideTypes = ['title', 'list', 'image', 'code', 'html', 'youtube', 'thankyou']

const slide = (type: string, content: any) => ({ type, content })
const slideTitle = (title: string, subtitle: string, optionalList: string[]) => slide('title', { title, subtitle, optionalList })
const slideList = (title: string, items: string[]) => slide('list', { title, items })
const slideImage = (title: string, image: string) => slide('image', { title, image })
const slideCode = (title: string, code: string, language: string) => slide('code', { title, code, language })
const slideHtml = (title: string, html: string) => slide('html', { title, html })
const slideYouTube = (title: string, url: string) => slide('youtube', { title, url })
const slideThankYou = () => slide('thankyou', { });

@Injectable()
export class SlidesService {

  public slides = [
    slideImage(
      'Overview Dashboard layout (POC)',
      'https://angular.io/assets/images/logos/angular/angular.png',
    ),
    //todo add drag drop resize demo here
    slideTitle(
      'Requirements',
      ' A Dashboard layout that can hold widget ',
      ['Draggable', 'Droppable', 'Resizable']
    ),
    //todo url - https://github.com/tiberiuzuld/angular-gridster2
    slideTitle(
      'Background',
      '',
      ['There is a 3rd party library "gridster" provides same features',
        'cannot use 3rd party library due to integration issues in cosmic',
        ' Try to implement drag drop without 3rd party library',
        ' We come up with the 3 different implementations by evolving solution']
    ),
    //todo - add techniques with simple demo
    slideTitle(
      'Implementation - 01',
      '',
      ['Use @angular/cdk/drag-drop library',
        ' List based implementation (horizontally organized vertical list)',
        'No any 3rd party libraries (even if angular @angular/material - not a 3rd party lib)'
      ]
    ),
    slideYouTube(
      'Demo - ( Implementation - 01 )',
      'https://tiberiuzuld.github.io/angular-gridster2/'
    ),
    slideTitle(
      'Limitations ( Implementation - 01 )',
      '',
      ['No Proper way to resize - due to list based implementation',
        'List only organized under same line (vertically or horizontally) - due to list based implementation',
        'Angular CDK drag and drop limitations with wrapping contents when dropped'
      ]
    ),
    //todo - add techniques with simple demo
    slideTitle(
      'Implementation - 02',
      '',
      ['Use @angular/cdk/drag-drop library',
        'use @angular/material grid list (mat-grid-list) and grid-tile (mat-grid-tile)',
        'source - https://material.angular.io/components/grid-list/api'
      ]
    ),
    slideYouTube(
      'Demo - ( Implementation - 02 )',
      'https://tiberiuzuld.github.io/angular-gridster2/'
    ),
    //todo add the addressing issue of implementation - 01
    slideTitle(
      'Limitations ( Implementation - 02 )',
      '',
      [ 'Implementation tightly coupled with @angular/material lib and grid list',
        ' All rearranging and dropping alignment handled by mat-grid-list',
        'Angular CDK drag and drop limitations with wrapping contents when dropped',
      ]
    ),
    //todo - add techniques with simple demo
    slideTitle(
      'Implementation - 03',
      '',
      [' @angular/cdk/drag-drop library not used',
        'Use pure html drag and drop features with angular services',
        ' services for - drag, drop, resize, rearrange and handling movements',
        'source - https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API'
      ]
    ),
    slideYouTube(
      'Demo - ( Implementation - 03 )',
      'https://tiberiuzuld.github.io/angular-gridster2/'
    ),
    slideTitle(
      'Limitations ( Implementation - 03 )',
      '',
      ['Handling all the drag, drop and resize functionalities by using services can provide issues',
        'Need to handle all behaviours by hand without using cdk support',
        'Version handling need to be done by ourselves with angular version updates (to gain performance along with core updates)'
      ]
    ),

    slideHtml(
      'Some HTML code',
      `<div class="text-center">
        <h1>SOME HTML CODE! 😎</h1>
      </div>
      `
    ),
    slideThankYou()
  ];

  public getSlides() {
    return of(this.slides)
  }

  public getSlideTypes() {
    return slideTypes
  }
}
