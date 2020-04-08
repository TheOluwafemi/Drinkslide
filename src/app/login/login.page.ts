import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../Auth/authentication.service";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  email: string = "";
  password: string = "";

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.checkToken();
  }

  onLogin() {
    const username = this.email;
    const password = this.password;

    this.authService.login(username, password);
    this.authService.loginState.subscribe((res) => {
      if (res) {
        this.router.navigateByUrl("/tabs/home");
      }
    });
  }
}
