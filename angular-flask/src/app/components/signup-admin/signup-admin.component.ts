import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from "angular2-flash-messages";
import { AuthService } from "../../services/auth.service";
import { ValidateService } from '../../services/validate.service';
import { Router } from "@angular/router";


@Component({
  selector: 'app-signup-admin',
  templateUrl: './signup-admin.component.html',
  styleUrls: ['./signup-admin.component.scss']
})
export class SignupAdminComponent implements OnInit {
  admin_num: number;
  password: string;
  passwordcheck: string;

  constructor(
    private flashMessage: FlashMessagesService,
    private validateService: ValidateService,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit() {}

  onAdminRegister() {
    if (this.password !== this.passwordcheck) {
      console.log("패스워드가 다릅니다");
      this.flashMessage.show("패스워드가 다릅니다. 다시 입력해주세요", {
        cssClass: "alert-danger",
        timeout: 3000
      });
      return false;
    }
    const admin = {
      admin_num: this.admin_num,
      password: this.passwordcheck
    };
    //Require Fileds
    if (!this.validateService.validateAdminRegister(admin)) {
      this.flashMessage.show("모든 필드를 채워주세요", {
        cssClass: "alert-danger",
        timeout: 3000
      });
      return false;
    }

    //Register User
    this.authService.registerAdmin(admin).subscribe(data => {
      if (data.success) {
        this.flashMessage.show("You are now registered and can log in", {
          cssClass: "alert-success",
          timeout: 3000
        });
        this.router.navigate([""]);
      } else {
        this.flashMessage.show(data.msg, {
          cssClass: "alert-danger",
          timeout: 3000
        });
        this.router.navigate(["/signup-admin"]);
      }
    });
  }


}
