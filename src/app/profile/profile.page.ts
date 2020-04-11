import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { HomeService } from "../Home/home.service";
import { Storage } from "@ionic/storage";
import { Plugins, CameraResultType } from "@capacitor/core";
import { DomSanitizer } from "@angular/platform-browser";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { ToastController } from "@ionic/angular";

const { Camera } = Plugins;

@Component({
  selector: "app-profile",
  templateUrl: "profile.page.html",
  styleUrls: ["profile.page.scss"],
})
export class ProfilePage implements OnInit {
  profilePicture: string;
  username: string;
  profileId: any;
  email: string;
  imageAdded: boolean = false;
  imageUrl = "";

  @ViewChild("image", { static: false }) image: ElementRef;

  constructor(
    private homeService: HomeService,
    private storage: Storage,
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    private toastController: ToastController
  ) {
    this.initGetUserDetails();
    this.getProfile();
  }

  ngOnInit() {}

  initGetUserDetails() {
    this.storage.get("profileId").then((res) => {
      if (res) {
        this.profileId = res;
        this.homeService.getUserById(this.profileId);
      }
    });
  }

  getProfile() {
    this.homeService.profileDetails.subscribe((res) => {
      if (res) {
        this.profilePicture = res["profile_picture"];
        this.username = res["name"];
        this.email = res["email"];
      }
    });
  }

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

    let blob = this.b64toBlob(this.imageUrl);

    let imageFile = new FormData();
    imageFile.set("file", blob);

    this.http.post(environment.uploadImage, imageFile).subscribe((res) => {
      if (res) {
        if (res["status"] == "200") {
          const url = res["url"];
          this.updateProfilePicture(this.profileId, url).subscribe((res) => {
            if (res) {
              this.profilePicture = res["profile_picture"];
              this.presentToast("Profile picture changed!");
            } else {
              this.presentToast("Unable to change profile picture");
              return;
            }
          });
        } else {
          this.presentToast("Unable to change profile picture");
          return;
        }
      } else {
        this.presentToast("Unable to change profile picture");
        return;
      }
    });
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

  updateProfilePicture(profileId: string, pictureUrl: string) {
    const url = {
      profile_picture: pictureUrl,
    };
    return this.http.patch(`${environment.registerUser}${profileId}/`, url);
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }
}
