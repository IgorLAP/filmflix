import { Component, Input, OnInit } from '@angular/core';

import { MovieTvBase } from './../../../core/models/movie-tv-base';

@Component({
  selector: 'app-result-tile',
  templateUrl: './result-tile.component.html',
  styleUrls: ['./result-tile.component.scss']
})
export class ResultTileComponent implements OnInit {

  @Input() result!: MovieTvBase;

  readonly PLACEHOLDER = 'http://www.mdtop.com.br/wp-content/uploads/2021/01/placeholder-images-image_large.png';

  constructor() { }

  ngOnInit(): void {
  }

  createImageLink(poster: string){
    if(poster){
      return `https://image.tmdb.org/t/p/w300/${poster}`;
    }
    return this.PLACEHOLDER;
  }

}
