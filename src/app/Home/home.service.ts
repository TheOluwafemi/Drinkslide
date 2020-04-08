import { Injectable, OnDestroy } from "@angular/core";
import { Post } from "../models/post.model";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { retry, takeWhile } from "rxjs/operators";
import { Profile } from "../models/profile.model";

@Injectable({
  providedIn: "root",
})
export class HomeService implements OnDestroy {
  allPosts = new BehaviorSubject(null);
  profileDetails = new BehaviorSubject<Profile>(null);
  posts: Post[] = [];

  alive: boolean;

  constructor(private http: HttpClient) {
    this.alive = true;
  }

  ngOnDestroy() {
    this.alive = false;
  }

  _getUserById(id: string): Observable<any> {
    return this.http.get(`${environment.registerUser}/${id}`).pipe(retry(2));
  }

  getUserById(id: string) {
    this._getUserById(id)
      .pipe(takeWhile(() => this.alive))
      .subscribe((res) => {
        this.profileDetails.next(res);
      });
  }

  _getAllPosts(): Observable<any> {
    return this.http.get(environment.getFeed);
  }

  getAllPosts() {
    this._getAllPosts().subscribe((res) => {
      if (res) {
        this.allPosts.next(res);
        this.posts = res;
      } else {
        console.log("unable to retrieve posts");
      }
    });
  }

  getPostById(postId: string) {
    console.log(postId, "postID::::");
    return {
      ...this.posts.filter((post) => {
        return post.id == postId;
      }),
    };
  }

  addNewPost(newPost: Post) {
    this.posts.push(newPost);
  }

  deleteRecipe(postId: string) {
    this.posts = this.posts.filter((post) => {
      return post.id !== postId;
    });
  }
}
