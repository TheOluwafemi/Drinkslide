import { Injectable } from "@angular/core";
import { Post } from "../models/post.model";

@Injectable({
  providedIn: "root"
})
export class HomeService {
  constructor() {}

  posts: Post[] = [
    {
      id: "r1",
      title: "Heineken",
      imageUrl:
        "https://images.pexels.com/photos/70598/pexels-photo-70598.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
      description: "The best beer in the world",
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
    return [...this.posts];
  }

  getPostById(postId: string) {
    return {
      ...this.posts.find(recipe => {
        return recipe.id === postId;
      })
    };
  }

  deleteRecipe(postId: string) {
    this.posts = this.posts.filter(post => {
      return post.id !== postId;
    });
  }
}
