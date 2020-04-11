import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from "@angular/core";
import { ModalController, ToastController } from "@ionic/angular";
import { Plugins, CameraResultType } from "@capacitor/core";
import { Post } from "../models/post.model";
import { HomeService } from "../Home/home.service";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

const { Camera } = Plugins;

@Component({
  selector: "CreatePostPage",
  templateUrl: "./create-post.page.html",
  styleUrls: ["./create-post.page.scss"],
})
export class CreatePostPage implements OnInit, AfterViewInit {
  imageAdded: boolean = false;
  postIsValid: boolean = false;
  newPost: Post;
  imageUrl = "";
  title: "";
  description: "";
  profilePicture: string;
  blob: any;
  pictureUrl: any;
  imageUploaded: boolean;

  constructor(
    private modalController: ModalController,
    private homeService: HomeService,
    private http: HttpClient,
    private toastController: ToastController
  ) {
    this.getProfile();
  }
  @ViewChild("image", { static: false }) image: ElementRef;

  ngOnInit() {}
  ngAfterViewInit() {}

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
    });
    this.imageUrl = image.dataUrl;
    if (this.imageUrl !== "") {
      this.imageAdded = true;
    }
    this.image.nativeElement.src = this.imageUrl;
    this.blob = this.b64toBlob(this.imageUrl);
  }

  b64toBlob(dataURI) {
    var byteString = atob(dataURI.split(",")[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);

    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: "image/jpeg" });
  }

  async uploadImage() {
    let imageFile = new FormData();
    imageFile.set("file", this.blob);

    return this.http.post(environment.uploadImage, imageFile);
  }

  async createNewPost() {
    this.postValid();
    if (this.postIsValid) {
      (await this.uploadImage()).subscribe((res) => {
        this.presentToast("sending post", "primary");
        this.dismissModal();
        if (res) {
          if (res["status"] == "200") {
            this.pictureUrl = res["url"];
            this.imageUploaded = true;
            if (this.pictureUrl) {
              this.http
                .post(environment.getFeed, {
                  status_text: this.description,
                  image_url: this.pictureUrl,
                })
                .subscribe((res) => {
                  if (res) {
                    this.presentToast("Post successfull", "success");
                    this.homeService.getAllPosts();
                  }
                });
            }
          } else {
            this.imageUploaded = false;
            this.presentToast("Image upload failed, try again", "Warning");
            return;
          }
        } else {
          this.imageUploaded = false;
          this.presentToast("Image upload failed, try again", "Warning");
          return;
        }
      });
    } else {
      this.presentToast(
        "Make sure to upload an image showing your drink and describe your experience!",
        "danger"
      );
    }
  }

  postValid(): boolean {
    if (this.description && this.imageAdded) {
      this.postIsValid = true;
    }
    return;
  }

  getProfile() {
    this.homeService.profileDetails.subscribe((res) => {
      if (res) {
        this.profilePicture = res["profile_picture"];
      }
    });
  }

  async presentToast(msg: string, type: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: type,
    });
    toast.present();
  }

  dismissModal() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}
