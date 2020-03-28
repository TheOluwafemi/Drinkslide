import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { TabsPageRoutingModule } from "./tabs-routing.module";

import { TabsPage } from "./tabs.page";
import { CreatePostPageModule } from "../create-post/create-post.module";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    IonicModule,
    TabsPageRoutingModule,
    CreatePostPageModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
