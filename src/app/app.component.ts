import { Component, OnInit } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { AuthenticationService } from "./Auth/authentication.service";
import { Router } from "@angular/router";
import { HomeService } from "./Home/home.service";
import { Profile } from "./models/profile.model";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent implements OnInit {
  profileDetails: Profile;
  profilePicture: string;
  username: string;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthenticationService,
    private router: Router,
    private homeService: HomeService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.authService.authenticationState.subscribe((state) => {
        if (state) {
          this.router.navigateByUrl["/tabs/home"];
        } else {
          this.router.navigateByUrl["/login"];
        }
      });
    });
  }

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    this.homeService.profileDetails.subscribe((res) => {
      if (res) {
        console.log(res, "res");
        this.profilePicture = res["profile_picture"];
        this.username = res["name"];
      }
    });
  }

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }
}
