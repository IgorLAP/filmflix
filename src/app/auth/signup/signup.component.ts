import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  @ViewChild('signup') signup!: NgForm;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.signup.value);
  }

}
