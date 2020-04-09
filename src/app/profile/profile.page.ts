import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { HomeService } from "../Home/home.service";
import { Storage } from "@ionic/storage";
import { Plugins, CameraResultType } from "@capacitor/core";

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

  constructor(private homeService: HomeService, private storage: Storage) {}

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
      resultType: CameraResultType.Uri,
    });
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    this.imageUrl = image.webPath;
    if (this.imageUrl !== "") {
      this.imageAdded = true;
    }
    // Can be set to the src of an image now
    this.image.nativeElement.src = this.imageUrl;
    console.log("IMAGEURL", this.image);
  }
}
