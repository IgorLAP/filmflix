import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { catchError, debounceTime, distinctUntilChanged, filter, from, fromEvent, Observable, tap } from 'rxjs';

import { MovieTvBase } from '../core/models/movie-tv-base';
import { TmdbApiService } from './../core/services/tmdb-api/tmdb-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  trending$!: Observable<MovieTvBase[]>;
  results$?: Observable<MovieTvBase[]>;
  readonly PLACEHOLDER = 'http://www.mdtop.com.br/wp-content/uploads/2021/01/placeholder-images-image_large.png';

  //ElementRef - referência ao elemento html
  @ViewChild('searchInput') searchInput!: ElementRef;

  constructor(private tmdbApiService: TmdbApiService) { }

  ngOnInit(): void {
    this.trending$ = this.tmdbApiService.trending().pipe(
      catchError((err => {
        console.log(err)
        return from ([])
      }))
    )
  }

  ngAfterViewInit(): void {
    //addEventListener do rxjs
    //passa o elemento e o evento ligado a ele
    fromEvent(this.searchInput.nativeElement, 'keyup')
    .pipe(
      //filtrar coisas não validas - ' ', null, undefinied
      filter(Boolean),
      //se um segundo valor for emitido, nesse intervalo de tempo, ele espera | evitar variadas requisições para API
      debounceTime(500),
      //evita emitir valores repetidos
      distinctUntilChanged(),
      tap(()=>{
        const query = this.searchInput.nativeElement.value;
        if(query){
          this.results$ = this.tmdbApiService.search(query);
        } else {
          this.results$ = undefined;
        }
      })
    ).subscribe();
  }

  createImageLink(poster: string){
    if(poster){
      return `https://image.tmdb.org/t/p/w300/${poster}`;
    }
    return this.PLACEHOLDER;
  }

}
