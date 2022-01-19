import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from './../../core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //referenciando a variavel de template 'login' inicializada no form
  @ViewChild('login') login!: NgForm;

  constructor(private authService: AuthService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onSubmit(){
    const email = this.login.value.email as string;
    const password = this.login.value.password as string;

    this.authService.login(email, password).subscribe({
      next: (creds) => {

      },
      error: (err) => {
        let message = 'Ocorreu um erro';
        switch(err.code){
          case 'auth/invalid-email':
            message = 'Email inválido'
          break;
          case 'auth/user-not-found':
            message = 'Usuário não encontrado'
          break;
        }
        this.snackBar.open(message, 'X', {
          duration: 5000,
          horizontalPosition: 'end'
        });
      }
    });
  }

}
