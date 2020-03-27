import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderScrollComponent } from "./header-scroll/header-scroll.component";
import { HeaderCollapseComponent } from "./header-collapse/header-collapse.component";
import { PostComponent } from "./post/post.component";
import { IonicModule } from "@ionic/angular";

@NgModule({
  declarations: [HeaderScrollComponent, HeaderCollapseComponent, PostComponent],
  imports: [CommonModule, IonicModule],
  exports: [HeaderCollapseComponent, HeaderScrollComponent, PostComponent]
})
export class ComponentsModule {}
