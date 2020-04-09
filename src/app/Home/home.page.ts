import { Component, OnInit } from "@angular/core";
import { HomeService } from "./home.service";
import { Post } from "../models/post.model";
import { Storage } from "@ionic/storage";
import { Profile } from "../models/profile.model";
import { MenuController } from "@ionic/angular";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  posts: Post[];
  profileId: string = "";
  profileDetails: Profile;

  constructor(
    private homeService: HomeService,
    private storage: Storage,
    private menuController: MenuController
  ) {
    this.homeService.getAllPosts();
    this.initGetUserDetails();
    this.subscribeTogetUserDetails();
  }

  ngOnInit() {
    this.homeService.allPosts.subscribe((res) => {
      this.posts = res;
    });
    this.menuController.enable(true);
  }

  initGetUserDetails() {
    this.storage.get("profileId").then((res) => {
      if (res) {
        this.profileId = res;
        this.homeService.getUserById(this.profileId);
      }
    });
  }

  subscribeTogetUserDetails() {
    this.homeService.profileDetails.subscribe((res) => {
      this.profileDetails = res;
    });
  }
}
