import { Component, input } from '@angular/core';
import type { Gif } from '../../../interfaces/gif.interface';

@Component({
  selector: 'gif-list-item',
  templateUrl: './gif-list-item.component.html',
})
export class GifListItemComponent {
  gif = input.required<Gif>();
}
