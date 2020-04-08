import { Component, OnInit, Input } from "@angular/core";
import { MenuController } from "@ionic/angular";
import { HomeService } from "src/app/Home/home.service";
import { Profile } from "src/app/models/profile.model";

@Component({
  selector: "app-header-scroll",
  templateUrl: "./header-scroll.component.html",
  styleUrls: ["./header-scroll.component.scss"],
})
export class HeaderScrollComponent implements OnInit {
  profilePicture: string;

  constructor(
    private menuController: MenuController,
    private homeService: HomeService
  ) {}

  ngOnInit() {
    this.getProfilePicture();
  }

  getProfilePicture() {
    this.homeService.profileDetails.subscribe((res) => {
      if (res) {
        this.profilePicture = res["profile_picture"];
      }
    });
  }

  async openMenu() {
    await this.menuController.open();
  }
}
