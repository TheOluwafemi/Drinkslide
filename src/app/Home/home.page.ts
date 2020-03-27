import { Component } from "@angular/core";
import { HomeService } from "./home.service";
import { Post } from "../models/post.model";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  posts: Post[];

  constructor(private homeService: HomeService) {}

  ionViewWillEnter() {
    this.posts = this.homeService.getAllPosts();
  }
}
