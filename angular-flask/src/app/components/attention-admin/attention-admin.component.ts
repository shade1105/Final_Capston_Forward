import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";
import { adminAtten } from "../../models/adminAtten";
@Component({
  selector: "app-attention-admin",
  templateUrl: "./attention-admin.component.html",
  styleUrls: ["./attention-admin.component.scss"],
})
export class AttentionAdminComponent implements OnInit {
  token: any;
  admin: boolean;
  admin_num: number;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) {}
  adminAttenlist = [];

  ngOnInit() {
    // TODO 머리아프다 ....
    // 클릭해서 유저 출결 화면 으로 이동해버리자... 
    var msg;
    this.authService.getAlluserData().subscribe((data)=> {
      msg = data["msg"];
      for (var i = 0 ; i <msg.length; i++){
          this.adminAttenlist.push(new adminAtten(i+1,msg[i].name,msg[i].stu_num))
      }
    });
    console.log(msg)

    this.authService.checkadmin().subscribe(
      (token) => {
        this.token = token;
        this.admin = this.token.admin;
        this.admin_num = this.token.admin_num;
      },
      (err) => {
        return false;
      }
    );
    console.log(this.adminAttenlist);
  }
}
