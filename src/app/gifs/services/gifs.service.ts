import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { GifMapper } from '../mapper/gif.mapper';
import type { Gif } from './../interfaces/gif.interface';

@Injectable({ providedIn: 'root' })
export class GifService {
  private http = inject(HttpClient);

  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(false);
  private trendingPage = signal(0);

  constructor() {
    this.loadTrendingGifs();
  }

  loadTrendingGifs() {
    if (this.trendingGifsLoading()) return;

    this.trendingGifsLoading.set(true);

    this.http
      .get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
        params: {
          api_key: environment.giphyApiKey,
          limit: 20,
          offset: this.trendingPage() * 20,
        },
      })
      .subscribe((resp) => {
        const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
        this.trendingGifs.update((currentGifs) => [...currentGifs, ...gifs]);
        this.trendingPage.update((page) => page + 1);

        this.trendingGifsLoading.set(false);
      });
  }
}
