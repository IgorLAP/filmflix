import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TmdbApiService {
  private readonly baseUrl = 'https://api.themoviedb.org/3/';
  options = {
    apiKey: '9f39665e80c9d91b812366f444ae40bf',
    language: 'pt-BR'
  }

  constructor() { }
}
