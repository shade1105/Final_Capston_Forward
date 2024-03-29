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
  this.authService.checkadmin().subscribe(
      (token) => {
        this.token = token;
        this.admin = this.token.admin;
        this.admin_num = this.token.admin_num;
      },
      (err) => {
        this.admin = false;
      }
    );

    // TODO 이미지 공간에있는저건 어떻게 처리해아할까 흠 ..
    // TODO 출석버튼 대신에 관리자가 출석을 직접적으로 출석시키는방식
    var atten_data
    this.authService.getAttenData(1).subscribe(data => {
      atten_data = data["data"];
      for (var i = 0; i < atten_data.length; i++){
        this.adminAttenlist.push(
          new adminAtten(i+1, atten_data[i].name, atten_data[i].stu_num, atten_data[i].atten)
        )
      }
    })

  }
  clickevent(number) {
    var bc;
    var ds;
    bc = this.adminAttenlist[number - 1];

    ds = {
      name: bc["_username"],
      stu_num: bc["_usernumber"],
    };
    console.log(ds);
    localStorage.setItem("user", JSON.stringify(ds));
    this.router.navigate(["attention-stu"]);
  }

  selectWeek(event: any){
    this.adminAttenlist = [];
    var atten_data
    this.authService.getAttenData(event.target.value).subscribe(data => {
      atten_data = data["data"];
      for (var i = 0; i < atten_data.length; i++){
        this.adminAttenlist.push(
          new adminAtten(i+1, atten_data[i].name, atten_data[i].stu_num, atten_data[i].atten)
        )
      }
    })
  }
}
