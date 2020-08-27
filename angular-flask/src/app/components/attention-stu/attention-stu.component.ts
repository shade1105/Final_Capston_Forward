import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-attention-stu',
  templateUrl: './attention-stu.component.html',
  styleUrls: ['./attention-stu.component.scss']
})
export class AttentionStuComponent implements OnInit {

  constructor(
  private router: Router,
  private authService: AuthService,
  private flashMessage: FlashMessagesService
  ) { }

  ngOnInit(): void {
  }

  checkLoggedIn() {
  return this.authService.loggedIn();
  }
}
