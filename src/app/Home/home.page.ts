import { Component, OnInit } from "@angular/core";
import { HomeService } from "./home.service";
import { Post } from "../models/post.model";
import { Storage } from "@ionic/storage";
import { Profile } from "../models/profile.model";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  posts: Post[];
  profileId: string = "";
  profileDetails: Profile;

  constructor(private homeService: HomeService, private storage: Storage) {
    this.homeService.getAllPosts();
    this.initGetUserDetails();
    this.subscribeTogetUserDetails();
  }

  ionViewWillEnter() {
    this.homeService.allPosts.subscribe((res) => {
      this.posts = res;
    });
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

  subscribeTogetUserDetails() {
    this.homeService.profileDetails.subscribe((res) => {
      this.profileDetails = res;
    });
  }
}
