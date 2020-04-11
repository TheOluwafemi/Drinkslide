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
    this.menuController.enable(true);
    this.homeService.getAllPosts();
    this.getUpdatedFeed();
  }

  // ionViewWillEnter() {
  //   this.homeService.getAllPosts();
  //   this.getUpdatedFeed();
  // }

  getUpdatedFeed() {
    this.homeService.getAllPosts();
    this.homeService.allPosts.subscribe((res) => {
      const sortedResponse = res.sort(this.sortPosts);
      this.posts = sortedResponse;
    });
  }

  sortPosts(post1, post2) {
    // Use toUpperCase() to ignore character casing
    const postId1 = post1.id;
    const postId2 = post2.id;

    let comparison = 0;
    if (postId1 < postId2) {
      comparison = 1;
    } else if (postId1 > postId2) {
      comparison = -1;
    }
    return comparison;
  }

  refreshFeed(event) {
    setTimeout(() => {
      this.getUpdatedFeed();
      event.target.complete();
    }, 2000);
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
