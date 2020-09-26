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

  token: any;
  admin: boolean;
  admin_num: number;

  constructor(
  private router: Router,
  private authService: AuthService,
  private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {

    this.authService.checkadmin().subscribe(
      token => {
        this.token = token
        this.admin = this.token.admin
        this.admin_num = this.token.admin_num
      },
      err => {
        this.admin = false
      }
    )

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
    return this.authService.loggedIn();
  }

  checkAdmin() {
    return this.authService.checkadmin();
  }


}
