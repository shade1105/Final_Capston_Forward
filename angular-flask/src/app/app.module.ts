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
import { RequestAttentionComponent } from './components/request-attention/request-attention.component';
import { ActionCamComponent } from './components/action-cam/action-cam.component';

import { AuthGuard } from "./guards/auth.guards";
import { JwtModule } from "@auth0/angular-jwt";
import { FlashMessagesModule } from "angular2-flash-messages";
import { FlashMessagesService } from "angular2-flash-messages";
import { ValidateService } from "./services/validate.service";
import { AuthService } from "./services/auth.service";
import { AttentionAdminComponent } from './components/attention-admin/attention-admin.component';
import { AttentionStuComponent } from './components/attention-stu/attention-stu.component';
import { PictureIndexComponent } from './components/picture-index/picture-index.component';
import { SigninAdminComponent } from './components/signin-admin/signin-admin.component';
import { SignupAdminComponent } from './components/signup-admin/signup-admin.component';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SignupComponent,
    SigninComponent,
    RequestAttentionComponent,
    ActionCamComponent,
    AttentionAdminComponent,
    AttentionStuComponent,
    PictureIndexComponent,
    SigninAdminComponent,
    SignupAdminComponent
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
