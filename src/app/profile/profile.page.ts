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
  ) {}

  ngOnInit() {
    this.initGetUserDetails();
    this.getProfile();
  }

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
        console.log(res, "res");
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
    console.log("current profile photo", this.profilePicture);
    console.log("IMAGEURL", this.imageUrl);

    const contentType = "image/jpg";

    let blob = this.b64toBlob(this.imageUrl);

    let imageFile = new FormData();
    imageFile.set("file", blob);

    this.http.post(environment.uploadImage, imageFile).subscribe((res) => {
      if (res) {
        if (res["status"] == "200") {
          console.log(res);
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

    // console.log("new profile photo", this.profilePicture);
    // this.image.nativeElement.src = this.imageUrl;
    // this.image.nativeElement.src = this.profilePicture;
    // console.log("IMAGEURL", this.image.nativeElement.src);
  }

  // base64ToBlob(b64Data, contentType = "", sliceSize = 512) {
  //   const byteCharacters = atob(b64Data);
  //   const byteArrays = [];

  //   for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
  //     const slice = byteCharacters.slice(offset, offset + sliceSize);

  //     const byteNumbers = new Array(slice.length);
  //     for (let i = 0; i < slice.length; i++) {
  //       byteNumbers[i] = slice.charCodeAt(i);
  //     }

  //     const byteArray = new Uint8Array(byteNumbers);
  //     byteArrays.push(byteArray);
  //   }

  //   const blob = new Blob(byteArrays, { type: contentType });
  //   return blob;
  // }

  b64toBlob(dataURI) {
    var byteString = atob(dataURI.split(",")[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);

    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: "image/jpeg" });
  }

  makeRandomName(length: number) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
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
