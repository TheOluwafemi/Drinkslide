import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HomeService } from "../home.service";
import { Post } from "src/app/models/post.model";

@Component({
  selector: "app-post-detail",
  templateUrl: "./post-detail.page.html",
  styleUrls: ["./post-detail.page.scss"],
})
export class PostDetailPage implements OnInit {
  loadedPost: any;
  description: any;
  image: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private homeService: HomeService
  ) {}

  ngOnInit() {
    this.getSinglePostDetails();
  }

  async getSinglePostDetails() {
    this.activatedRoute.paramMap.subscribe(async (param) => {
      if (!param.has("postId")) {
        this.router.navigate(["/home"]);
        return;
      }

      const postId = param.get("postId");
      this.loadedPost = await this.homeService.getPostById(postId);
      this.description = this.loadedPost[0]["status_text"];
      this.image = this.loadedPost[0]["image_url"];
    });
  }
}
