import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: 'app-attention-admin',
  templateUrl: './attention-admin.component.html',
  styleUrls: ['./attention-admin.component.scss']
})
export class AttentionAdminComponent implements OnInit {
  admin: any;
  admin_num: number;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
    ) { }

  ngOnInit() {
  }

  checkadmin() {
    this.authService.checkadmin().subscribe(
      token => {
        this.admin = token.admin;
        this.admin_num = token.admin_num
      },
      err => {
        console.log(err)
        return false;
      }
    )
    return this.admin
  }
}
