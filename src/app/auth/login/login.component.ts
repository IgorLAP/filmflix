import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //referenciando a variavel de template 'login' inicializada no form
  @ViewChild('login') login!: NgForm;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.login.value)
    //TODO: Integrar com AuthService
  }

}
