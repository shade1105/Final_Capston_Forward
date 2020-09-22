import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";
import { AuthService } from "../../services/auth.service";
import { Attention } from "../../models/Attention";
@Component({
  selector: "app-attention-stu",
  templateUrl: "./attention-stu.component.html",
  styleUrls: ["./attention-stu.component.scss"],
})
export class AttentionStuComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private flashMessage: FlashMessagesService
  ) {}
  fullImagePath: string;
  converted_image: string;
  Attentionlist = [];

  clicked(number) {
    var asd;
    var dsd;
    var usernum;
    var username;
    dsd = localStorage.getItem("user");
    asd = this.Attentionlist[number - 1].date;
    console.log(this.Attentionlist[number - 1].date);
    usernum = JSON.parse(dsd).stu_num;
    username = JSON.parse(dsd).name;
    var cdcd;
    this.authService
      .getImageEncdoe(usernum, username, asd)
      .subscribe((data) => {
        cdcd = data["msg"];
        this.converted_image = "data:image/jpeg;base64," + cdcd;
      });
  }

  checkLoggedIn() {
    return this.authService.loggedIn();
  }
  clickevent(number) {
    var dsd;
    var usernum;
    var asd;
    dsd = localStorage.getItem("user");
    usernum = JSON.parse(dsd).stu_num;
    asd = this.Attentionlist[number - 1].week;
    this.authService.postAttendData(asd, usernum).subscribe();
    // 새로고침 로직 요구
  }
  ngOnInit() {
    var msg;
    this.authService
      .getSubjectData(localStorage.getItem("user"))
      .subscribe((data) => {
        msg = data["msg"];
        for (var i = 0; i < msg.length; i++) {
          var date_form = new Date(msg[i].atten_date);
          var date_str =
            date_form.getFullYear().toString() +
            "." +
            (date_form.getMonth() + 1).toString() +
            "." +
            date_form.getDate().toString();
          this.Attentionlist.push(
            new Attention(msg[i].stu_num, msg[i].week, date_str, msg[i].atten)
          );
        }
      });
  }
}
