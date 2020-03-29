import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HomePage } from "./home.page";
import { ExploreContainerComponentModule } from "../explore-container/explore-container.module";
import { ComponentsModule } from "../components/components.module";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ComponentsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([
      {
        path: "",
        component: HomePage
      },
      {
        path: ":postId",
        loadChildren: () =>
          import("./post-detail/post-detail.module").then(
            m => m.PostDetailPageModule
          )
      }
    ])
  ],
  declarations: [HomePage],
  exports: [HomePage]
})
export class HomeModule {}
