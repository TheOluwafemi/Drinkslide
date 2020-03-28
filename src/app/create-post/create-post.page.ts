import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit
} from "@angular/core";
import { ModalController } from "@ionic/angular";
import { Plugins, CameraResultType } from "@capacitor/core";
import { Post } from "../models/post.model";
import { HomeService } from "../Home/home.service";

const { Camera } = Plugins;

@Component({
  selector: "CreatePostPage",
  templateUrl: "./create-post.page.html",
  styleUrls: ["./create-post.page.scss"]
})
export class CreatePostPage implements OnInit, AfterViewInit {
  imageAdded: boolean = false;
  postIsValid: boolean = false;
  newPost: Post;
  imageUrl = "";
  title: "";
  description: "";

  constructor(
    private modalController: ModalController,
    private homeService: HomeService
  ) {}
  @ViewChild("image", { static: false }) image: ElementRef;

  ngOnInit() {}
  ngAfterViewInit() {
    console.log(this.image.nativeElement.src);
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
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

  postValid(): boolean {
    if (this.title !== "" && this.description !== "" && this.imageAdded) {
      this.postIsValid = true;
    }
    return;
  }

  createNewPost() {
    this.postValid();
    console.log("postisvalid", this.postIsValid);
    if (this.postIsValid) {
      this.newPost = {
        id: "r5",
        title: this.title,
        description: this.description,
        imageUrl: this.imageUrl
      };
      console.log("newPost", this.newPost);
      this.homeService.addNewPost(this.newPost);
      this.dismissModal();
      return;
    } else {
      alert("fuck off");
    }
  }

  dismissModal() {
    this.modalController.dismiss({
      dismissed: true
    });
  }
}
