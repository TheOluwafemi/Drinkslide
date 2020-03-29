import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HomeService } from "../home.service";
import { Post } from "src/app/models/post.model";

@Component({
  selector: "app-post-detail",
  templateUrl: "./post-detail.page.html",
  styleUrls: ["./post-detail.page.scss"]
})
export class PostDetailPage implements OnInit {
  loadedPost: Post;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private homeService: HomeService
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(param => {
      console.log(param);
      if (!param.has("postId")) {
        this.router.navigate(["/home"]);
        return;
      }

      const postId = param.get("postId");
      this.loadedPost = this.homeService.getPostById(postId);
      console.log(this.loadedPost);
    });
  }
}
