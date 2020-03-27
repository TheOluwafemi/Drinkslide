import { Component, OnInit } from "@angular/core";
import { MenuController } from "@ionic/angular";

@Component({
  selector: "app-header-scroll",
  templateUrl: "./header-scroll.component.html",
  styleUrls: ["./header-scroll.component.scss"]
})
export class HeaderScrollComponent implements OnInit {
  constructor(private menuController: MenuController) {}

  ngOnInit() {}

  async openMenu() {
    await this.menuController.open();
  }
}
