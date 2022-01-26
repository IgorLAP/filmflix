import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, tap } from 'rxjs';

import { MovieTvBase } from './../../core/models/movie-tv-base';
import { TmdbApiService } from './../../core/services/tmdb-api/tmdb-api.service';

@Component({
  selector: 'app-tv-detail',
  templateUrl: './tv-detail.component.html',
  styleUrls: ['./tv-detail.component.scss']
})
export class TvDetailComponent implements OnInit {

  detail$!: Observable<MovieTvBase>
  urlBase: string = 'https://image.tmdb.org/t/p/original/'

  constructor(private route: ActivatedRoute, private tmdbApiService: TmdbApiService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.detail$ = this.tmdbApiService.getDetailById(id, 'tv');
  }

}
