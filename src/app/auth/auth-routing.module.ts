import { NgModule } from '@angular/core';
import { canActivate, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

//como o nome diz, redireciona se estiver logado para outra página
const redirectLogged = ()=> redirectLoggedInTo('/');

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    ...canActivate(redirectLogged)
  },
  {
    path: 'signup',
    component: SignupComponent,
    ...canActivate(redirectLogged)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
