import { NgModule } from '@angular/core';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { ProfileComponent } from './profile/profile.component';


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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
