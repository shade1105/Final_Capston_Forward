import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from "../../services/auth.service";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  stu_num: number;
  name: string;
  email: string;
  password: string;
  passwordcheck: string;

  constructor(
  private flashMessage: FlashMessagesService,
  private validateService: ValidateService,
  private authService: AuthService,
  private router: Router
  ) { }

  ngOnInit() {
  }
  onRegisterSubmit() {
    if (this.password !== this.passwordcheck) {
      console.log("패스워드가 다릅니다");
      this.flashMessage.show("패스워드가 다릅니다. 다시 입력해주세요", {
        cssClass: "alert-danger",
        timeout: 3000
      });
      return false;
    }
    const user = {
      stu_num: this.stu_num,
      name: this.name,
      email: this.email,
      password: this.passwordcheck
    };

    //Require Fileds
    if (!this.validateService.validateRegister(user)) {
      this.flashMessage.show("모든 필드를 채워주세요", {
        cssClass: "alert-danger",
        timeout: 3000
      });
      return false;
    }
    //Validate Email
    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show("유효한 이메일 주소를 입력하세요", {
        cssClass: "alert-danger",
        timeout: 3000
      });
      return false;
    }

    //Register User
    this.authService.registerUser(user).subscribe(data => {
      if (data.success) {
        this.flashMessage.show("등록한 정보로 로그인이 가능합니다", {
          cssClass: "alert-success",
          timeout: 3000
        });
        this.router.navigate(["/signin"]);
      } else {
        this.flashMessage.show(data.msg, {
          cssClass: "alert-danger",
          timeout: 3000
        });
        this.router.navigate(["/signup"]);
      }
    });

  }
}
