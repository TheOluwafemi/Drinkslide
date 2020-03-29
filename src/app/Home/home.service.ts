import { Injectable } from "@angular/core";
import { Post } from "../models/post.model";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class HomeService {
  private allPosts = new BehaviorSubject<Post[]>(null);
  allPosts$ = this.allPosts.asObservable();

  constructor() {}

  posts: Post[] = [
    {
      id: "r1",
      title: "Heineken",
      imageUrl:
        "https://images.pexels.com/photos/70598/pexels-photo-70598.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis accusamus ea ullam, ducimus inventore iure maxime cumque error repellendus odio expedita deserunt fuga optio sapiente, soluta, est tempora quasi praesentium Deserunt repellat voluptas totam atque fugiat. Tenetur repellat corporis possimus quo perspiciatis, iste sunt non et repellendus qui, animi maxime facilis quae cum numquam delectus aut autem incidunt a",
      tags: ["cruise", "smooth"]
    },
    {
      id: "r2",
      title: "Budweiser",
      imageUrl:
        "https://images.pexels.com/photos/573910/pexels-photo-573910.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      description: "The best beer in the world",
      tags: ["cruise", "smooth"]
    },
    {
      id: "r3",
      title: "Corona Extra",
      imageUrl:
        "https://images.pexels.com/photos/1089932/pexels-photo-1089932.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      description: "The best beer in the world",
      tags: ["cruise", "smooth"]
    },
    {
      id: "r4",
      title: "Veza",
      imageUrl:
        "https://images.pexels.com/photos/1267696/pexels-photo-1267696.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      description: "Me and the gang enjoying the beer",
      tags: ["cruise", "smooth"]
    }
  ];

  getAllPosts() {
    this.allPosts.next(this.posts);
  }

  getPostById(postId: string) {
    return {
      ...this.posts.find(post => {
        return post.id === postId;
      })
    };
  }

  addNewPost(newPost: Post) {
    this.posts.push(newPost);
  }

  deleteRecipe(postId: string) {
    this.posts = this.posts.filter(post => {
      return post.id !== postId;
    });
  }
}
