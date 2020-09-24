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
  token: any;
  admin: boolean;
  admin_num: number;

  constructor(
    private authService: AuthService,
    private router: Router,
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


}
