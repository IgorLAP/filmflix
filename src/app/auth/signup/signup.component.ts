import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { User } from './../../core/models/user';
import { AuthService } from './../../core/services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  @ViewChild('signup') signup!: NgForm;

  constructor(private authService: AuthService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onSubmit(){
    //pégando todos campos salvos no signup em objeto
    const values = this.signup.value;
    //tipando todos ele pela interface montada 'User'
    const user: User = {
      email: values.email,
      username: values.username,
      birthdate: values.birthdate,
      profile: 'assets/user_default.png'
    };

    //enviando para o metodo de signup, injetado pelo constructor, email, senha e demais necessárias de acordo com a interface 'User'
    this.authService.signup(values.email, values.password, user).subscribe({
      next: (creds) => {},
      error: (err) => {
        this.snackBar.open(err.code, 'X', {
          duration: 5000,
          horizontalPosition: 'end'
        });
      }
    })
  }

}
