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
  token: any;
  admin: boolean;
  admin_num: number;

  constructor(
    private router: Router,
    private authService: AuthService,
    private flashMessage: FlashMessagesService
  ) {}
  fullImagePath: string;
  converted_image: string;
  Attentionlist = [];
  stu_atten_date: string;
  selectebox: string = "";
  selectChangeHandler(event: any, number) {
    var attenupdate;
    this.selectebox = event.target.value;
    console.log(this.selectebox);
    console.log(typeof this.selectebox);
    var asd;
    var dsd;
    var usernum;
    var username;
    dsd = localStorage.getItem("user");
    usernum = JSON.parse(dsd).stu_num;
    username = JSON.parse(dsd).name;
    console.log(usernum, username, number);
    attenupdate = {
      week: number,
      usernum: usernum,
      username: username,
      attenupdate: this.selectebox,
    };
    //TODO POST 요청할때 오류가 뜨네  왜 그런걸까
    //수정하고 새로고침하고 페이지 reload 해줘야함 
    this.authService.updateAdminAtten(attenupdate).subscribe();
  }
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

    /*
     ** 생성자가 호출될 때 배열에대한 날짜 포멧에 따라
     ** 초기화해서 생성해줌
     ** input : null
     ** return : null
     ** author  : 이재현
     */
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

  clicked(number) {
    /*
     ** 해당 버튼클릭시 number에 반환하는 값을 이미지형식으로 보여줌
     ** input : number(week)
     ** return : image
     ** author  : 이재현
     */
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
    this.authService.getImageEncode(usernum, username, asd).subscribe(data => {
      cdcd = data.image;
      this.stu_atten_date = data.stu_atten_date
      this.converted_image = "data:image/jpeg;base64," + cdcd;
    });
  }

  clickevent(number) {
    //현재 날짜 체크해서 출석 가능/불가능 확인 알고리즘 추가
    /*
     ** 해당 버튼클릭시 number에 반환하는 값에 action-cam 을 실행하여
     ** 출석 로직을 실행
     ** input : number(week)
     ** return : null
     ** author  : 이재현
     */
    var dsd;
    var usernum;
    var asd;
    dsd = localStorage.getItem("user");
    usernum = JSON.parse(dsd).stu_num;
    asd = this.Attentionlist[number - 1].week;
    this.authService.postAttendData(asd, usernum).subscribe();
    localStorage.setItem("number", number);
    this.router.navigate(["action-cam"]);
  }

  checkLoggedIn() {
    return this.authService.loggedIn();
  }
}
