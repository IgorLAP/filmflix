import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MovieTvBase } from 'src/app/core/models/movie-tv-base';

import { TmdbApiService } from './../../core/services/tmdb-api/tmdb-api.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {

  detail$!: Observable<MovieTvBase>;
  urlBase: string = 'https://image.tmdb.org/t/p/original/'

  constructor(private route: ActivatedRoute, private tmdbApiService: TmdbApiService) { }

  ngOnInit(): void {
    //pegando o momento da rota, pegando parametros passados pela rota
    const id: number = this.route.snapshot.params['id'];
    this.detail$ = this.tmdbApiService.getDetailById(id, 'movie');
  }

}
