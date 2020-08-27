import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"]
})
export class SigninComponent implements OnInit {
  stu_num: number;
  password: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }
  ngOnInit() { }

  onLoginSubmit() {
    const signin = {
      stu_num: this.stu_num,
      password: this.password
    };
    this.authService.authenticateUser(signin).subscribe(data => {
      if (data.success) {
        this.authService.storeUserData(data.token, data.user);
        this.flashMessage.show(data.msg, {
          cssClass: "alert-success",
          timeout: 5000
        });
        this.router.navigate([""]);
      } else {
        this.flashMessage.show(data.msg, {
          cssClass: "alert-danger",
          timeout: 5000
        });
        this.router.navigate(["/signin"]);
      }
    });
  }
}
