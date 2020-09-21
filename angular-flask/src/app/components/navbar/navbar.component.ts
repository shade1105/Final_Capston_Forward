import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
  private router: Router,
  private authService: AuthService,
  private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
  }
  onLogoutClick() {
    this.authService.logout();
    this.flashMessage.show("Logout", {
      cssClass: "alert-success",
      timeout: 3000
    });
    this.router.navigate([""]);
    return false;
  }
  //로그인되어있으면 true반환
  checkLoggedIn() {
    console.log(this.authService.loggedIn())
    return this.authService.loggedIn();
  }


}
