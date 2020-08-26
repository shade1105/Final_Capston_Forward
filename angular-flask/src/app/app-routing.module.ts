import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NavbarComponent } from './components/navbar/navbar.component'
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { ActionCamComponent } from "./components/action-cam/action-cam.component";
import { RequestAttentionComponent } from './components/request-attention/request-attention.component';


const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "navbar", component: NavbarComponent },
  { path: "signup", component: SignupComponent },
  { path: "signin", component: SigninComponent},
  { path: "req-atten", component: RequestAttentionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
