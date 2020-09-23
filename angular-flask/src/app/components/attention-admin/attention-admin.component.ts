import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";
import { adminAtten} from "../../models/adminAtten";
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
    adminAttenlist= [new adminAtten(1,"Leejaehyun",91514892),
                     new adminAtten(2,"Soulkey",33234),
                     new adminAtten(3,'Test는이렇게',443),
                     new adminAtten(4, "특수문자도가능?★",445)];    

  ngOnInit() {
    this.authService.checkadmin().subscribe(
      token => {
        this.token = token
        this.admin = this.token.admin
        this.admin_num = this.token.admin_num
      },
      err => {
        return false
      }
    )
    console.log(this.adminAttenlist)
  }


}
