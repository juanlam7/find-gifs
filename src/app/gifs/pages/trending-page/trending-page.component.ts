import {
  Component,
  ElementRef,
  inject,
  viewChild
} from '@angular/core';
import { GifListComponent } from '../../components/gif-list/gif-list.component';
import { GifService } from '../../services/gifs.service';

@Component({
  selector: 'app-trending-page',
  templateUrl: './trending-page.component.html',
  imports: [GifListComponent],
})
export default class TrendingPageComponent {
  gifService = inject(GifService);

  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

  onScroll(event: Event) {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;

    const scrollTop = scrollDiv.scrollTop;
    const clientHeight = scrollDiv.clientHeight;
    const scrollHeight = scrollDiv.scrollHeight;

    const isAtBottom = scrollTop + clientHeight + 300 >= scrollHeight;

    if (isAtBottom) {
      this.gifService.loadTrendingGifs();
    }
  }
}
