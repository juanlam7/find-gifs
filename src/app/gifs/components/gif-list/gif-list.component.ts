import { Component, computed, input } from '@angular/core';
import { GifListItemComponent } from './gif-list-item/gif-list-item.component';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'gif-list',
  imports: [GifListItemComponent],
  templateUrl: './gif-list.component.html',
})
export class GifListComponent {
  gifs = input.required<Gif[]>();

  trendingGifGroup = computed<Gif[][]>(() => {
    const groups = [];
    for (let i = 0; i < this.gifs().length; i += 3) {
      groups.push(this.gifs().slice(i, i + 3));
    }

    return groups;
  });
}
