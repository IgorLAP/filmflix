import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './core/components/not-found/not-found.component';

const routes: Routes = [
  // autenticação de login e signup apartir da barra /login e /signup
  {
    path: '',
    loadChildren: ()=> import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: '',
    loadChildren: ()=> import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
