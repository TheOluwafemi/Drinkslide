import { Component, OnInit } from "@angular/core";
import { CreateProfileService } from "../Auth/create-profile.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"],
})
export class RegisterPage implements OnInit {
  email: string;
  username: string;
  password: string;

  constructor(
    private createProfileService: CreateProfileService,
    private router: Router
  ) {}

  ngOnInit() {}

  onRegister() {
    this.createProfileService.register(
      this.email,
      this.username,
      this.password
    );
    this.createProfileService.registerState.subscribe((res) => {
      console.log(res);
      if (res) {
        this.router.navigateByUrl("/login");
      } else {
        console.log("unable to register user");
      }
    });
  }
}
