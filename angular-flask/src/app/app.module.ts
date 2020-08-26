import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';


import { AuthGuard } from "./guards/auth.guards";
import { JwtModule } from "@auth0/angular-jwt";
import { FlashMessagesModule } from "angular2-flash-messages";
import { FlashMessagesService } from "angular2-flash-messages";
import { ValidateService } from "./services/validate.service";
import { AuthService } from "./services/auth.service";
import { RequestAttentionComponent } from './components/request-attention/request-attention.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SignupComponent,
    SigninComponent,
    RequestAttentionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlashMessagesModule,
    HttpClientModule,
    FormsModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem("idtoken");
        }
      }
    })

  ],
  providers: [FlashMessagesService, ValidateService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
