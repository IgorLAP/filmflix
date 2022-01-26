import { MovieTvBase } from './../../models/movie-tv-base';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

type apiResponse = {
  page: number;
  results: MovieTvBase[];
}

@Injectable({
  providedIn: 'root'
})
export class TmdbApiService {
  private readonly baseUrl = 'https://api.themoviedb.org/3';
  options = {
    api_key: '9f39665e80c9d91b812366f444ae40bf',
    language: 'pt-BR'
  }

  constructor(private http: HttpClient) { }

  trending(): Observable<MovieTvBase[]>{
    //apiResponde para evitar usar any em nossa tipagem http.get e através do pipe e map chegar na chave necessária - results
    return this.http.get<apiResponse>(`${this.baseUrl}/trending/all/week`, {
      params: this.options
    }).pipe(
      //queremos um valor especifico, apena o results para encaixar na tipagem MovieTvBase, sendo assim usamos o map para seleciona-lo
      //tap gera um side effect, modificação em algo recebido é onde poderia usa-lo, igual fiz no victor icoma
      map(data => data.results)
    );
  }

  search(query: string): Observable<MovieTvBase[]>{
    return this.http.get<apiResponse>(`${this.baseUrl}/search/multi`,{
      params: {
        ...this.options,
        include_adult: false,
        query
      }
    }).pipe(
      //ao invés de retornar tudo retornamos apenas o incluso dentro de results, que encaixa com nosso model
      map(data => data.results)
    )
  }

  getDetailById(id: number, type: 'movie' | 'tv'): Observable<MovieTvBase>{
    return this.http.get<MovieTvBase>(`${this.baseUrl}/${type}/${id}`, {
      params: this.options
    });
  }
}
