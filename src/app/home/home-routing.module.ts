import { NgModule } from '@angular/core';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { ProfileComponent } from './profile/profile.component';
import { TvDetailComponent } from './tv-detail/tv-detail.component';


//redireciona os não logados
const redirectUnauthorized = ()=> redirectUnauthorizedTo(['/login'])

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    ...canActivate(redirectUnauthorized)
  },
  {
    path: 'movie/:id',
    component: MovieDetailComponent
  },
  {
    path: 'tv/:id',
    component: TvDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
