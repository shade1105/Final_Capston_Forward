import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: 'app-signin-admin',
  templateUrl: './signin-admin.component.html',
  styleUrls: ['./signin-admin.component.scss']
})
export class SigninAdminComponent implements OnInit {
  admin_num: number;
  password: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
    ) { }

  ngOnInit() { }


   onLoginAdminSubmit() {
      const signinadmin = {
        admin_num: this.admin_num,
        password: this.password
      };
      this.authService.authenticateAdmin(signinadmin).subscribe(data => {
        if (data.success) {
        this.authService.storeUserData(data.token, data.admin);
        this.flashMessage.show(data.msg, {
          cssClass: "alert-success",
          timeout: 3000
        });
        this.router.navigate([""]);

      } else {
        this.flashMessage.show(data.msg, {
          cssClass: "alert-danger",
          timeout: 3000
        });
        this.router.navigate(["/signin-admin"]);
      }
      })

   }



}
