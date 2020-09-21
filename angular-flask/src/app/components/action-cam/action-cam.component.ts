import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";

@Component({
  selector: "app-action-cam",
  templateUrl: "./action-cam.component.html",
  styleUrls: ["./action-cam.component.scss"],
})
export class ActionCamComponent implements OnInit {
  @ViewChild("video", { static: true }) videoElement: ElementRef;
  @ViewChild("canvas", { static: true }) canvas: ElementRef;
  stu_num: number;
  name: string;
  email: string;


  constructor(private renderer: Renderer2,
  private authService: AuthService,
  private router: Router,
  private flashMessage: FlashMessagesService
) {}
  constraints = {
    video: {
      facingMode: "environment",
      width: { ideal: 4096 },
      height: { ideal: 2160 },
    },
  };
  videoWidth = 0;
  videoHeight = 0;
  /*
    ** HTML 상에서 Cam 에서 받은 이미지를 저장하는 로직 
    ** input : null
    ** return : saveImage
    ** author  : 이재현
    */
  startcamera() {
    if (!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
      navigator.mediaDevices
        .getUserMedia(this.constraints)
        .then(this.attachVideo.bind(this))
        .catch(this.handleError);
    } else {
      alert("Sorry, camera not available.");
    }
  }

  handleError(error) {
    console.log("Error: ", error);
  }
  attachVideo(stream) {
    this.renderer.setProperty(
      this.videoElement.nativeElement,
      "srcObject",
      stream
    );
    this.renderer.listen(this.videoElement.nativeElement, "play", (event) => {
      this.videoHeight = this.videoElement.nativeElement.videoHeight;
      this.videoWidth = this.videoElement.nativeElement.videoWidth;
    });
  }
  capture() {
    this.renderer.setProperty(
      this.canvas.nativeElement,
      "width",
      this.videoWidth
    );
    this.renderer.setProperty(
      this.canvas.nativeElement,
      "height",
      this.videoHeight
    );
    this.canvas.nativeElement
      .getContext("2d")
      .drawImage(this.videoElement.nativeElement, 0, 0);
  }

  saveas() {
    var encodeImage = this.canvas.nativeElement.toDataURL("image/png");
    const jsonEncodeImage = JSON.stringify(encodeImage);
    const data = {
    user: localStorage.getItem('user'),
    'image': JSON.stringify(encodeImage)
    }

    this.authService.sendImageDecode(data).subscribe(data => {
      if (data.success) {
        var dsd;
        var usernum;
        var asd;
        dsd = localStorage.getItem("user");
        usernum = JSON.parse(dsd).stu_num;
        asd = localStorage.getItem("number")
        this.authService.postAttendData(asd, usernum).subscribe();
        localStorage.removeItem('number')
        this.flashMessage.show(data.msg, {
          cssClass: "alert-success",
          timeout: 3000
        });
        this.router.navigate(["attention-stu"]);
      } else{
        this.flashMessage.show(data.msg, {
          cssClass: "alert-danger",
          timeout: 3000
        });
      }

    });


  }

  ngOnInit() {
    this.startcamera();
  }
}
