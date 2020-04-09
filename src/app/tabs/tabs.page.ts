import { Component } from "@angular/core";
import { ModalController, IonRouterOutlet } from "@ionic/angular";
import { CreatePostPage } from "../create-post/create-post.page";

@Component({
  selector: "app-tabs",
  templateUrl: "tabs.page.html",
  styleUrls: ["tabs.page.scss"],
})
export class TabsPage {
  constructor(
    private modalController: ModalController,
    private routerOutlet: IonRouterOutlet
  ) {}

  async openCreatePostModal() {
    const modal = await this.modalController.create({
      component: CreatePostPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
    });
    return await modal.present();
  }
}
