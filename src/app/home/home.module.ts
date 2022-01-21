import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from './../shared/material/material.module';
import { HomeRoutingModule } from './home-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home.component';


@NgModule({
  declarations: [
    ProfileComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    MaterialModule
  ]
})
export class HomeModule { }
